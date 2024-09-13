import { getMentions } from "./mentions";
import { connectRedis, saveWrongMessage } from "./redis";
import { sendMessage } from "./sendMessage";
import { listConvo } from "./list.convo";
import { generateAgent } from "./config/agentProxy";
import { messageBuilder } from "./utils/message";
import { getUrlFromUri } from "./utils/getUrl";
import { Record } from "./interfaces/notifications";
import cron from "node-cron";
import { initServer } from "./server";
import "dotenv/config";

connectRedis();

initServer();

export async function main() {
  const agent = await generateAgent();

  const startTime = new Date().toLocaleTimeString();
  console.log(`Tick executed ${startTime}`);

  const { mentions } = await getMentions(agent);
  if (!mentions.length) {
    console.log("No mentions found");
    return;
  }

  for (const mention of mentions) {
    try {
      console.log("Processing another mention");
      const record = mention.record as Record;
      const taggedPost = mention.uri;
      const convo = await listConvo(mention.author.did, agent);
      const url = getUrlFromUri(record.reply.root.uri);
      const message = await messageBuilder(url, record.text);
      await message.detectFacets(agent);
      await sendMessage(convo.id, message, agent, taggedPost);
      await saveWrongMessage(mention.uri);
      await agent.like(mention.uri, mention.cid);
      console.log("Process ended");
    } catch (error) {
      console.error("Error:", error);
      await saveWrongMessage(mention.uri);
      console.log("Saving to not send again");
    }
  }
}

cron.schedule("* * * * *", () => {
  console.log("Searching for mentions...");
  main();
});