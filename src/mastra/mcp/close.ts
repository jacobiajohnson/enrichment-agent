import { MCPClient } from "@mastra/mcp";

const url = process.env.CLOSE_MCP_URL;
if (!url) {
    throw new Error('CLOSE_MCP_URL environment variable is not set.');
}

export const closeMcpClient = new MCPClient({
    servers: {
        close: {
            url: new URL(url),
        },
    },
});
