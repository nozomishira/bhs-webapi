import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  QueryCommand,
  BatchGetCommand,
  PutCommand,
  QueryCommandInput,
} from '@aws-sdk/lib-dynamodb';
import { QuestionRecord, QuestionResponse, QuestionType } from '@bhs/shared';
import { levelToPk, pickRandom } from '../utils/shuffle';

const client = new DynamoDBClient({ region: process.env.AWS_REGION ?? 'ap-northeast-1' });
const ddb = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE = process.env.QUESTIONS_TABLE!;

async function getQuestionKeysByLevel(level: number): Promise<{ pk: string; sk: string }[]> {
  const pk = levelToPk(level);
  const params: QueryCommandInput = {
    TableName: TABLE,
    KeyConditionExpression: 'pk = :pk',
    ExpressionAttributeValues: { ':pk': pk },
    ProjectionExpression: 'pk, sk',
  };
  const result = await ddb.send(new QueryCommand(params));
  return (result.Items ?? []) as { pk: string; sk: string }[];
}

async function batchGetQuestions(keys: { pk: string; sk: string }[]): Promise<QuestionRecord[]> {
  if (keys.length === 0) return [];

  const BATCH_SIZE = 100;
  const records: QuestionRecord[] = [];

  for (let i = 0; i < keys.length; i += BATCH_SIZE) {
    const chunk = keys.slice(i, i + BATCH_SIZE);
    const result = await ddb.send(
      new BatchGetCommand({ RequestItems: { [TABLE]: { Keys: chunk } } })
    );
    records.push(...((result.Responses?.[TABLE] ?? []) as QuestionRecord[]));
  }
  return records;
}

export async function getRandomQuestions(
  level: number,
  count: number,
  type?: QuestionType
): Promise<QuestionResponse[]> {
  const allKeys = await getQuestionKeysByLevel(level);

  if (type) {
    // type 指定あり: 全件取得してフィルタ（各レベル20問程度なのでコスト無視できる）
    const allRecords = await batchGetQuestions(allKeys);
    return pickRandom(allRecords.filter((r) => r.type === type), count).map(toResponse);
  }

  // type 指定なし: キーだけシャッフルして N 件分だけフェッチ
  return batchGetQuestions(pickRandom(allKeys, count)).then((r) => r.map(toResponse));
}

export async function getQuestionCountByLevel(level: number, type?: QuestionType): Promise<number> {
  const pk = levelToPk(level);

  if (type) {
    // type フィルタあり: FilterExpression を使う
    const result = await ddb.send(
      new QueryCommand({
        TableName: TABLE,
        KeyConditionExpression: 'pk = :pk',
        FilterExpression: '#t = :type',
        ExpressionAttributeNames: { '#t': 'type' },
        ExpressionAttributeValues: { ':pk': pk, ':type': type },
        Select: 'COUNT',
      })
    );
    return result.Count ?? 0;
  }

  const result = await ddb.send(
    new QueryCommand({
      TableName: TABLE,
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: { ':pk': pk },
      Select: 'COUNT',
    })
  );
  return result.Count ?? 0;
}

export async function putQuestion(record: QuestionRecord): Promise<void> {
  await ddb.send(new PutCommand({ TableName: TABLE, Item: record }));
}

function toResponse(r: QuestionRecord): QuestionResponse {
  return {
    questionId: r.questionId,
    level: r.level,
    type: r.type,
    category: r.category,
    question: r.question,
    options: r.options,
    correctAnswer: r.correctAnswer,
    explanation: r.explanation,
    ...(r.indonesianWord !== undefined && { indonesianWord: r.indonesianWord }),
  };
}
