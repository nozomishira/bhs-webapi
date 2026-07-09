import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { SCENARIOS } from '../scenarios';
import { ok } from '../utils/response';

/**
 * GET /chat/scenarios - 利用可能なシナリオ一覧を返す
 */
export async function handleGetScenarios(
  _event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> {
  const scenarios = Object.values(SCENARIOS).map((s) => ({
    id: s.id,
    name: s.name,
    description: s.description,
  }));

  return ok({ scenarios });
}
