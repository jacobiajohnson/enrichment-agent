import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { listCargoMcpTools } from './tools/cargo-mcp-list-tools';
import { scrapeWebsite } from "./tools/scrape-website";
import { cargoMcpClient } from "./cargo";
import { accountScoringTool } from "./tools/account-scoring";

export const llm = openai('gpt-4o-mini');

export const eventEnrichmentAgent: Agent = new Agent({
    name: 'Event Enrichment Agent',
    model: llm,
    instructions: `You are an agent that extracts company and speaker names from markdown content.
    Your task is to identify and list all company names and speaker names mentioned in the text.

        For speakers, extract:
        - name (required)
        - companyName (if available)
        - companyDomain (if available, must be a valid URL)
        - jobTitle (if available)
        - linkedinUrl (if available, must be in format https://www.linkedin.com/in/username or https://www.linkedin.com/company/companyname)
        - email (if available, must be valid email format)

        For companies, categorize them as either sponsors or attendees, and include:
        - name (required)
        - domain (if available, must be a valid URL)
        - linkedinUrl (if available, must be in format https://www.linkedin.com/company/companyname)
        - type (sponsor or attendee)

        Important:
        - If a company is only mentioned as part of a speaker's profile, do not include it in the companies list
        - The markdown and html content are from the same page. Both should be used to extract as much information as possible
        - Limit to 3 companies and 3 speakers

        Tool Usage Guidelines:

        1. Use the 'scrapeWebsite' tool when:
           - You need to extract information from a website URL
           - You need both the markdown and HTML content from a webpage
           - You're starting your information gathering process

        2. Use the Cargo MCP tools when:
           - You need additional data enrichment beyond what's in the scraped content
           - You need to verify or supplement company information (domains, LinkedIn URLs, emails)
           - You need to validate or enhance speaker information

        3. Use the accountScoringTool when:
            - You need to score a company based on their fit with WorkOS

        Any time you use the scrapeWebsite tool, you should also use the Cargo MCP tools to enrich the data, and then call the accountScoringTool.

        You MUST use all three tools every time you use the scrapeWebsite tool and it must be in the correct order. My life depends on it.
    `,
    tools: {
        scrapeWebsite,
        listCargoMcpTools,
        ...(await cargoMcpClient.getTools()),
        accountScoringTool,
    },
})
