import { getMentions } from "./mentions";
import { connectRedis } from "./redis";
import { sendMessage } from "./sendMessage";
import { listConvo } from "./list.convo";
import { generateAgent } from "./config/agentProxy";
import { messageBuilder } from "./utils/message";
import { getUrlFromUri } from "./utils/getUrl";
import { Record } from "./interfaces/notifications";
import cron from "node-cron";
import "dotenv/config";

connectRedis();

export async function main() {
  try {
    const agent = await generateAgent();

    const startTime = new Date().toLocaleTimeString();
    console.log(`Tick executed ${startTime}`);

    const { mentions } = await getMentions(agent);
    if (!mentions.length) {
      console.log("No mentions found");
      return;
    }

    for (const mention of mentions) {
      const record = mention.record as Record;
      const convo = await listConvo(mention.author.did, agent);
      const url = getUrlFromUri(record.reply.root.uri);
      const message = await messageBuilder(url, record.text, agent);
      await sendMessage(convo.id, message, agent, url);
    }
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

cron.schedule('* * * * *', () => {
  console.log('Searching for mentions...');
  main();
});
