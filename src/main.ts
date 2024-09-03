import { getMentions } from "./mentions";
import { connectRedis, saveWrongMessage } from "./redis";
import { sendMessage } from "./sendMessage";
import { listConvo } from "./list.convo";
import { generateAgent } from "./config/agentProxy";
import { messageBuilder } from "./utils/message";
import { getUrlFromUri } from "./utils/getUrl";
import { Record } from "./interfaces/notifications";
import cron from "node-cron";
import http from "node:http";
import "dotenv/config";

connectRedis();

const PORT = 8080; 
function handleRequest(request, response) {
  console.log(request.headers);
  response.end("It Works!! Path Hit: " + request.url);
}

var server = http.createServer(handleRequest);
server.listen(PORT, function () {
  console.log("Server listening on:", PORT);
});

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
      if (record.reply?.root) {
        const url = getUrlFromUri(record.reply.root.uri);
        const message = await messageBuilder(url, record.text, agent);
        await sendMessage(convo.id, message, agent, taggedPost);
      }

      console.log("Process ended");
    } catch (error) {
      console.error("Error:", error);
      await saveWrongMessage(mention.uri);
      console.log('Saving to not send again')
    }
  }
}

cron.schedule('* * * * *', () => {
  console.log('Searching for mentions...');
  main();
});