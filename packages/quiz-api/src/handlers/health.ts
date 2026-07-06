import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { ok } from '../utils/response';

export async function handleHealth(
  _event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  return ok({
    status: 'healthy',
    env: process.env.ENV ?? 'unknown',
    timestamp: new Date().toISOString(),
  });
}
