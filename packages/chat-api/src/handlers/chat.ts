import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { getScenario, SCENARIO_IDS } from '../scenarios';
import { ok, badRequest, internalError } from '../utils/response';
import { invokeGateway } from '../gateway';

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

  // シナリオの場面設定を取得
  const scenario = getScenario(scenarioId)!;

  // 場面設定を最初の user メッセージとして含める
  // Harness は共通のシステムプロンプトを持っているので、場面設定だけ追加
  const sceneInstruction = `【場面設定】${scenario.name}: ${scenario.description}`;

  // Gateway 経由で Harness を呼び出し
  try {
    const result = await invokeGateway(sceneInstruction, trimmedMessages);

    return ok({
      reply: result.message,
      scenarioId,
    });
  } catch (err: unknown) {
    console.error('Gateway invocation error:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return internalError(`AI の応答に失敗しました: ${errorMessage}`);
  }
}
