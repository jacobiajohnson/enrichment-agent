import { createLogger } from '@mastra/core/logger';
import { Mastra } from '@mastra/core/mastra';
import { LibSQLStore } from '@mastra/libsql';
import { accountScoringAgent, crmAgent, eventEnrichmentAgent } from './agents';



export const mastra = new Mastra({
    agents: {
        eventEnrichmentAgent,
        crmAgent,
        accountScoringAgent,
    },
    storage: new LibSQLStore({
        url: ':memory:', // For persistence, change to file:../mastra.db
    }),
    logger: createLogger({
        name: 'Mastra',
        level: 'info',
    }),
});
