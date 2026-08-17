/**
 * ユーザーの学習データを DynamoDB から集計してサマリーテキストを生成する
 */
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand, GetCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: process.env.AWS_REGION ?? 'ap-northeast-1' });
const ddb = DynamoDBDocumentClient.from(client);

const QUIZ_TABLE = process.env.QUIZ_SESSIONS_TABLE ?? '';
const CHAT_TABLE = process.env.CHAT_SESSIONS_TABLE ?? '';
const PROFILE_TABLE = process.env.USER_PROFILES_TABLE ?? '';

export async function buildUserSummary(userId: string): Promise<string> {
  const [quizSummary, chatSummary, profileName] = await Promise.all([
    getQuizSummary(userId),
    getChatSummary(userId),
    getDisplayName(userId),
  ]);

  const name = profileName ?? 'ユーザー';

  return `【${name}さんの学習データ】

${quizSummary}

${chatSummary}

上記のデータに基づいて、具体的で実用的なアドバイスを日本語で提供してください。`;
}

async function getQuizSummary(userId: string): Promise<string> {
  if (!QUIZ_TABLE) return '■ クイズ: データなし';

  try {
    const result = await ddb.send(new QueryCommand({
      TableName: QUIZ_TABLE,
      IndexName: 'UserIdIndex',
      KeyConditionExpression: 'userId = :uid',
      ExpressionAttributeValues: { ':uid': `USER#${userId}` },
      ScanIndexForward: false,
      Limit: 30,
    }));

    const items = result.Items ?? [];
    if (items.length === 0) return '■ クイズ: まだ受けていません';

    // courseType 別集計
    const byType: Record<string, { correct: number; total: number; count: number }> = {};
    for (const item of items) {
      const t = item.courseType as string;
      if (!byType[t]) byType[t] = { correct: 0, total: 0, count: 0 };
      byType[t].correct += item.score as number;
      byType[t].total += item.totalQuestions as number;
      byType[t].count += 1;
    }

    const lines = Object.entries(byType).map(([type, s]) => {
      const rate = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
      return `  ${type}: 正答率${rate}% (${s.count}回受験)`;
    });

    return `■ クイズ成績 (直近${items.length}回)\n${lines.join('\n')}`;
  } catch (err) {
    console.error('getQuizSummary error:', err);
    return '■ クイズ: 取得エラー';
  }
}

async function getChatSummary(userId: string): Promise<string> {
  if (!CHAT_TABLE) return '■ 会話: データなし';

  try {
    const result = await ddb.send(new QueryCommand({
      TableName: CHAT_TABLE,
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: { ':pk': `USER#${userId}` },
      ScanIndexForward: false,
      Limit: 10,
    }));

    const items = result.Items ?? [];
    if (items.length === 0) return '■ 会話: まだ練習していません';

    // 採点結果の集計
    const scores: Record<string, number[]> = {
      grammar: [], spelling: [], vocabulary: [], communication: [], naturalness: [],
    };
    const scenarios: string[] = [];

    for (const item of items) {
      if (item.scenarioName) scenarios.push(item.scenarioName as string);
      const evaluation = item.evaluation as Record<string, unknown> | undefined;
      if (!evaluation) continue;
      for (const key of Object.keys(scores)) {
        const entry = evaluation[key] as { score?: number } | undefined;
        if (entry?.score !== undefined) scores[key].push(entry.score);
      }
    }

    const scoreSummary = Object.entries(scores)
      .filter(([, arr]) => arr.length > 0)
      .map(([key, arr]) => {
        const avg = Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
        const max = key === 'naturalness' ? 10 : key === 'grammar' ? 30 : 20;
        return `  ${key}: 平均${avg}/${max}点`;
      });

    const uniqueScenarios = [...new Set(scenarios)].slice(0, 5);

    let summary = `■ 会話練習 (直近${items.length}回)\n`;
    summary += `  練習した場面: ${uniqueScenarios.join(', ') || '不明'}\n`;
    if (scoreSummary.length > 0) {
      summary += `  採点結果:\n${scoreSummary.join('\n')}`;
    } else {
      summary += '  採点: まだ採点していません';
    }

    return summary;
  } catch (err) {
    console.error('getChatSummary error:', err);
    return '■ 会話: 取得エラー';
  }
}

async function getDisplayName(userId: string): Promise<string | null> {
  if (!PROFILE_TABLE) return null;

  try {
    const result = await ddb.send(new GetCommand({
      TableName: PROFILE_TABLE,
      Key: { pk: `COGNITO#${userId}`, sk: 'PROFILE' },
    }));
    return (result.Item?.displayName as string) ?? null;
  } catch {
    return null;
  }
}
