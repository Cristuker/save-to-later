import { getMentions } from './mentions';
import { getAccessToken } from './token';
import { connectRedis } from "./redis";
import { sendMessage } from "./sendMessage";
import { listConvo } from "./list.convo";
import { generateAgentWithProxy } from "./config/agentProxy";
import { messageBuilder } from "./builder/message";
import { getUrlFromUri } from "./utils/getUrl";
import 'dotenv/config';

connectRedis()

export async function main() {
  try {
    const startTime = new Date().toLocaleTimeString();
    console.log(`Tick executed ${startTime}`);

    const { token } = await getAccessToken();

    const { mentions } = await getMentions(token);
    if (!mentions.length) {
      console.log("No mentions found");
      return;
    }

    const agent = await generateAgentWithProxy()
    for (const mention of mentions) {
      const convo = await listConvo(mention.author.did, agent);
      const url = getUrlFromUri(mention.record.reply.root.uri);
      const message = await messageBuilder(url,mention.record.text, agent);
      await sendMessage(convo.id, message, agent);
    }
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();