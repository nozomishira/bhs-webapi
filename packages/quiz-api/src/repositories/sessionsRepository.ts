import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { QuizSessionRecord, SaveSessionRequest } from '@bhs/shared';

const client = new DynamoDBClient({ region: process.env.AWS_REGION ?? 'ap-northeast-1' });
const ddb = DynamoDBDocumentClient.from(client);

const TABLE = process.env.SESSIONS_TABLE!;

function ttlIn90Days(): number {
  return Math.floor(Date.now() / 1000) + 90 * 24 * 60 * 60;
}

export async function saveSession(req: SaveSessionRequest, userId?: string): Promise<QuizSessionRecord> {
  const sessionId = uuidv4();
  const now = new Date().toISOString();

  const record: QuizSessionRecord = {
    pk: `SESSION#${sessionId}`,
    sk: 'METADATA',
    sessionId,
    ...(userId && { userId: `USER#${userId}` }),
    level: req.level,
    questionCount: req.questionCount,
    score: req.score,
    totalQuestions: req.totalQuestions,
    courseType: req.courseType,
    createdAt: now,
    ttl: ttlIn90Days(),
  };

  await ddb.send(new PutCommand({ TableName: TABLE, Item: record }));
  return record;
}
