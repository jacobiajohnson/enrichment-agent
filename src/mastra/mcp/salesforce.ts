import { MCPClient } from "@mastra/mcp";

const clientId = process.env.SALESFORCE_CLIENT_ID;
const clientSecret = process.env.SALESFORCE_CLIENT_SECRET;


if (!clientId || !clientSecret) {
    throw new Error("SALESFORCE_CLIENT_ID and SALESFORCE_CLIENT_SECRET must be set");
}

export const salesforceMcpClient = new MCPClient({
    servers: {
        salesforce: {
            command: 'npx',
            args: ["-y", "@tsmztech/mcp-server-salesforce"],
            env: {
                SALESFORCE_CONNECTION_TYPE: "OAuth_2.0_Client_Credentials",
                SALESFORCE_CLIENT_ID: clientId,
                SALESFORCE_CLIENT_SECRET: clientSecret,
                SALESFORCE_INSTANCE_URL: "https://workos.my.salesforce.com" 
            }
        }
    }
})
