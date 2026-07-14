import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { handleHealth } from './handlers/health';
import { handleGetLevels } from './handlers/levels';
import { handleGetQuestions } from './handlers/questions';
import { handlePostSession } from './handlers/sessions';
import { handleGetProfile, handlePutProfile } from './handlers/profile';
import { preflight, notFound } from './utils/response';

/**
 * Lambda エントリポイント
 * API Gateway HTTP API v2 (payload format 2.0) のイベントを受け取る
 */
export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  const method = event.requestContext.http.method.toUpperCase();
  const path = event.requestContext.http.path;

  console.log(`[${method}] ${path}`, {
    queryString: event.queryStringParameters,
    env: process.env.ENV,
  });

  // CORS プリフライト
  if (method === 'OPTIONS') {
    return preflight();
  }

  // ---- ルーティング ----
  if (method === 'GET' && path === '/health') {
    return handleHealth(event);
  }

  if (method === 'GET' && path === '/levels') {
    return handleGetLevels(event);
  }

  if (method === 'GET' && path === '/questions') {
    return handleGetQuestions(event);
  }

  if (method === 'POST' && path === '/sessions') {
    return handlePostSession(event);
  }

  if (method === 'GET' && path === '/profile') {
    return handleGetProfile(event);
  }

  if (method === 'PUT' && path === '/profile') {
    return handlePutProfile(event);
  }

  return notFound(`ルートが見つかりません: [${method}] ${path}`);
};
