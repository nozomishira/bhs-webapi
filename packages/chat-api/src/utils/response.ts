import { APIGatewayProxyResultV2 } from 'aws-lambda';

const corsOrigin = process.env.CORS_ORIGIN ?? '*';

const corsHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': corsOrigin,
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
};

export function ok<T>(data: T): APIGatewayProxyResultV2 {
  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify({ success: true, data }),
  };
}

export function badRequest(message: string): APIGatewayProxyResultV2 {
  return {
    statusCode: 400,
    headers: corsHeaders,
    body: JSON.stringify({ success: false, error: message }),
  };
}

export function internalError(message = 'Internal server error'): APIGatewayProxyResultV2 {
  return {
    statusCode: 500,
    headers: corsHeaders,
    body: JSON.stringify({ success: false, error: message }),
  };
}

export function preflight(): APIGatewayProxyResultV2 {
  return {
    statusCode: 204,
    headers: corsHeaders,
    body: '',
  };
}
