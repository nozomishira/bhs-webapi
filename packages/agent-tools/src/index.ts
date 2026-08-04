import { Context } from 'aws-lambda';
import { getChatHistory } from './tools/getChatHistory';
import { getQuizHistory } from './tools/getQuizHistory';
import { getWeakAreas } from './tools/getWeakAreas';
import { getUserProfile } from './tools/getUserProfile';

/**
 * AgentCore Gateway Lambda MCP Target
 *
 * Gateway がツール呼び出し時に invoke する。
 * event: inputSchema で定義されたプロパティの値
 * context.clientContext.custom.bedrockAgentCoreToolName: ツール名 (prefix___toolName)
 */
export async function handler(event: Record<string, unknown>, context: Context): Promise<unknown> {
  const clientContext = (context as unknown as { clientContext?: { custom?: Record<string, string> } }).clientContext;
  const rawToolName = clientContext?.custom?.bedrockAgentCoreToolName ?? '';

  // ツール名からプレフィックス (targetName___) を除去
  const delimiter = '___';
  const delimiterIndex = rawToolName.indexOf(delimiter);
  const toolName = delimiterIndex >= 0
    ? rawToolName.slice(delimiterIndex + delimiter.length)
    : rawToolName;

  console.log(`[agent-tools] toolName=${toolName}, event=${JSON.stringify(event)}`);

  switch (toolName) {
    case 'get_chat_history':
      return getChatHistory(event);
    case 'get_quiz_history':
      return getQuizHistory(event);
    case 'get_weak_areas':
      return getWeakAreas(event);
    case 'get_user_profile':
      return getUserProfile(event);
    default:
      return { error: `Unknown tool: ${toolName}` };
  }
}
