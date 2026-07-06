// ========================================================
// ドメイン型定義 (全パッケージ共通)
// ========================================================

/** 問題のタイプ */
export type QuestionType = 'vocabulary' | 'grammar';

/** DynamoDB に保存する問題レコード */
export interface QuestionRecord {
  pk: string;           // "LEVEL#01"
  sk: string;           // "QUESTION#<uuid>"
  questionId: string;
  level: number;
  levelKey: string;     // GSI用: "01" (ゼロ埋め2桁)
  type: QuestionType;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-3
  explanation: string;
  indonesianWord?: string;
  createdAt: string;
  updatedAt: string;
}

/** API レスポンス用の問題型 (pk/sk などの内部キーを除外) */
export interface QuestionResponse {
  questionId: string;
  level: number;
  type: QuestionType;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  indonesianWord?: string;
}

/** クイズセッション記録 */
export interface QuizSessionRecord {
  pk: string;           // "SESSION#<uuid>"
  sk: string;           // "METADATA"
  sessionId: string;
  level: number;
  questionCount: number;
  score: number;
  totalQuestions: number;
  courseType: string;
  createdAt: string;
  ttl: number;          // Unix timestamp (90日後)
}

/** POST /sessions リクエストボディ */
export interface SaveSessionRequest {
  level: number;
  questionCount: number;
  score: number;
  totalQuestions: number;
  courseType: string;
}

/** API 共通レスポンス */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/** レベル情報 */
export interface LevelInfo {
  level: number;
  label: string;         // "Level 1"
  questionCount: number; // そのレベルの問題数
}
