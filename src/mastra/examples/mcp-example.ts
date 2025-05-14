import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { mcpConnectTool, mcpToolTool, mcpDisconnectTool, mcpListServersTool } from '../tools/mcp-tools';

const llm = openai('gpt-4o-mini');

// Create a specialized agent for working with MCP tools
const mcpAgent = new Agent({
    name: 'MCP Agent',
    model: llm,
    instructions: `You are an agent that connects to and interacts with MCP servers.
    You can connect to MCP servers, list their available tools, and execute those tools.

    When connecting to the "@mastra/mcp-docs-server", follow these steps:
    1. Connect to the server using mcpConnectTool with the command "npx" and args ["-y", "@mastra/mcp-docs-server@latest"]
    2. List the available tools from that server
    3. Use the appropriate tool to search through Mastra's documentation
    4. When done, disconnect from the server

    Always provide helpful explanations about what you're doing.
  `,
    tools: {
        mcpConnectTool,
        mcpToolTool,
        mcpDisconnectTool,
        mcpListServersTool,
    },
});

// Example usage
async function runExample() {
    try {
        console.log("Starting MCP example...");

        // Example 1: Connect to Mastra docs server
        const response1 = await mcpAgent.generate(
            "Connect to the Mastra docs server and tell me what tools are available."
        );
        console.log("\nResponse 1:");
        console.log(response1.text);

        // Example 2: Search for information about MCP in the docs
        const response2 = await mcpAgent.generate(
            "Search in the Mastra docs for information about how to use MCP with Mastra."
        );
        console.log("\nResponse 2:");
        console.log(response2.text);

        // Example 3: Disconnect from the server
        const response3 = await mcpAgent.generate(
            "Disconnect from the Mastra docs server."
        );
        console.log("\nResponse 3:");
        console.log(response3.text);

        console.log("\nMCP example completed successfully!");
    } catch (error) {
        console.error("Error in MCP example:", error);
    }
}

// Run the example if this file is executed directly
if (require.main === module) {
    runExample().catch(console.error);
}

export { mcpAgent, runExample };
