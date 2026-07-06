/**
 * Fisher-Yates シャッフル
 * DynamoDB はランダム取得非対応のため、Lambda 側で処理する
 */
export function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** 配列からランダムに N 件取得 */
export function pickRandom<T>(array: T[], count: number): T[] {
  return shuffle(array).slice(0, count);
}

/** レベルキーをゼロ埋め2桁にフォーマット: 1 → "01", 10 → "10" */
export function formatLevelKey(level: number): string {
  return String(level).padStart(2, '0');
}

/** DynamoDB の PK 形式に変換 */
export function levelToPk(level: number): string {
  return `LEVEL#${formatLevelKey(level)}`;
}
