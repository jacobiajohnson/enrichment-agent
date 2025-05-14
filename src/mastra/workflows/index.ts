import { Step, Workflow } from "@mastra/core/workflows";
import { z } from "zod";
import { extractEventData } from '../tools/event-data-extraction';
import { scrapeWebsite } from '../tools/scrape-website';

const eventEnrichmentWorkflow = new Workflow({
    name: 'event-enrichment-workflow',
    triggerSchema: z.object({
        url: z.string().url().describe('The URL of the website to analyze'),
    }),
})
    .step(new Step({
        id: 'scrapeWebsite',
        description: 'Scrape the website and return the markdown and html content',
        outputSchema: z.object({
            markdown: z.string().describe('The markdown content of the website'),
            html: z.string().describe('The html content of the website'),
        }),
        execute: async ({ context, runtimeContext }) => {
            console.log(`[Workflow:scrapeWebsite] Starting step for URL: ${context.triggerData.url}`);

            try {
                const result = await scrapeWebsite.execute({
                    runtimeContext,
                    context: {
                        url: context.triggerData.url,
                    }
                });

                console.log(`[Workflow:scrapeWebsite] Step completed successfully`);
                console.log(`[Workflow:scrapeWebsite] Markdown content length: ${result.markdown.length} characters`);
                console.log(`[Workflow:scrapeWebsite] HTML content length: ${result.html.length} characters`);

                return {
                    markdown: result.markdown,
                    html: result.html,
                }
            } catch (error) {
                console.error(`[Workflow:scrapeWebsite] Step failed with error:`, error);
                throw error;
            }
        }
    }))
    // .then(new Step({
    //     id: 'extractNames',
    //     description: 'Extract detailed information about speakers and companies from the markdown and html content',
    //     inputSchema: z.object({
    //         markdown: z.string().describe('The markdown content of the website'),
    //         html: z.string().describe('The html content of the website'),
    //     }),
    //     execute: async ({ context, runtimeContext }) => {
    //         console.log(`[Workflow:extractNames] Starting step`);

    //         const scrapeResult = context.steps.scrapeWebsite;
    //         if (scrapeResult.status !== 'success') {
    //             console.error(`[Workflow:extractNames] Cannot proceed - previous step failed with status: ${scrapeResult.status}`);
    //             throw new Error('Website scraping failed');
    //         }

    //         console.log(`[Workflow:extractNames] Previous step successful, proceeding with extraction`);

    //         try {
    //             const result = await extractEventData.execute({
    //                 runtimeContext,
    //                 context: {
    //                     markdown: scrapeResult.output.markdown,
    //                     html: scrapeResult.output.html,
    //                 }
    //             });

    //             console.log(`[Workflow:extractNames] Step completed successfully`);
    //             console.log(`[Workflow:extractNames] Extracted ${result.speakers.length} speakers`);
    //             console.log(`[Workflow:extractNames] Extracted ${result.companies.sponsors.length} sponsor companies`);
    //             console.log(`[Workflow:extractNames] Extracted ${result.companies.attendees.length} attendee companies`);

    //             return result;
    //         } catch (error) {
    //             console.error(`[Workflow:extractNames] Step failed with error:`, error);
    //             throw error;
    //         }
    //     }
    // }))
    .commit();

export { eventEnrichmentWorkflow };
