import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { ok, badRequest, internalError } from '../utils/response';

const client = new DynamoDBClient({ region: process.env.AWS_REGION ?? 'ap-northeast-1' });
const ddb = DynamoDBDocumentClient.from(client);
const TABLE = process.env.USER_PROFILES_TABLE!;

const VALID_GENDERS = ['male', 'female', 'other', 'unspecified'];

/** JWT から Cognito sub を取得 */
function getUserSub(event: APIGatewayProxyEventV2): string | null {
  const claims = (event.requestContext as unknown as { authorizer?: { jwt?: { claims?: Record<string, string> } } })
    ?.authorizer?.jwt?.claims;
  return claims?.sub ?? null;
}

/** JWT から email を取得 */
function getEmail(event: APIGatewayProxyEventV2): string | null {
  const claims = (event.requestContext as unknown as { authorizer?: { jwt?: { claims?: Record<string, string> } } })
    ?.authorizer?.jwt?.claims;
  return claims?.email ?? null;
}

// --------------------------------------------------------
// GET /profile
// --------------------------------------------------------
export async function handleGetProfile(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const sub = getUserSub(event);
  if (!sub) return badRequest('認証情報が不正です');

  try {
    const result = await ddb.send(new GetCommand({
      TableName: TABLE,
      Key: { pk: `COGNITO#${sub}`, sk: 'PROFILE' },
    }));

    if (!result.Item) {
      // プロフィール未作成 → 初期プロフィールを自動作成
      const email = getEmail(event) ?? '';
      const userId = uuidv4();
      const now = new Date().toISOString();
      const newProfile = {
        pk: `COGNITO#${sub}`,
        sk: 'PROFILE',
        userId,
        cognitoSub: sub,
        email,
        displayName: email.split('@')[0] ?? 'ユーザー',
        gender: 'unspecified',
        bio: '',
        createdAt: now,
        updatedAt: now,
      };

      await ddb.send(new PutCommand({ TableName: TABLE, Item: newProfile }));

      return ok({
        userId: newProfile.userId,
        email: newProfile.email,
        displayName: newProfile.displayName,
        gender: newProfile.gender,
        bio: newProfile.bio,
        createdAt: newProfile.createdAt,
      });
    }

    return ok({
      userId: result.Item.userId,
      email: result.Item.email,
      displayName: result.Item.displayName,
      gender: result.Item.gender,
      bio: result.Item.bio,
      createdAt: result.Item.createdAt,
    });
  } catch (err) {
    console.error('handleGetProfile error:', err);
    return internalError();
  }
}

// --------------------------------------------------------
// PUT /profile
// --------------------------------------------------------
interface UpdateProfileRequest {
  displayName?: string;
  gender?: string;
  bio?: string;
}

export async function handlePutProfile(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const sub = getUserSub(event);
  if (!sub) return badRequest('認証情報が不正です');

  let body: UpdateProfileRequest;
  try {
    body = JSON.parse(event.body ?? '{}') as UpdateProfileRequest;
  } catch {
    return badRequest('リクエストボディが不正な JSON です');
  }

  // バリデーション
  if (body.displayName !== undefined) {
    if (typeof body.displayName !== 'string' || body.displayName.trim().length === 0 || body.displayName.length > 30) {
      return badRequest('displayName は1〜30文字で指定してください');
    }
  }
  if (body.gender !== undefined && !VALID_GENDERS.includes(body.gender)) {
    return badRequest(`gender は ${VALID_GENDERS.join('/')} のいずれかを指定してください`);
  }
  if (body.bio !== undefined && body.bio.length > 200) {
    return badRequest('bio は200文字以内で指定してください');
  }

  // 更新する属性を構築
  const updates: string[] = [];
  const values: Record<string, unknown> = {};
  const names: Record<string, string> = {};

  if (body.displayName !== undefined) {
    updates.push('#dn = :dn');
    values[':dn'] = body.displayName.trim();
    names['#dn'] = 'displayName';
  }
  if (body.gender !== undefined) {
    updates.push('#g = :g');
    values[':g'] = body.gender;
    names['#g'] = 'gender';
  }
  if (body.bio !== undefined) {
    updates.push('#b = :b');
    values[':b'] = body.bio;
    names['#b'] = 'bio';
  }

  if (updates.length === 0) {
    return badRequest('更新する項目を指定してください');
  }

  updates.push('#ua = :ua');
  values[':ua'] = new Date().toISOString();
  names['#ua'] = 'updatedAt';

  try {
    const result = await ddb.send(new UpdateCommand({
      TableName: TABLE,
      Key: { pk: `COGNITO#${sub}`, sk: 'PROFILE' },
      UpdateExpression: `SET ${updates.join(', ')}`,
      ExpressionAttributeValues: values,
      ExpressionAttributeNames: names,
      ReturnValues: 'ALL_NEW',
    }));

    const item = result.Attributes!;
    return ok({
      userId: item.userId,
      email: item.email,
      displayName: item.displayName,
      gender: item.gender,
      bio: item.bio,
      createdAt: item.createdAt,
    });
  } catch (err) {
    console.error('handlePutProfile error:', err);
    return internalError();
  }
}
