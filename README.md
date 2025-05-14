# Enrichment Agent

AI-powered agent for extracting and enriching web content.

## Prerequisites

- Node.js >= 20.9.0
- Bun
- OpenAI API key

## Setup

1. Install dependencies:
```bash
bun install
```

2. Set environment variables:
```bash
export OPENAI_API_KEY=your_openai_key
export CARGO_MCP_URL=your_url
```

3. Run development server:
```bash
bun run dev
```

## Project Structure

```
src/mastra/
  agents/       # Agent definitions
  mcp/          # MCP server configurations
  tools/        # Agent tools
```
