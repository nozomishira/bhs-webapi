import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { SaveSessionRequest } from '@bhs/shared';
import { saveSession } from '../repositories/sessionsRepository';
import { created, badRequest, internalError } from '../utils/response';

const VALID_COURSE_TYPES = ['vocabulary', 'grammar', 'reading', 'exam'];

export async function handlePostSession(
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  let body: Partial<SaveSessionRequest>;
  try {
    body = JSON.parse(event.body ?? '{}') as Partial<SaveSessionRequest>;
  } catch {
    return badRequest('リクエストボディが不正な JSON です');
  }

  const { level, questionCount, score, totalQuestions, courseType } = body;

  if (level === undefined || !Number.isInteger(level) || level < 1) {
    return badRequest('level は 1 以上の整数で指定してください');
  }
  if (questionCount === undefined || !Number.isInteger(questionCount) || questionCount < 1) {
    return badRequest('questionCount は 1 以上の整数で指定してください');
  }
  if (score === undefined || !Number.isInteger(score) || score < 0) {
    return badRequest('score は 0 以上の整数で指定してください');
  }
  if (totalQuestions === undefined || !Number.isInteger(totalQuestions) || totalQuestions < 1) {
    return badRequest('totalQuestions は 1 以上の整数で指定してください');
  }
  if (score > totalQuestions) {
    return badRequest('score は totalQuestions 以下にしてください');
  }
  if (!courseType || !VALID_COURSE_TYPES.includes(courseType)) {
    return badRequest(`courseType は ${VALID_COURSE_TYPES.join('/')} のいずれかを指定してください`);
  }

  // JWT から userId を取得（認証済みの場合）
  const claims = (event.requestContext as unknown as { authorizer?: { jwt?: { claims?: Record<string, string> } } })
    ?.authorizer?.jwt?.claims;
  const userId = claims?.sub;

  try {
    const session = await saveSession({ level, questionCount, score, totalQuestions, courseType }, userId);
    return created({ sessionId: session.sessionId, createdAt: session.createdAt });
  } catch (err) {
    console.error('handlePostSession error:', err);
    return internalError();
  }
}
