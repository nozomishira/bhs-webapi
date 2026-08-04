import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { ddb, QUIZ_SESSIONS_TABLE, CHAT_SESSIONS_TABLE } from '../db';

/**
 * get_weak_areas: ユーザーの苦手分野を分析して返す
 *
 * input: { userId: string }
 * output: { weakAreas: Array<{ area, averageScore, details }>, summary: string }
 */
export async function getWeakAreas(event: Record<string, unknown>) {
  const userId = event.userId as string;

  if (!userId) {
    return { error: 'userId is required' };
  }

  // クイズ結果を取得（直近30件）
  const quizResult = await ddb.send(new QueryCommand({
    TableName: QUIZ_SESSIONS_TABLE,
    IndexName: 'UserIdIndex',
    KeyConditionExpression: 'userId = :uid',
    ExpressionAttributeValues: {
      ':uid': `USER#${userId}`,
    },
    ScanIndexForward: false,
    Limit: 30,
  }));

  // チャット採点結果を取得（直近10件）
  const chatResult = await ddb.send(new QueryCommand({
    TableName: CHAT_SESSIONS_TABLE,
    KeyConditionExpression: 'pk = :pk',
    ExpressionAttributeValues: {
      ':pk': `USER#${userId}`,
    },
    ScanIndexForward: false,
    Limit: 10,
  }));

  // クイズ: courseType 別の正答率を集計
  const quizByType: Record<string, { total: number; correct: number }> = {};
  for (const item of quizResult.Items ?? []) {
    const type = item.courseType as string;
    if (!quizByType[type]) quizByType[type] = { total: 0, correct: 0 };
    quizByType[type].total += item.totalQuestions as number;
    quizByType[type].correct += item.score as number;
  }

  // チャット: 採点5観点の平均を集計
  const chatScores: Record<string, number[]> = {
    grammar: [],
    spelling: [],
    vocabulary: [],
    communication: [],
    naturalness: [],
  };

  for (const item of chatResult.Items ?? []) {
    const evaluation = item.evaluation as Record<string, unknown> | undefined;
    if (!evaluation) continue;
    for (const key of Object.keys(chatScores)) {
      const entry = evaluation[key] as { score?: number } | undefined;
      if (entry?.score !== undefined) {
        chatScores[key].push(entry.score);
      }
    }
  }

  // 苦手分野を特定
  const weakAreas: Array<{ area: string; averageScore: number; maxScore: number; details: string }> = [];

  // クイズの苦手
  for (const [type, stats] of Object.entries(quizByType)) {
    const rate = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
    if (rate < 70) {
      weakAreas.push({
        area: `クイズ: ${type}`,
        averageScore: rate,
        maxScore: 100,
        details: `正答率 ${rate}% (${stats.correct}/${stats.total})`,
      });
    }
  }

  // チャットの苦手
  for (const [key, scores] of Object.entries(chatScores)) {
    if (scores.length === 0) continue;
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const maxScore = key === 'naturalness' ? 10 : key === 'grammar' ? 30 : 20;
    const threshold = maxScore * 0.6;
    if (avg < threshold) {
      weakAreas.push({
        area: `会話: ${key}`,
        averageScore: avg,
        maxScore,
        details: `平均 ${avg}/${maxScore} 点 (直近${scores.length}回)`,
      });
    }
  }

  // サマリー生成
  const summary = weakAreas.length > 0
    ? `苦手分野が ${weakAreas.length} 件見つかりました: ${weakAreas.map(w => w.area).join(', ')}`
    : 'すべての分野で良好な成績です';

  return { weakAreas, summary };
}
