import { connectRedis, saveWrongMessage } from "./redis";
import { generateAgentAndBot } from "./config/agentProxy";
import { processMention } from "./mentions";
import http from "http";
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
      await processMention(agent, mention);
      console.log("Process mention with success");
    } catch(error) {
      console.error(error)
      await saveWrongMessage(mention.uri);
      console.log('Saving mention with error')
    }
  });
}

main();
