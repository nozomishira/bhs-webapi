import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: process.env.AWS_REGION ?? 'ap-northeast-1' });
export const ddb = DynamoDBDocumentClient.from(client);

export const CHAT_SESSIONS_TABLE = process.env.CHAT_SESSIONS_TABLE!;
export const QUIZ_SESSIONS_TABLE = process.env.QUIZ_SESSIONS_TABLE!;
export const USER_PROFILES_TABLE = process.env.USER_PROFILES_TABLE!;
