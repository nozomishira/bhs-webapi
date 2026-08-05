import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { handleCoach } from './handlers/coach';

const CORS_ORIGIN = process.env.CORS_ORIGIN ?? '*';

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': CORS_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

export async function handler(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  const method = event.requestContext.http.method;
  const path = event.rawPath;

  console.log(`[${method}] ${path} { env: '${process.env.ENV ?? 'unknown'}' }`);

  // CORS preflight
  if (method === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders(), body: '' };
  }

  // Health check
  if (method === 'GET' && path === '/coach/health') {
    return {
      statusCode: 200,
      headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'ok', service: 'coach-api' }),
    };
  }

  // POST /coach
  if (method === 'POST' && path === '/coach') {
    const result = await handleCoach(event);
    if (typeof result === 'string') return result;
    return {
      ...result,
      headers: { ...corsHeaders(), ...(result.headers ?? {}) },
    };
  }

  return {
    statusCode: 404,
    headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ success: false, error: 'Not found' }),
  };
}
