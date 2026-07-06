import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { QuestionType } from '@bhs/shared';
import { getRandomQuestions } from '../repositories/questionsRepository';
import { ok, badRequest, internalError } from '../utils/response';

const ALLOWED_COUNTS = [5, 10, 15, 20] as const;
type AllowedCount = (typeof ALLOWED_COUNTS)[number];

const MAX_LEVEL = 50;

export async function handleGetQuestions(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const qs = event.queryStringParameters ?? {};

  // level
  const levelRaw = qs['level'];
  if (!levelRaw) {
    return badRequest('level パラメータは必須です (例: ?level=1)');
  }
  const level = Number(levelRaw);
  if (!Number.isInteger(level) || level < 1 || level > MAX_LEVEL) {
    return badRequest(`level は 1〜${MAX_LEVEL} の整数で指定してください`);
  }

  // count (省略時は 10)
  const countRaw = qs['count'] ?? '10';
  const count = Number(countRaw) as AllowedCount;
  if (!ALLOWED_COUNTS.includes(count)) {
    return badRequest(`count は ${ALLOWED_COUNTS.join('/')} のいずれかを指定してください`);
  }

  // type (省略可)
  const typeRaw = qs['type'];
  let type: QuestionType | undefined;
  if (typeRaw !== undefined) {
    if (typeRaw !== 'vocabulary' && typeRaw !== 'grammar') {
      return badRequest('type は vocabulary または grammar を指定してください');
    }
    type = typeRaw;
  }

  try {
    const questions = await getRandomQuestions(level, count, type);

    if (questions.length === 0) {
      return ok({
        questions: [],
        level,
        count: 0,
        message: `Level ${level} の問題がまだ登録されていません`,
      });
    }

    return ok({ questions, level, count: questions.length });
  } catch (err) {
    console.error('handleGetQuestions error:', err);
    return internalError();
  }
}
