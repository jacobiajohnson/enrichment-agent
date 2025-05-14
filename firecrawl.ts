import FirecrawlApp, { ScrapeResponse } from '@mendable/firecrawl-js'

const app = new FirecrawlApp({ apiKey: 'fc-8d78b1a54701470f933a7a75184e3e59' })

const scrapeResult = await app.scrapeUrl('https://www.workos.com', {
    formats: ['markdown']
})

if (!scrapeResult.success) {
    throw new Error('Failed to scrape URL')
}

const markdown = scrapeResult.markdown

console.log(markdown)

