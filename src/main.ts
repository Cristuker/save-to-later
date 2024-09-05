import { getMentions } from "./mentions";
import { connectRedis, saveWrongMessage } from "./redis";
import { sendMessage } from "./sendMessage";
import { listConvo } from "./list.convo";
import { generateAgentAndBot } from "./config/agentProxy";
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
  const [agent, bot] = await generateAgentAndBot();

  const startTime = new Date().toLocaleTimeString();
  console.log(`Tick executed ${startTime}`);


  bot.on("mention", async (mention) => {
    try {
      console.log("Receiving mention");

      const convo = await listConvo(mention.author.did, agent);
      const url = getUrlFromUri(mention.uri);
      const message = await messageBuilder(url, mention.text, agent);
      await sendMessage(convo.id, message, agent, mention.uri);
      await saveWrongMessage(mention.uri);
      await mention.like();
      console.log("Process mention with sucess ");

    } catch(error) {
      console.error(error)
      await saveWrongMessage(mention.uri);
      console.log('Saving mention with error')
    }
  })
}

main();
