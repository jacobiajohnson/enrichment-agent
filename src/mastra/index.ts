import { createLogger } from '@mastra/core/logger';
import { Mastra } from '@mastra/core/mastra';
import { LibSQLStore } from '@mastra/libsql';
import { eventEnrichmentAgent } from './agents/event-enrichment-agent';


export const mastra = new Mastra({
    agents: {
        eventEnrichmentAgent,
    },
    storage: new LibSQLStore({
        url: ':memory:', // For persistence, change to file:../mastra.db
    }),
    logger: createLogger({
        name: 'Mastra',
        level: 'info',
    }),
});
