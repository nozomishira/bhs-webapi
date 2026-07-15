import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { ok, badRequest, internalError } from '../utils/response';

const client = new DynamoDBClient({ region: process.env.AWS_REGION ?? 'ap-northeast-1' });
const ddb = DynamoDBDocumentClient.from(client);
const TABLE = process.env.CHAT_SESSIONS_TABLE!;

/** JWT からユーザー ID (sub) を抽出 */
function getUserIdFromEvent(event: APIGatewayProxyEventV2): string | null {
  // API Gateway JWT Authorizer が検証済みの JWT claims を設定する
  const claims = (event.requestContext as unknown as { authorizer?: { jwt?: { claims?: Record<string, string> } } })
    ?.authorizer?.jwt?.claims;
  return claims?.sub ?? null;
}

/** TTL: 90日後の Unix タイムスタンプ */
function ttlIn90Days(): number {
  return Math.floor(Date.now() / 1000) + 90 * 24 * 60 * 60;
}

// --------------------------------------------------------
// POST /chat/history - 会話履歴を保存
// --------------------------------------------------------
interface SaveHistoryRequest {
  scenarioId: string;
  scenarioName: string;
  messages: { role: string; content: string }[];
  evaluation?: Record<string, unknown>;
  sessionId?: string;  // 再開時: 同じ sessionId で上書き
}

export async function handleSaveHistory(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const userId = getUserIdFromEvent(event);
  if (!userId) {
    return badRequest('認証情報が不正です');
  }

  let body: Partial<SaveHistoryRequest>;
  try {
    body = JSON.parse(event.body ?? '{}') as Partial<SaveHistoryRequest>;
  } catch {
    return badRequest('リクエストボディが不正な JSON です');
  }

  const { scenarioId, scenarioName, messages, evaluation, sessionId: existingSessionId } = body;

  if (!scenarioId || !messages || !Array.isArray(messages) || messages.length === 0) {
    return badRequest('scenarioId と messages は必須です');
  }

  const sessionId = existingSessionId ?? uuidv4();
  const now = new Date().toISOString();

  try {
    let sk: string;

    if (existingSessionId) {
      // 既存セッションの SK を検索して上書き
      const existing = await ddb.send(new QueryCommand({
        TableName: TABLE,
        KeyConditionExpression: 'pk = :pk AND begins_with(sk, :skPrefix)',
        FilterExpression: 'sessionId = :sid',
        ExpressionAttributeValues: {
          ':pk': `USER#${userId}`,
          ':skPrefix': 'SESSION#',
          ':sid': existingSessionId,
        },
        ProjectionExpression: 'sk',
        Limit: 1,
      }));
      sk = existing.Items?.[0]?.sk ?? `SESSION#${now}#${sessionId}`;
    } else {
      sk = `SESSION#${now}#${sessionId}`;
    }

    await ddb.send(new PutCommand({
      TableName: TABLE,
      Item: {
        pk: `USER#${userId}`,
        sk,
        sessionId,
        userId,
        scenarioId,
        scenarioName: scenarioName ?? scenarioId,
        messages,
        evaluation: evaluation ?? null,
        messageCount: messages.length,
        createdAt: existingSessionId ? (sk.split('#')[1] ?? now) : now,
        updatedAt: now,
        ttl: ttlIn90Days(),
      },
    }));

    return ok({ sessionId, createdAt: now });
  } catch (err) {
    console.error('handleSaveHistory error:', err);
    return internalError();
  }
}

// --------------------------------------------------------
// GET /chat/history - ユーザーの会話履歴一覧を取得
// --------------------------------------------------------
export async function handleGetHistory(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const userId = getUserIdFromEvent(event);
  if (!userId) {
    return badRequest('認証情報が不正です');
  }

  const limit = Number(event.queryStringParameters?.limit ?? '20');

  try {
    const result = await ddb.send(new QueryCommand({
      TableName: TABLE,
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: { ':pk': `USER#${userId}` },
      ScanIndexForward: false, // 新しい順
      Limit: limit,
      ProjectionExpression: 'sessionId, scenarioId, scenarioName, messageCount, evaluation, createdAt',
    }));

    const sessions = (result.Items ?? []).map((item) => ({
      sessionId: item.sessionId,
      scenarioId: item.scenarioId,
      scenarioName: item.scenarioName,
      messageCount: item.messageCount,
      score: item.evaluation?.totalScore ?? null,
      createdAt: item.createdAt,
    }));

    return ok({ sessions, count: sessions.length });
  } catch (err) {
    console.error('handleGetHistory error:', err);
    return internalError();
  }
}

// --------------------------------------------------------
// GET /chat/history/{sessionId} - 特定セッションの詳細取得
// --------------------------------------------------------
export async function handleGetHistoryDetail(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const userId = getUserIdFromEvent(event);
  if (!userId) {
    return badRequest('認証情報が不正です');
  }

  const sessionId = event.pathParameters?.sessionId;
  if (!sessionId) {
    return badRequest('sessionId が必要です');
  }

  try {
    // sessionId から SK を特定するために Query + filter
    const result = await ddb.send(new QueryCommand({
      TableName: TABLE,
      KeyConditionExpression: 'pk = :pk AND begins_with(sk, :skPrefix)',
      FilterExpression: 'sessionId = :sid',
      ExpressionAttributeValues: {
        ':pk': `USER#${userId}`,
        ':skPrefix': 'SESSION#',
        ':sid': sessionId,
      },
    }));

    const item = result.Items?.[0];
    if (!item) {
      return { statusCode: 404, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ success: false, error: '履歴が見つかりません' }) };
    }

    return ok({
      sessionId: item.sessionId,
      scenarioId: item.scenarioId,
      scenarioName: item.scenarioName,
      messages: item.messages,
      evaluation: item.evaluation,
      createdAt: item.createdAt,
    });
  } catch (err) {
    console.error('handleGetHistoryDetail error:', err);
    return internalError();
  }
}
