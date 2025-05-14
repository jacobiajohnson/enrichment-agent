import { createTool } from "@mastra/core";
import { z } from "zod";
import { accountScoringAgent } from "../agents/account-scoring-agent";


export const accountScoringTool = createTool({
    id: 'account-scoring',
    description: 'Score a company based on their fit with WorkOS',
    inputSchema: z.object({
        isSaaS: z.boolean().nullish(),
        hasEnterprisePlan: z.boolean().nullish(),
        offerSSO: z.boolean().nullish(),
        employeeCount: z.number().nullish(),
        industries: z.array(z.string()).nullish(),
        yearFounded: z.string().nullish(),
        hqCountry: z.string().nullish(),
        website: z.string().nullish(),
        description: z.string().nullish(),
    }),

    execute: async ({ context }) => {
        const result = await accountScoringAgent.generate(`
            Generate account scoring for the following provided company data:

            ${JSON.stringify(context)}
        `, {
            experimental_output: z.object({
                fitScore: z.number(),
                summary: z.string(),
                riskFactors: z.string(),
                confidenceInterval: z.string(),
            })
        })

        return result;
    }
});
