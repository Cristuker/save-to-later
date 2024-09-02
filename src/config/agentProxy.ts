import { AtpAgent } from '@atproto/api'
import 'dotenv/config'
export const generateAgentWithProxy = async () => {
  const agent = new AtpAgent({
    service: "https://bsky.social",
  });
  await agent.login({
    identifier: String(process.env.IDENTIFIER),
    password: String(process.env.PASSWORD),
  });
  return agent;
};
