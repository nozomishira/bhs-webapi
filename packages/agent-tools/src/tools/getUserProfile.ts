import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { ddb, USER_PROFILES_TABLE } from '../db';

/**
 * get_user_profile: ユーザープロフィールを取得
 *
 * input: { userId: string }
 * output: { profile: { displayName, gender, bio, createdAt } | null }
 */
export async function getUserProfile(event: Record<string, unknown>) {
  const userId = event.userId as string;

  if (!userId) {
    return { error: 'userId is required' };
  }

  const result = await ddb.send(new GetCommand({
    TableName: USER_PROFILES_TABLE,
    Key: {
      pk: `COGNITO#${userId}`,
      sk: 'PROFILE',
    },
  }));

  if (!result.Item) {
    return { profile: null };
  }

  return {
    profile: {
      displayName: result.Item.displayName,
      gender: result.Item.gender,
      bio: result.Item.bio,
      createdAt: result.Item.createdAt,
    },
  };
}
