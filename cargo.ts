import { MCPClient } from "@mastra/mcp";

const url = process.env.CARGO_MCP_URL;
if (!url) {
    throw new Error('CARGO_MCP_URL environment variable is not set.');
}

export const cargoMcpClient = new MCPClient({
    servers: {
        cargo: {
            url: new URL(url),
        },
    },
});
