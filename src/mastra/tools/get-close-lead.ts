import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import Close from "close.io";

if (!process.env.CLOSE_API_KEY) {
    throw new Error('CLOSE_API_KEY is not set');
}

const client = new Close(process.env.CLOSE_API_KEY);


export const getCloseLeadTool = createTool({
    id: 'get-close-lead',
    description: 'Get a lead from Close from a Lead ID',
    inputSchema: z.object({
        leadId: z.string(),
    }),
    execute: async ({ context }) => {
        const lead = await client.lead.read(context.leadId)
        return lead;
    },
});
