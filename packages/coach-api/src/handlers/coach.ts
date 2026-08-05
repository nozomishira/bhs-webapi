import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import {
  BedrockRuntimeClient,
  ApplyGuardrailCommand,
} from '@aws-sdk/client-bedrock-runtime';
import { invokeCoachHarness } from '../harness';

const bedrockClient = new BedrockRuntimeClient({
  region: process.env.BEDROCK_REGION ?? 'ap-northeast-1',
});

const GUARDRAIL_ID = process.env.GUARDRAIL_ID ?? '';
const GUARDRAIL_VERSION = process.env.GUARDRAIL_VERSION ?? '1';
const BLOCKED_MESSAGE = 'こちらはインドネシア語の学習コーチです。学習に関係のない内容はお控えください。';

interface CoachRequest {
  message: string;
  userId: string;
}

export async function handleCoach(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  let body: Partial<CoachRequest>;
  try {
    body = JSON.parse(event.body ?? '{}') as Partial<CoachRequest>;
  } catch {
    return respond(400, { success: false, error: 'Invalid JSON' });
  }

  const { message, userId } = body;

  if (!message || typeof message !== 'string' || message.trim() === '') {
    return respond(400, { success: false, error: 'message は必須です' });
  }

  // JWT から userId を取得（リクエストボディの userId はフォールバック）
  const claims = (event.requestContext as unknown as { authorizer?: { jwt?: { claims?: Record<string, string> } } })
    ?.authorizer?.jwt?.claims;
  const resolvedUserId = claims?.sub ?? userId;

  if (!resolvedUserId) {
    return respond(400, { success: false, error: 'userId が特定できません' });
  }

  // Guardrails 入力チェック
  if (GUARDRAIL_ID) {
    const blocked = await checkGuardrail(message);
    if (blocked) {
      return respond(200, { success: true, reply: BLOCKED_MESSAGE, blocked: true });
    }
  }

  // Coach Harness 呼び出し
  try {
    const reply = await invokeCoachHarness(message, resolvedUserId);
    return respond(200, { success: true, reply });
  } catch (err: unknown) {
    console.error('Coach invocation error:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return respond(500, { success: false, error: `コーチの応答に失敗しました: ${errorMessage}` });
  }
}

async function checkGuardrail(text: string): Promise<boolean> {
  try {
    const command = new ApplyGuardrailCommand({
      guardrailIdentifier: GUARDRAIL_ID,
      guardrailVersion: GUARDRAIL_VERSION,
      source: 'INPUT',
      content: [{ text: { text } }],
    });
    const response = await bedrockClient.send(command);
    return response.action === 'GUARDRAIL_INTERVENED';
  } catch (err) {
    console.error('Guardrail check error:', err);
    return false;
  }
}

function respond(statusCode: number, body: unknown): APIGatewayProxyResultV2 {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}
