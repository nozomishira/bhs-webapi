# プロジェクトルール

## AWS 設計原則

- **コスト最優先**: 固定費ゼロを目指す。マネージドサービスのオンデマンド課金・無料枠を最大活用する
- サービス選定: Lambda, DynamoDB (PAY_PER_REQUEST), API Gateway HTTP API, S3, CloudFront, Cognito, Bedrock (AgentCore Managed Harness)
- 不要なリソースは作らない
- CloudWatch Logs は保持期間3日（全環境）

## 技術スタック

- **言語**: Node.js (TypeScript) で統一。Python は使わない
- **ランタイム**: Node.js 24 (Lambda nodejs24.x)
- **モノレポ**: npm workspaces で packages/ 配下に複数 Lambda を管理
- **OSSバージョン**: 常に最新 LTS を使用

## パッケージ構成

| パッケージ | 用途 |
|---|---|
| packages/shared | 共通型定義 |
| packages/quiz-api | 問題取得・セッション・プロフィール |
| packages/chat-api | チャット会話・採点・履歴 |
| packages/coach-api | 学習コーチ Agent 呼び出し（予定） |
| packages/agent-tools | AgentCore MCP ツール Lambda（予定） |

## Bedrock / AgentCore

- モデル: Claude Haiku 4.5 (`jp.anthropic.claude-haiku-4-5-20251001-v1:0`)
- AgentCore: Managed Harness（コンテナ不使用、固定費ゼロ）
- Node.js SDK: `@aws-sdk/client-bedrock-agentcore`

## 未対応タスク

- UTコード追加（quiz-api / chat-api）
- AgentCore Agent 実装（chat-agent / coach-agent）
