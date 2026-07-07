# bhs-webapi

bhs-indonesia-webapp の API サーバー。  
Lambda + API Gateway HTTP API (v2) で動作する Node.js (TypeScript) モノレポ。

---

## ディレクトリ構成

```
bhs-webapi/
├── packages/
│   ├── shared/                    # 共通型定義 (@bhs/shared)
│   │   └── src/
│   │       ├── index.ts
│   │       └── types.ts
│   └── quiz-api/                  # 問題取得・セッション管理 Lambda
│       ├── src/
│       │   ├── index.ts           # Lambda エントリポイント・ルーティング
│       │   ├── handlers/
│       │   │   ├── health.ts      # GET /health
│       │   │   ├── levels.ts      # GET /levels
│       │   │   ├── questions.ts   # GET /questions
│       │   │   └── sessions.ts    # POST /sessions
│       │   ├── repositories/
│       │   │   ├── questionsRepository.ts
│       │   │   └── sessionsRepository.ts
│       │   └── utils/
│       │       ├── response.ts    # APIレスポンスヘルパー
│       │       └── shuffle.ts     # Fisher-Yates シャッフル
│       └── scripts/
│           ├── seed.ts            # データ投入スクリプト本体
│           ├── seed-data.ts       # 初期問題データ (Level 1〜5 各20問)
│           └── tsconfig.json
├── package.json                   # npm workspaces ルート
└── tsconfig.json                  # project references ルート
```

---

## エンドポイント一覧

| メソッド | パス | 説明 |
|---|---|---|
| GET | /health | ヘルスチェック |
| GET | /levels | 利用可能レベル一覧（問題数付き） |
| GET | /questions | 問題をランダム取得 |
| POST | /sessions | クイズセッション結果を保存 |

### GET /questions クエリパラメータ

| パラメータ | 必須 | 説明 | 例 |
|---|---|---|---|
| `level` | ✓ | レベル (1〜50) | `?level=1` |
| `count` | - | 問題数 5/10/15/20（デフォルト: 10） | `?count=10` |
| `type` | - | vocabulary / grammar（省略で両方） | `?type=vocabulary` |

---

## セットアップ

```bash
cd bhs-webapi
npm install
```

---

## ビルドと Lambda パッケージング

```bash
# shared と quiz-api を順番にビルド
npm run build

# zip にまとめる (Lambda デプロイ用) → packages/quiz-api/function.zip が生成
npm run package:quiz-api
```

---

## Lambda への手動デプロイ（CI/CD なしの場合）

```bash
# ビルド & パッケージング
npm run package:quiz-api

# Lambda にアップロード
aws lambda update-function-code \
  --function-name dev-apne1-bhs-quiz-api \
  --zip-file fileb://packages/quiz-api/function.zip \
  --region ap-northeast-1
```

---

## 初期データ投入

DynamoDB テーブルが CloudFormation でデプロイ済みの状態で実行する。

```bash
# dev 環境に Level 1〜5 全問投入
npm run seed:dev

# 確認のみ（実際には書き込まない）
ENV=dev npx ts-node --project packages/quiz-api/scripts/tsconfig.json \
  packages/quiz-api/scripts/seed.ts --dry-run

# Level 1 のみ再投入
ENV=dev npx ts-node --project packages/quiz-api/scripts/tsconfig.json \
  packages/quiz-api/scripts/seed.ts --level 1
```

---

## 環境変数（Lambda に設定済み・CFn で管理）

| 変数名 | 説明 | 例 |
|---|---|---|
| `QUESTIONS_TABLE` | Questions テーブル名 | `dev-apne1-bhs-questions` |
| `SESSIONS_TABLE` | Sessions テーブル名 | `dev-apne1-bhs-quiz-sessions` |
| `ENV` | 環境名 | `dev` / `test` / `prod` |
| `CORS_ORIGIN` | CORS AllowOrigin | dev: `*`、prod: CloudFront URL |

---

## 問題データの追加方法

問題データは `packages/quiz-api/scripts/data/` にレベルごとのファイルとして管理しています。

### ファイル構成

```
scripts/
├── seed.ts              # 投入スクリプト本体（変更不要）
├── seed-data.ts         # allSeedData をまとめるファイル
└── data/
    ├── level1.ts        # Level 1: 単語20問 + 文法20問
    ├── level2.ts        # Level 2
    ├── level3.ts
    ├── level4.ts
    └── level5.ts
```

### 既存レベルに問題を追加する

`scripts/data/levelN.ts` の `levelNVocabulary` または `levelNGrammar` 配列に追加します。

```typescript
// 単語問題の例
{
  questionId: 'l1-v021',       // ユニークID (l{level}-v{番号})
  level: 1,                    // レベル番号
  type: 'vocabulary',          // 'vocabulary' | 'grammar'
  category: 'food',            // カテゴリ（自由に設定可）
  question: '「美味しい」のインドネシア語は？',
  options: ['Manis', 'Enak', 'Pedas', 'Asin'],  // 4択
  correctAnswer: 1,            // 正解のインデックス (0-3)
  explanation: 'Enak = 美味しい。Manis = 甘い、Pedas = 辛い。',
  indonesianWord: 'Enak',      // 単語問題のみ（文法問題では省略）
}
```

```typescript
// 文法問題の例
{
  questionId: 'l1-g021',       // ユニークID (l{level}-g{番号})
  level: 1,
  type: 'grammar',
  category: 'passive',
  question: '「この本は読まれています」の正しいインドネシア語は？',
  options: ['Buku ini membaca.', 'Buku ini dibaca.', '...', '...'],
  correctAnswer: 1,
  explanation: 'di- + 動詞語根 で受動態。',
  // indonesianWord は文法問題では不要
}
```

### 新しいレベルを追加する

1. `scripts/data/level6.ts` を作成:

```typescript
import { SeedQuestion } from '../seed-data';

export const level6Vocabulary: SeedQuestion[] = [
  // 単語20問
];

export const level6Grammar: SeedQuestion[] = [
  // 文法20問
];

export const level6Questions: SeedQuestion[] = [...level6Vocabulary, ...level6Grammar];
```

2. `scripts/seed-data.ts` に import を追加:

```typescript
import { level6Questions } from './data/level6';

export const allSeedData: Record<number, SeedQuestion[]> = {
  1: level1Questions,
  2: level2Questions,
  3: level3Questions,
  4: level4Questions,
  5: level5Questions,
  6: level6Questions, // ← 追加
};
```

3. 投入:

```bash
# 新しいレベルだけ投入
npm run seed:dev -- --level 6

# 全レベル再投入
npm run seed:dev
```

### AWS CLI で直接1問追加する方法

```bash
aws dynamodb put-item \
  --table-name dev-apne1-bhs-questions \
  --item '{
    "pk": {"S": "LEVEL#06"},
    "sk": {"S": "QUESTION#l6-v001"},
    "questionId": {"S": "l6-v001"},
    "level": {"N": "6"},
    "levelKey": {"S": "06"},
    "type": {"S": "vocabulary"},
    "category": {"S": "food"},
    "question": {"S": "「美味しい」のインドネシア語は？"},
    "options": {"L": [{"S":"Manis"},{"S":"Enak"},{"S":"Pedas"},{"S":"Asin"}]},
    "correctAnswer": {"N": "1"},
    "explanation": {"S": "Enak = 美味しい。"},
    "indonesianWord": {"S": "Enak"},
    "createdAt": {"S": "2026-07-06T00:00:00.000Z"},
    "updatedAt": {"S": "2026-07-06T00:00:00.000Z"}
  }' \
  --region ap-northeast-1
```

---

## 将来の Lambda 追加予定

| Lambda 名 | 用途 | パッケージ |
|---|---|---|
| `{prefix}-bhs-quiz-api` | 問題取得・セッション記録 | packages/quiz-api ✅ |
| `{prefix}-bhs-chat-api` | Bedrock 会話AI | packages/chat-api（未作成） |
| `{prefix}-bhs-voice-api` | Bedrock 発音チェック | packages/voice-api（未作成） |
