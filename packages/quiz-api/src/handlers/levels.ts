import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { LevelInfo } from '@bhs/shared';
import { getQuestionCountByLevel } from '../repositories/questionsRepository';
import { ok, internalError } from '../utils/response';

/** 現在サポートするレベル範囲。将来は DynamoDB のメタテーブルから取得する構成に変更可能 */
const MAX_LEVEL = 50;

export async function handleGetLevels(
  _event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  try {
    const levelNums = Array.from({ length: MAX_LEVEL }, (_, i) => i + 1);
    const counts = await Promise.all(levelNums.map((l) => getQuestionCountByLevel(l)));

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
