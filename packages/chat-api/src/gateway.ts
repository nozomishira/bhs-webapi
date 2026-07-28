/**
 * AgentCore Gateway 経由で Harness を呼び出すモジュール
 *
 * SigV4 署名に aws4 パッケージを使用（AWS SDK と干渉しない軽量ライブラリ）
 */
import * as aws4 from 'aws4';

const GATEWAY_URL = process.env.GATEWAY_URL ?? '';
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
 */
export async function invokeGateway(
  sceneInstruction: string,
  messages: ChatMessage[]
): Promise<GatewayResponse> {
  if (!GATEWAY_URL) {
    throw new Error('GATEWAY_URL environment variable is not set');
  }

  const prompt = buildPrompt(sceneInstruction, messages);
  const body = JSON.stringify({ message: prompt });
  const url = new URL(`${GATEWAY_URL}/${TARGET_NAME}/invocations`);

  // aws4 で SigV4 署名（Lambda 環境変数の認証情報を自動取得）
  const signed = aws4.sign(
    {
      service: 'bedrock-agentcore',
      region: REGION,
      method: 'POST',
      host: url.hostname,
      path: url.pathname,
      headers: { 'Content-Type': 'application/json' },
      body,
    },
    {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      sessionToken: process.env.AWS_SESSION_TOKEN,
    }
  );

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: signed.headers as Record<string, string>,
    body,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gateway returned ${response.status}: ${errorText}`);
  }

  const responseText = await response.text();

  try {
    const parsed = JSON.parse(responseText);
    return {
      message: parsed.output?.message ?? parsed.message ?? responseText,
    };
  } catch {
    return { message: responseText };
  }
}

function buildPrompt(sceneInstruction: string, messages: ChatMessage[]): string {
  const parts: string[] = [sceneInstruction, ''];
  for (const msg of messages) {
    const prefix = msg.role === 'user' ? 'ユーザー' : 'アシスタント';
    parts.push(`${prefix}: ${msg.content}`);
  }
  return parts.join('\n');
}
