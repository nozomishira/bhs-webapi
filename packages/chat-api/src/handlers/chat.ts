import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import {
  BedrockRuntimeClient,
  ApplyGuardrailCommand,
} from '@aws-sdk/client-bedrock-runtime';
import { getScenario, SCENARIO_IDS } from '../scenarios';
import { ok, badRequest, internalError } from '../utils/response';
import { invokeGateway } from '../gateway';

const bedrockClient = new BedrockRuntimeClient({
  region: process.env.BEDROCK_REGION ?? 'ap-northeast-1',
});

const GUARDRAIL_ID = process.env.GUARDRAIL_ID ?? '';
const GUARDRAIL_VERSION = process.env.GUARDRAIL_VERSION ?? '1';

const BLOCKED_MESSAGE = 'こちらはインドネシア語の会話練習です。学習に関係のない内容はお控えください。インドネシア語で話しかけてみましょう！ 😊';

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
  let body: Partial<ChatRequest>;
  try {
    body = JSON.parse(event.body ?? '{}') as Partial<ChatRequest>;
  } catch {
    return badRequest('リクエストボディが不正な JSON です');
  }

  const { scenarioId, messages } = body;

  if (!scenarioId || !SCENARIO_IDS.includes(scenarioId)) {
    return badRequest(`scenarioId は ${SCENARIO_IDS.join('/')} のいずれかを指定してください`);
  }

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return badRequest('messages は1件以上のメッセージ配列で指定してください');
  }

  for (const msg of messages) {
    if (!msg.role || !['user', 'assistant'].includes(msg.role)) {
      return badRequest('各メッセージの role は user または assistant を指定してください');
    }
    if (!msg.content || typeof msg.content !== 'string' || msg.content.trim() === '') {
      return badRequest('各メッセージの content は空でない文字列を指定してください');
    }
  }

  // 会話履歴の上限
  const trimmedMessages = messages.slice(-40);

  // ユーザーの最新メッセージを取得（Guardrails チェック対象）
  const lastUserMessage = [...trimmedMessages].reverse().find((m) => m.role === 'user');

  // Guardrails 入力チェック（ユーザーメッセージがある場合のみ）
  if (lastUserMessage && GUARDRAIL_ID) {
    const blocked = await checkGuardrail(lastUserMessage.content);
    if (blocked) {
      return ok({
        reply: BLOCKED_MESSAGE,
        scenarioId,
        blocked: true,
      });
    }
  }

  // シナリオの場面設定
  const scenario = getScenario(scenarioId)!;
  const sceneInstruction = `【場面設定】${scenario.name}: ${scenario.description}`;

  // 場面設定を最初の user メッセージの前に付加
  const messagesWithScene = trimmedMessages.map((m, i) => {
    if (i === 0 && m.role === 'user') {
      return { ...m, content: `${sceneInstruction}\n\n${m.content}` };
    }
    return m;
  });

  // Harness 呼び出し
  try {
    const result = await invokeGateway(sceneInstruction, messagesWithScene);

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

/**
 * ApplyGuardrail API でユーザー入力をチェック
 * @returns true = ブロックすべき, false = 通過OK
 */
async function checkGuardrail(text: string): Promise<boolean> {
  try {
    const command = new ApplyGuardrailCommand({
      guardrailIdentifier: GUARDRAIL_ID,
      guardrailVersion: GUARDRAIL_VERSION,
      source: 'INPUT',
      content: [
        {
          text: { text },
        },
      ],
    });

    const response = await bedrockClient.send(command);
    return response.action === 'GUARDRAIL_INTERVENED';
  } catch (err) {
    console.error('Guardrail check error:', err);
    // Guardrails エラー時はブロックせずに通す（可用性優先）
    return false;
  }
}
