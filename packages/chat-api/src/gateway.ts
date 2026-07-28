/**
 * AgentCore Harness を直接呼び出すモジュール
 *
 * InvokeHarness API: POST /harnesses/invoke?harnessArn=...
 * エンドポイント: https://bedrock-agentcore.{region}.amazonaws.com
 * 認証: IAM (SigV4) — aws4 で署名
 */
import * as aws4 from 'aws4';

const REGION = process.env.AWS_REGION ?? 'ap-northeast-1';
const HARNESS_ARN = process.env.HARNESS_ARN!;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface GatewayResponse {
  message: string;
}

/**
 * InvokeHarness API で Harness を呼び出す
 */
export async function invokeGateway(
  sceneInstruction: string,
  messages: ChatMessage[]
): Promise<GatewayResponse> {
  if (!HARNESS_ARN) {
    throw new Error('HARNESS_ARN environment variable is not set');
  }

  // InvokeHarness のリクエストボディ
  // 場面設定をシステムプロンプトのオーバーライドとして渡す
  const body = JSON.stringify({
    messages: messages.map((m) => ({
      role: m.role,
      content: [{ text: m.content }],
    })),
    systemPrompt: [{ text: sceneInstruction }],
  });

  const harnessArnEncoded = encodeURIComponent(HARNESS_ARN);
  const path = `/harnesses/invoke?harnessArn=${harnessArnEncoded}`;

  const signed = aws4.sign(
    {
      service: 'bedrock-agentcore',
      region: REGION,
      method: 'POST',
      host: `bedrock-agentcore.${REGION}.amazonaws.com`,
      path,
      headers: { 'Content-Type': 'application/json' },
      body,
    },
    {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      sessionToken: process.env.AWS_SESSION_TOKEN,
    }
  );

  const url = `https://bedrock-agentcore.${REGION}.amazonaws.com${path}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: signed.headers as Record<string, string>,
    body,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Harness returned ${response.status}: ${errorText}`);
  }

  const responseText = await response.text();

  try {
    const parsed = JSON.parse(responseText);
    // InvokeHarness のレスポンスから assistant メッセージを抽出
    const output = parsed.output ?? parsed;
    if (output.message?.content?.[0]?.text) {
      return { message: output.message.content[0].text };
    }
    if (output.messages) {
      const last = output.messages[output.messages.length - 1];
      if (last?.content?.[0]?.text) {
        return { message: last.content[0].text };
      }
    }
    return { message: responseText };
  } catch {
    return { message: responseText };
  }
}
