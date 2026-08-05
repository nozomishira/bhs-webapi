/**
 * Coach Agent Harness 呼び出しモジュール
 *
 * InvokeHarness API で bhs_coach_agent を呼ぶ。
 * ユーザーID をメッセージに含めて、Agent がツールで参照できるようにする。
 */
import * as aws4 from 'aws4';

const REGION = process.env.AWS_REGION ?? 'ap-northeast-1';
const HARNESS_ARN = process.env.COACH_HARNESS_ARN!;

/**
 * Coach Harness を呼び出す
 */
export async function invokeCoachHarness(message: string, userId: string): Promise<string> {
  if (!HARNESS_ARN) {
    throw new Error('COACH_HARNESS_ARN environment variable is not set');
  }

  // ユーザーID を含めて Agent がツールで参照できるようにする
  const userContext = `[ユーザーID: ${userId}] ${message}`;

  const body = JSON.stringify({
    messages: [
      { role: 'user', content: [{ text: userContext }] },
    ],
  });

  const harnessArnEncoded = encodeURIComponent(HARNESS_ARN);
  const path = `/harnesses/invoke?harnessArn=${harnessArnEncoded}`;
  const sessionId = `coach${Date.now()}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`;

  const signed = aws4.sign(
    {
      service: 'bedrock-agentcore',
      region: REGION,
      method: 'POST',
      host: `bedrock-agentcore.${REGION}.amazonaws.com`,
      path,
      headers: {
        'Content-Type': 'application/json',
        'X-Amzn-Bedrock-AgentCore-Runtime-Session-Id': sessionId,
      },
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
  return parseStreamingResponse(responseText);
}

/**
 * ストリーミングレスポンスから text を結合
 */
function parseStreamingResponse(raw: string): string {
  const textParts: string[] = [];
  const jsonPattern = /\{"contentBlockIndex":\d+,"delta":\{"text":"((?:[^"\\]|\\.)*)"\}\}/g;
  let match;

  while ((match = jsonPattern.exec(raw)) !== null) {
    const text = match[1]
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');
    textParts.push(text);
  }

  if (textParts.length > 0) return textParts.join('');

  const fallbackPattern = /"text":"((?:[^"\\]|\\.)*)"/g;
  while ((match = fallbackPattern.exec(raw)) !== null) {
    const text = match[1]
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');
    textParts.push(text);
  }

  return textParts.length > 0 ? textParts.join('') : raw;
}
