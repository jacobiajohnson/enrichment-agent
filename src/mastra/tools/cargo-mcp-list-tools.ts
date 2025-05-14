import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { MCPClient } from '@mastra/mcp';

export const listCargoMcpTools = createTool({
    id: 'list-cargo-mcp-tools',
    description: 'Connects to the Cargo MCP server and lists available tools.',
    inputSchema: z.object({}),
    outputSchema: z.object({
        tools: z.array(z.object({
            name: z.string(),
            description: z.string().optional(),
        })),
    }),
    execute: async () => {
        const url = process.env.CARGO_MCP_URL;
        if (!url) {
            throw new Error('CARGO_MCP_URL environment variable is not set.');
        }
        const mcpClient = new MCPClient({
            servers: {
                cargo: {
                    url: new URL(url),
                },
            },
        });
        try {
            const tools = await mcpClient.getTools();
            const toolList = Object.entries(tools).map(([name, tool]) => ({
                name,
                description: tool.description,
            }));
            return { tools: toolList };
        } catch (error) {
            throw new Error(`Failed to list tools from Cargo MCP server: ${error instanceof Error ? error.message : String(error)}`);
        }
    },
});
