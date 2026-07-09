import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';
import { getScenario, SCENARIO_IDS } from '../scenarios';
import { ok, badRequest, internalError } from '../utils/response';

const bedrockClient = new BedrockRuntimeClient({
  region: process.env.BEDROCK_REGION ?? 'ap-northeast-1',
});

const MODEL_ID = process.env.BEDROCK_MODEL_ID ?? 'jp.anthropic.claude-haiku-4-5-20251001-v1:0';
const MAX_TOKENS = 500;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  scenarioId: string;
  messages: ChatMessage[];
}

export async function handleChat(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  // リクエストボディのパース
  let body: Partial<ChatRequest>;
  try {
    body = JSON.parse(event.body ?? '{}') as Partial<ChatRequest>;
  } catch {
    return badRequest('リクエストボディが不正な JSON です');
  }

  // バリデーション
  const { scenarioId, messages } = body;

  if (!scenarioId || !SCENARIO_IDS.includes(scenarioId)) {
    return badRequest(`scenarioId は ${SCENARIO_IDS.join('/')} のいずれかを指定してください`);
  }

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return badRequest('messages は1件以上のメッセージ配列で指定してください');
  }

  // メッセージのバリデーション
  for (const msg of messages) {
    if (!msg.role || !['user', 'assistant'].includes(msg.role)) {
      return badRequest('各メッセージの role は user または assistant を指定してください');
    }
    if (!msg.content || typeof msg.content !== 'string' || msg.content.trim() === '') {
      return badRequest('各メッセージの content は空でない文字列を指定してください');
    }
  }

  // 会話履歴の上限（コスト制御: 最新20往復まで）
  const trimmedMessages = messages.slice(-40);

  // シナリオのシステムプロンプトを取得
  const scenario = getScenario(scenarioId)!;

  // Bedrock API 呼び出し
  try {
    const bedrockBody = JSON.stringify({
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: MAX_TOKENS,
      system: scenario.systemPrompt,
      messages: trimmedMessages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const command = new InvokeModelCommand({
      modelId: MODEL_ID,
      contentType: 'application/json',
      accept: 'application/json',
      body: new TextEncoder().encode(bedrockBody),
    });

    const response = await bedrockClient.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));

    // Claude のレスポンスからテキストを抽出
    const assistantMessage = responseBody.content?.[0]?.text ?? '';

    return ok({
      reply: assistantMessage,
      scenarioId,
      usage: {
        inputTokens: responseBody.usage?.input_tokens ?? 0,
        outputTokens: responseBody.usage?.output_tokens ?? 0,
      },
    });
  } catch (err: unknown) {
    console.error('Bedrock invocation error:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return internalError(`AI の応答に失敗しました: ${errorMessage}`);
  }
}
