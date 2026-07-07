/**
 * 初期問題データ定義
 * Level 1〜5: 各レベル 単語20問 + 文法20問 = 40問
 *
 * 各レベルのデータは scripts/data/levelN.ts に分割
 */
import { QuestionRecord } from '@bhs/shared';

export type SeedQuestion = Omit<QuestionRecord, 'pk' | 'sk' | 'levelKey' | 'createdAt' | 'updatedAt'>;

// 各レベルのデータをインポート
import { level1Questions } from './data/level1';
import { level2Questions } from './data/level2';
import { level3Questions } from './data/level3';
import { level4Questions } from './data/level4';
import { level5Questions } from './data/level5';

// 全レベルのデータをエクスポート
export const allSeedData: Record<number, SeedQuestion[]> = {
  1: level1Questions,
  2: level2Questions,
  3: level3Questions,
  4: level4Questions,
  5: level5Questions,
};
