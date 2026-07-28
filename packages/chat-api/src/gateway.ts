/**
 * AgentCore Harness を直接呼び出すモジュール
 *
 * InvokeHarness API: POST /harnesses/invoke?harnessArn=...
 * レスポンスはストリーミング（event-stream）形式で返される
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
  _sceneInstruction: string,
  messages: ChatMessage[]
): Promise<GatewayResponse> {
  if (!HARNESS_ARN) {
    throw new Error('HARNESS_ARN environment variable is not set');
  }

  const body = JSON.stringify({
    messages: messages.map((m) => ({
      role: m.role,
      content: [{ text: m.content }],
    })),
  });

  const harnessArnEncoded = encodeURIComponent(HARNESS_ARN);
  const path = `/harnesses/invoke?harnessArn=${harnessArnEncoded}`;

  // 33文字以上必須
  const sessionId = `bhs${Date.now()}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`;

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

  // ストリーミングレスポンスをパース
  // レスポンスは event-stream 形式: 各イベントに contentBlockDelta.delta.text が含まれる
  const responseText = await response.text();
  const message = parseStreamingResponse(responseText);

  return { message };
}

/**
 * InvokeHarness のストリーミングレスポンスから text を抽出して結合する
 *
 * 形式: event-type + JSON の繰り返し
 * contentBlockDelta イベントの delta.text を集める
 */
function parseStreamingResponse(raw: string): string {
  const textParts: string[] = [];

  // JSON オブジェクトを正規表現で抽出
  const jsonPattern = /\{"contentBlockIndex":\d+,"delta":\{"text":"((?:[^"\\]|\\.)*)"\}\}/g;
  let match;

  while ((match = jsonPattern.exec(raw)) !== null) {
    // エスケープされた文字を復元
    const text = match[1]
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');
    textParts.push(text);
  }

  if (textParts.length > 0) {
    return textParts.join('');
  }

  // フォールバック: delta.text パターンが見つからない場合
  // "text":"..." を全て抽出
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
