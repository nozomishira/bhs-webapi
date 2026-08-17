/**
 * Coach Agent Harness 呼び出しモジュール
 *
 * Lambda で事前に DynamoDB を集計し、サマリーを含めて InvokeHarness を呼ぶ。
 * Harness はモデル推論のみ（ツール呼び出しなし = 高速 + 低コスト）。
 */
import * as aws4 from 'aws4';

const REGION = process.env.AWS_REGION ?? 'ap-northeast-1';
const HARNESS_ARN = process.env.COACH_HARNESS_ARN!;

/**
 * Coach Harness を呼び出す
 * @param message ユーザーの質問
 * @param userSummary Lambda で集計した学習データサマリー
 */
export async function invokeCoachHarness(message: string, userSummary: string): Promise<string> {
  if (!HARNESS_ARN) {
    throw new Error('COACH_HARNESS_ARN environment variable is not set');
  }

  // サマリーをシステム的なコンテキストとして最初のメッセージに含める
  const fullMessage = `${userSummary}\n\n【ユーザーの質問】\n${message}`;

  const body = JSON.stringify({
    messages: [
      { role: 'user', content: [{ text: fullMessage }] },
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
