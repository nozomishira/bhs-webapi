import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';
import { getScenario, SCENARIO_IDS } from '../scenarios';
import { ok, badRequest, internalError } from '../utils/response';

const bedrockClient = new BedrockRuntimeClient({
  region: process.env.BEDROCK_REGION ?? 'ap-northeast-1',
});

const MODEL_ID = process.env.BEDROCK_MODEL_ID ?? 'jp.anthropic.claude-haiku-4-5-20251001-v1:0';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface EvaluateRequest {
  scenarioId: string;
  messages: ChatMessage[];
}

const EVALUATION_PROMPT = `
あなたはインドネシア語の語学試験の採点官です。
以下の会話を評価して、JSON形式で採点結果を返してください。

【評価観点と配点】
1. grammar (文法の正確さ: 30点満点) - 語順、接辞(me-/di-/ber-)、否定(tidak/bukan)の使い分け
2. spelling (スペル・綴り: 20点満点) - インドネシア語の正しいスペル
3. vocabulary (語彙の適切さ: 20点満点) - 場面に合った語彙選択、フォーマル/カジュアルの使い分け
4. communication (コミュニケーション力: 20点満点) - 会話を継続できたか、質問に適切に答えたか
5. naturalness (自然さ: 10点満点) - ネイティブらしい表現、直訳っぽくないか

【出力形式】
以下のJSON形式のみを出力してください。他のテキストは不要です。

{
  "totalScore": 75,
  "grammar": { "score": 25, "comment": "..." },
  "spelling": { "score": 18, "comment": "..." },
  "vocabulary": { "score": 15, "comment": "..." },
  "communication": { "score": 12, "comment": "..." },
  "naturalness": { "score": 5, "comment": "..." },
  "goodPoints": ["良かった点1", "良かった点2"],
  "improvements": ["改善点1（具体的な例文付き）", "改善点2"]
}

【注意事項】
- ユーザー(role:user)のメッセージのみを採点対象としてください
- comment は日本語で簡潔に書いてください
- goodPoints と improvements は日本語で2-3個ずつ記載してください
- improvements には具体的な正しい表現例を含めてください
- ユーザーが日本語のみで会話した場合はその旨を指摘し、インドネシア語での挑戦を促してください
`.trim();

export async function handleEvaluate(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  let body: Partial<EvaluateRequest>;
  try {
    body = JSON.parse(event.body ?? '{}') as Partial<EvaluateRequest>;
  } catch {
    return badRequest('リクエストボディが不正な JSON です');
  }

  const { scenarioId, messages } = body;

  if (!scenarioId || !SCENARIO_IDS.includes(scenarioId)) {
    return badRequest(`scenarioId は ${SCENARIO_IDS.join('/')} のいずれかを指定してください`);
  }

  if (!messages || !Array.isArray(messages) || messages.length < 2) {
    return badRequest('採点には最低2件以上のメッセージが必要です');
  }

  const scenario = getScenario(scenarioId)!;

  try {
    // 会話内容をテキストに変換
    const conversationText = messages
      .map((m) => `[${m.role === 'user' ? 'ユーザー' : 'AI'}]: ${m.content}`)
      .join('\n');

    const bedrockBody = JSON.stringify({
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: 1000,
      system: EVALUATION_PROMPT,
      messages: [
        {
          role: 'user',
          content: `【場面】${scenario.name}\n\n【会話内容】\n${conversationText}`,
        },
      ],
    });

    const command = new InvokeModelCommand({
      modelId: MODEL_ID,
      contentType: 'application/json',
      accept: 'application/json',
      body: new TextEncoder().encode(bedrockBody),
    });

    const response = await bedrockClient.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    const rawText = responseBody.content?.[0]?.text ?? '';

    // JSON を抽出（テキストに余計な文が含まれる場合に備えて）
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('Failed to extract JSON from evaluation response:', rawText);
      return internalError('採点結果の解析に失敗しました');
    }

    const evaluation = JSON.parse(jsonMatch[0]);

    return ok({
      evaluation,
      scenarioId,
      messageCount: messages.length,
      usage: {
        inputTokens: responseBody.usage?.input_tokens ?? 0,
        outputTokens: responseBody.usage?.output_tokens ?? 0,
      },
    });
  } catch (err: unknown) {
    console.error('Evaluation error:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return internalError(`採点に失敗しました: ${errorMessage}`);
  }
}
