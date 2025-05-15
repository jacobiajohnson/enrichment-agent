import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import Close from "close.io";

if (!process.env.CLOSE_API_KEY) {
    throw new Error('CLOSE_API_KEY is not set');
}

const client = new Close(process.env.CLOSE_API_KEY);

export const getCloseLeadActivitiesTool = createTool({
    id: 'get-close-lead-activities',
    description: 'Get activities for a lead from Close with optional filtering',
    inputSchema: z.object({
        leadId: z.string().describe('The ID of the lead to get activities for'),
        type: z.string().optional().describe('Filter by activity type (e.g., "Call", "Email", "Note")'),
        dateCreatedGt: z.string().optional().describe('Filter activities created after this date (ISO format)'),
        dateCreatedLt: z.string().optional().describe('Filter activities created before this date (ISO format)'),
        activityAtGt: z.string().optional().describe('Filter activities that occurred after this date (ISO format)'),
        activityAtLt: z.string().optional().describe('Filter activities that occurred before this date (ISO format)'),
        userId: z.string().optional().describe('Filter activities by user ID'),
        contactId: z.string().optional().describe('Filter activities by contact ID'),
    }),
    execute: async ({ context }) => {
        const params: Record<string, any> = {
            lead_id: context.leadId
        };

        // Add optional filters if provided
        if (context.type) params._type = context.type;
        if (context.dateCreatedGt) params.date_created__gt = context.dateCreatedGt;
        if (context.dateCreatedLt) params.date_created__lt = context.dateCreatedLt;
        if (context.activityAtGt) {
            params.activity_at__gt = context.activityAtGt;
            params._order_by = '-activity_at'; // Required when using activity_at filters
        }
        if (context.activityAtLt) {
            params.activity_at__lt = context.activityAtLt;
            params._order_by = '-activity_at'; // Required when using activity_at filters
        }
        if (context.userId) params.user_id = context.userId;
        if (context.contactId) params.contact_id = context.contactId;

        const activities = await client.activity.search(params);
        return activities;
    },
});
