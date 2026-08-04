import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { ddb, CHAT_SESSIONS_TABLE } from '../db';

/**
 * get_chat_history: ユーザーのチャット会話履歴 + 採点結果を取得
 *
 * input: { userId: string, limit?: number }
 * output: { sessions: Array<{ sessionId, scenarioId, scenarioName, evaluation, createdAt }> }
 */
export async function getChatHistory(event: Record<string, unknown>) {
  const userId = event.userId as string;
  const limit = (event.limit as number) ?? 10;

  if (!userId) {
    return { error: 'userId is required' };
  }

  const result = await ddb.send(new QueryCommand({
    TableName: CHAT_SESSIONS_TABLE,
    KeyConditionExpression: 'pk = :pk',
    ExpressionAttributeValues: {
      ':pk': `USER#${userId}`,
    },
    ScanIndexForward: false, // 新しい順
    Limit: limit,
  }));

  const sessions = (result.Items ?? []).map((item) => ({
    sessionId: item.sessionId,
    scenarioId: item.scenarioId,
    scenarioName: item.scenarioName,
    evaluation: item.evaluation,
    createdAt: item.createdAt,
  }));

  return { sessions };
}
