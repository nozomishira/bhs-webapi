import { APIGatewayProxyResultV2 } from 'aws-lambda';
import { ApiResponse } from '@bhs/shared';

const corsOrigin = process.env.CORS_ORIGIN ?? '*';

const corsHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': corsOrigin,
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
};

export function ok<T>(data: T): APIGatewayProxyResultV2 {
  const body: ApiResponse<T> = { success: true, data };
  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify(body),
  };
}

export function created<T>(data: T): APIGatewayProxyResultV2 {
  const body: ApiResponse<T> = { success: true, data };
  return {
    statusCode: 201,
    headers: corsHeaders,
    body: JSON.stringify(body),
  };
}

export function badRequest(message: string): APIGatewayProxyResultV2 {
  const body: ApiResponse<never> = { success: false, error: message };
  return {
    statusCode: 400,
    headers: corsHeaders,
    body: JSON.stringify(body),
  };
}

export function notFound(message = 'Not found'): APIGatewayProxyResultV2 {
  const body: ApiResponse<never> = { success: false, error: message };
  return {
    statusCode: 404,
    headers: corsHeaders,
    body: JSON.stringify(body),
  };
}

export function internalError(message = 'Internal server error'): APIGatewayProxyResultV2 {
  const body: ApiResponse<never> = { success: false, error: message };
  return {
    statusCode: 500,
    headers: corsHeaders,
    body: JSON.stringify(body),
  };
}

/** CORS プリフライト用 */
export function preflight(): APIGatewayProxyResultV2 {
  return {
    statusCode: 204,
    headers: corsHeaders,
    body: '',
  };
}
