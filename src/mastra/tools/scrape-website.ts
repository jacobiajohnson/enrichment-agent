import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import FirecrawlApp from '@mendable/firecrawl-js';

export const scrapeWebsite = createTool({
    id: 'scrape-website',
    description: 'Scrape a website and return the markdown and html content',
    inputSchema: z.object({
        url: z.string().describe('URL of the website to scrape'),
    }),
    outputSchema: z.object({
        markdown: z.string(),
        html: z.string(),
    }),
    execute: async ({ context }) => {
        console.log(`[scrapeWebsite] Starting to scrape URL: ${context.url}`);

        try {
            const app = new FirecrawlApp({ apiKey: 'fc-8d78b1a54701470f933a7a75184e3e59' });
            console.log(`[scrapeWebsite] Initialized FirecrawlApp`);

            const scrapeResult = await app.scrapeUrl(context.url, {
                formats: ['markdown', 'html'],
            });

            console.log(`[scrapeWebsite] Scrape completed for URL: ${context.url}`);

            if (!scrapeResult.success || !scrapeResult.markdown || !scrapeResult.html) {
                console.error(`[scrapeWebsite] Failed to scrape URL or no content found: ${context.url}`);
                throw new Error('Failed to scrape URL or no content found');
            }

            console.log(`[scrapeWebsite] Successfully scraped content, returning markdown and HTML`);
            return {
                markdown: scrapeResult.markdown,
                html: scrapeResult.html,
            };
        } catch (error) {
            console.error(`[scrapeWebsite] Error scraping URL ${context.url}:`, error);
            throw error;
        }
    },
});
