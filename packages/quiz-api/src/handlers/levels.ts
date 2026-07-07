import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { LevelInfo, QuestionType } from '@bhs/shared';
import { getQuestionCountByLevel } from '../repositories/questionsRepository';
import { ok, badRequest, internalError } from '../utils/response';

const MAX_LEVEL = 50;

export async function handleGetLevels(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const qs = event.queryStringParameters ?? {};

  // type パラメータ（省略可）
  const typeRaw = qs['type'];
  let type: QuestionType | undefined;
  if (typeRaw !== undefined) {
    if (typeRaw !== 'vocabulary' && typeRaw !== 'grammar') {
      return badRequest('type は vocabulary または grammar を指定してください');
    }
    type = typeRaw;
  }

  try {
    const levelNums = Array.from({ length: MAX_LEVEL }, (_, i) => i + 1);
    const counts = await Promise.all(levelNums.map((l) => getQuestionCountByLevel(l, type)));

    const levels: LevelInfo[] = levelNums
      .map((level, idx) => ({
        level,
        label: `Level ${level}`,
        questionCount: counts[idx],
      }))
      .filter((l) => l.questionCount > 0);

    return ok({ levels, maxLevel: MAX_LEVEL });
  } catch (err) {
    console.error('handleGetLevels error:', err);
    return internalError();
  }
}
