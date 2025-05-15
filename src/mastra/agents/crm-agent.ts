import { Agent } from "@mastra/core/agent";
import { openAI4oMini } from "../llms";
import { closeMcpClient, salesforceMcpClient } from "../mcp";
import { getCloseLeadTool } from "../tools/get-close-lead";
import { getCloseLeadActivitiesTool } from "../tools/get-close-lead-activities";

export const  crmAgent = new Agent({
    name: 'CRM Agent',
    model: openAI4oMini,
    instructions: ``,
    tools: {
        ...(await closeMcpClient.getTools()),
        getCloseLeadTool,
        getCloseLeadActivitiesTool,
        ...(await salesforceMcpClient.getTools()),
    }
})
