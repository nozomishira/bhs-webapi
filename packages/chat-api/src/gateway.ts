/**
 * AgentCore Gateway 経由で Harness を呼び出すモジュール
 *
 * Gateway URL: https://{gatewayId}.gateway.bedrock-agentcore.{region}.amazonaws.com/{targetName}/invocations
 * 認証: IAM (SigV4)
 */
import { SignatureV4 } from '@smithy/signature-v4';
import { Sha256 } from '@aws-crypto/sha256-js';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { HttpRequest } from '@smithy/protocol-http';

const GATEWAY_URL = process.env.GATEWAY_URL!;
// GATEWAY_URL format: https://{gatewayId}.gateway.bedrock-agentcore.{region}.amazonaws.com
const TARGET_NAME = process.env.GATEWAY_TARGET_NAME ?? 'bhs-chat-agent';
const REGION = process.env.AWS_REGION ?? 'ap-northeast-1';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface GatewayResponse {
  message: string;
}

/**
 * Gateway 経由で Harness を呼び出す
 * @param sceneInstruction 場面設定テキスト（最初のメッセージに含める）
 * @param messages 会話履歴
 */
export async function invokeGateway(
  sceneInstruction: string,
  messages: ChatMessage[]
): Promise<GatewayResponse> {
  // Harness の /invocations エンドポイントに POST
  // リクエストボディは Harness が期待する形式
  const requestBody = JSON.stringify({
    input: {
      message: buildPrompt(sceneInstruction, messages),
    },
  });

  const url = new URL(`${GATEWAY_URL}/${TARGET_NAME}/invocations`);

  const request = new HttpRequest({
    method: 'POST',
    protocol: url.protocol,
    hostname: url.hostname,
    path: url.pathname,
    headers: {
      'Content-Type': 'application/json',
      host: url.hostname,
    },
    body: requestBody,
  });

  // SigV4 で署名
  const signer = new SignatureV4({
    service: 'bedrock-agentcore',
    region: REGION,
    credentials: defaultProvider(),
    sha256: Sha256,
  });

  const signedRequest = await signer.sign(request);

  // fetch で送信
  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: signedRequest.headers as Record<string, string>,
    body: requestBody,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gateway returned ${response.status}: ${errorText}`);
  }

  const responseBody = await response.text();

  // Harness のレスポンスをパース
  // ストリーミングレスポンスの場合は複数チャンクがある可能性
  try {
    const parsed = JSON.parse(responseBody);
    return {
      message: parsed.output?.message ?? parsed.message ?? responseBody,
    };
  } catch {
    // JSON でない場合はそのままテキストとして返す
    return { message: responseBody };
  }
}

/**
 * 場面設定 + 会話履歴を1つのプロンプトテキストに組み立てる
 */
function buildPrompt(sceneInstruction: string, messages: ChatMessage[]): string {
  const parts: string[] = [sceneInstruction, ''];

  for (const msg of messages) {
    const prefix = msg.role === 'user' ? 'ユーザー' : 'アシスタント';
    parts.push(`${prefix}: ${msg.content}`);
  }

  return parts.join('\n');
}
