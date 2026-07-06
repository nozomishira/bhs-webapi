# bhs-webapi

bhs-indonesia-webapp の API サーバー。
Lambda + API Gateway HTTP API (v2) で動作する Node.js (TypeScript) アプリ。

---

## ディレクトリ構成

```
bhs-webapi/
├── src/
│   ├── index.ts                  # Lambda エントリポイント・ルーティング
│   ├── types.ts                  # 型定義
│   ├── handlers/
│   │   ├── health.ts             # GET /health
│   │   ├── levels.ts             # GET /levels
│   │   ├── questions.ts          # GET /questions
│   │   └── sessions.ts           # POST /sessions
│   ├── repositories/
│   │   ├── questionsRepository.ts  # DynamoDB 問題テーブル操作
│   │   └── sessionsRepository.ts   # DynamoDB セッションテーブル操作
│   └── utils/
│       ├── response.ts           # API レスポンスヘルパー
│       └── shuffle.ts            # Fisher-Yates シャッフル
├── scripts/
│   ├── seed.ts                   # データ投入スクリプト本体
│   ├── seed-data.ts              # 初期問題データ (Level 1〜5 各20問)
│   └── tsconfig.json
├── package.json
└── tsconfig.json
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
# TypeScript をコンパイル
npm run build

# dist/ を zip にまとめる (Lambda デプロイ用)
npm run package
# → function.zip が生成される
```

---

## 初期データ投入

DynamoDB テーブルが CFn でデプロイ済みの状態で実行する。

```bash
# dev 環境に Level 1〜5 全問投入
ENV=dev npx ts-node scripts/seed.ts

# 確認のみ（実際には書き込まない）
ENV=dev npx ts-node scripts/seed.ts --dry-run

# Level 1 のみ再投入
ENV=dev npx ts-node scripts/seed.ts --level 1

# test 環境に投入
ENV=test npx ts-node scripts/seed.ts
```

---

## Lambda への手動デプロイ（CI/CD なしの場合）

```bash
# ビルド & zip
npm run package

# Lambda にアップロード
aws lambda update-function-code \
  --function-name dev-apne1-bhs-webapi \
  --zip-file fileb://function.zip \
  --region ap-northeast-1
```

---

## 環境変数（Lambda 設定済み）

| 変数名 | 説明 |
|---|---|
| `QUESTIONS_TABLE` | Questions テーブル名（例: `dev-apne1-bhs-questions`） |
| `SESSIONS_TABLE` | Sessions テーブル名（例: `dev-apne1-bhs-quiz-sessions`） |
| `ENV` | 環境名（dev / test / prod） |
| `CORS_ORIGIN` | CORS AllowOrigin（dev: `*`、prod: CloudFront URL） |

---

## 問題データの追加方法

1. `scripts/seed-data.ts` に新しいレベルのデータを追加する
2. `allSeedData` オブジェクトに追記する
3. `npm run seed:dev` で投入する

レベル50まで拡張する場合は、同ファイルに `level6Questions`〜`level50Questions` を追記するだけ。
