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

1. `packages/quiz-api/scripts/seed-data.ts` に新しいレベルのデータを追加
2. ファイル末尾の `allSeedData` に追記
3. `npm run seed:dev` で投入

```typescript
// 例: Level 6 を追加
export const level6Questions: SeedQuestion[] = [
  { questionId: 'l6-001', level: 6, ... },
  ...
];

export const allSeedData: Record<number, SeedQuestion[]> = {
  1: level1Questions,
  ...
  6: level6Questions, // ← 追加するだけ
};
```

---

## 将来の Lambda 追加予定

| Lambda 名 | 用途 | パッケージ |
|---|---|---|
| `{prefix}-bhs-quiz-api` | 問題取得・セッション記録 | packages/quiz-api ✅ |
| `{prefix}-bhs-chat-api` | Bedrock 会話AI | packages/chat-api（未作成） |
| `{prefix}-bhs-voice-api` | Bedrock 発音チェック | packages/voice-api（未作成） |
