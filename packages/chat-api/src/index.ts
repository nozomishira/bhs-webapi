import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { handleChat } from './handlers/chat';
import { handleGetScenarios } from './handlers/scenarios';
import { handleEvaluate } from './handlers/evaluate';
import { preflight, ok } from './utils/response';

/**
 * Lambda エントリポイント
 * API Gateway HTTP API v2 (payload format 2.0)
 */
export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  const method = event.requestContext.http.method.toUpperCase();
  const path = event.requestContext.http.path;

  console.log(`[${method}] ${path}`, { env: process.env.ENV });

  // CORS プリフライト
  if (method === 'OPTIONS') {
    return preflight();
  }

  // ルーティング
  if (method === 'POST' && path === '/chat') {
    return handleChat(event);
  }

  if (method === 'POST' && path === '/chat/evaluate') {
    return handleEvaluate(event);
  }

  if (method === 'GET' && path === '/chat/scenarios') {
    return handleGetScenarios(event);
  }

  if (method === 'GET' && path === '/chat/health') {
    return ok({ status: 'healthy', env: process.env.ENV, model: process.env.BEDROCK_MODEL_ID });
  }

  return {
    statusCode: 404,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ success: false, error: `Route not found: [${method}] ${path}` }),
  };
};
