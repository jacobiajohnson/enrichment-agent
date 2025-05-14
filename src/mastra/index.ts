import { createLogger } from '@mastra/core/logger';
import { Mastra } from '@mastra/core/mastra';
import { VercelDeployer } from '@mastra/deployer-vercel';
import { LibSQLStore } from '@mastra/libsql';
import { eventEnrichmentAgent } from './agent';
import { eventEnrichmentWorkflow } from './workflows';

export const mastra = new Mastra({
    agents: {
        eventEnrichmentAgent,
    },
    workflows: {
        eventEnrichmentWorkflow,
    },
    storage: new LibSQLStore({
        // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
        url: ":memory:",
    }),
    logger: createLogger({
        name: 'Mastra',
        level: 'info',
    }),
    deployer: new VercelDeployer({
        teamSlug: 'jacobia',
        projectName: 'enrichment-agent',
        token: process.env.VERCEL_TOKEN!,
    })
});
