/**
 * DynamoDB 初期データ投入スクリプト
 *
 * 使い方 (packages/quiz-api/ から実行):
 *   ENV=dev  npx ts-node --project scripts/tsconfig.json scripts/seed.ts
 *   ENV=dev  npx ts-node --project scripts/tsconfig.json scripts/seed.ts --level 1
 *   ENV=dev  npx ts-node --project scripts/tsconfig.json scripts/seed.ts --dry-run
 *
 * ルートから実行する場合:
 *   npm run seed:dev   (ルート package.json に定義)
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  BatchWriteCommand,
  BatchWriteCommandInput,
} from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { QuestionRecord } from '@bhs/shared';
import { allSeedData, SeedQuestion } from './seed-data';

// ---- 設定 ----
const ENV = process.env.ENV ?? 'dev';
const PREFIX_MAP: Record<string, string> = {
  dev: 'dev-apne1',
  test: 'test-apne1',
  prod: 'prod-apne1',
};
const PREFIX = process.env.PREFIX ?? PREFIX_MAP[ENV] ?? 'dev-apne1';
const TABLE_NAME = `${PREFIX}-bhs-questions`;
const REGION = process.env.AWS_REGION ?? 'ap-northeast-1';
const BATCH_SIZE = 25;

// ---- CLI オプション ----
const args = process.argv.slice(2);
const levelArg = args.includes('--level') ? Number(args[args.indexOf('--level') + 1]) : null;
const isDryRun = args.includes('--dry-run');

// ---- DynamoDB クライアント ----
const client = new DynamoDBClient({ region: REGION });
const ddb = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

function seedQuestionToRecord(q: SeedQuestion): QuestionRecord {
  const now = new Date().toISOString();
  const levelKey = String(q.level).padStart(2, '0');
  const questionId = q.questionId ?? uuidv4();
  return {
    pk: `LEVEL#${levelKey}`,
    sk: `QUESTION#${questionId}`,
    questionId,
    level: q.level,
    levelKey,
    type: q.type,
    category: q.category,
    question: q.question,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    ...(q.indonesianWord !== undefined && { indonesianWord: q.indonesianWord }),
    createdAt: now,
    updatedAt: now,
  };
}

async function batchWrite(records: QuestionRecord[]): Promise<void> {
  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const chunk = records.slice(i, i + BATCH_SIZE);
    const params: BatchWriteCommandInput = {
      RequestItems: {
        [TABLE_NAME]: chunk.map((item) => ({ PutRequest: { Item: item } })),
      },
    };

    if (isDryRun) {
      console.log(`[DRY RUN] Would write ${chunk.length} items to ${TABLE_NAME}`);
      chunk.forEach((r) => console.log(`  - ${r.pk} / ${r.sk} (${r.question.substring(0, 40)})`));
      continue;
    }

    const result = await ddb.send(new BatchWriteCommand(params));
    const unprocessed = result.UnprocessedItems?.[TABLE_NAME]?.length ?? 0;
    if (unprocessed > 0) {
      console.warn(`  ⚠ UnprocessedItems: ${unprocessed} 件。リトライしてください`);
    } else {
      console.log(`  ✓ ${chunk.length} 件書き込み完了`);
    }
  }
}

async function main(): Promise<void> {
  console.log('='.repeat(60));
  console.log('bhs-questions シード スクリプト');
  console.log(`  ENV    : ${ENV}`);
  console.log(`  PREFIX : ${PREFIX}`);
  console.log(`  TABLE  : ${TABLE_NAME}`);
  console.log(`  REGION : ${REGION}`);
  console.log(`  DRY RUN: ${isDryRun}`);
  if (levelArg) console.log(`  LEVEL  : ${levelArg} のみ`);
  console.log('='.repeat(60));

  const targetLevels = levelArg
    ? [levelArg]
    : Object.keys(allSeedData).map(Number).sort((a, b) => a - b);

  let totalInserted = 0;

  for (const level of targetLevels) {
    const questions = allSeedData[level];
    if (!questions || questions.length === 0) {
      console.warn(`Level ${level}: データなし。スキップ`);
      continue;
    }
    console.log(`\nLevel ${level}: ${questions.length} 問を投入中...`);
    await batchWrite(questions.map(seedQuestionToRecord));
    totalInserted += questions.length;
    console.log(`Level ${level}: 完了`);
  }

  console.log('\n' + '='.repeat(60));
  console.log(`投入完了: 合計 ${totalInserted} 問`);
  if (isDryRun) console.log('（DRY RUN のため実際には書き込まれていません）');
  console.log('='.repeat(60));
}

main().catch((err) => {
  console.error('シード スクリプトでエラーが発生しました:', err);
  process.exit(1);
});
