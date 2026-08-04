import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { ddb, QUIZ_SESSIONS_TABLE } from '../db';

/**
 * get_quiz_history: ユーザーのクイズ結果を時系列で取得
 *
 * input: { userId: string, limit?: number }
 * output: { sessions: Array<{ sessionId, level, courseType, score, totalQuestions, createdAt }> }
 */
export async function getQuizHistory(event: Record<string, unknown>) {
  const userId = event.userId as string;
  const limit = (event.limit as number) ?? 20;

  if (!userId) {
    return { error: 'userId is required' };
  }

  const result = await ddb.send(new QueryCommand({
    TableName: QUIZ_SESSIONS_TABLE,
    IndexName: 'UserIdIndex',
    KeyConditionExpression: 'userId = :uid',
    ExpressionAttributeValues: {
      ':uid': `USER#${userId}`,
    },
    ScanIndexForward: false, // 新しい順
    Limit: limit,
  }));

  const sessions = (result.Items ?? []).map((item) => ({
    sessionId: item.sessionId,
    level: item.level,
    courseType: item.courseType,
    score: item.score,
    totalQuestions: item.totalQuestions,
    createdAt: item.createdAt,
  }));

  return { sessions };
}
