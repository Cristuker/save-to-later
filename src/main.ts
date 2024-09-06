import { connectRedis, saveWrongMessage } from "./redis";
import { generateAgentAndBot } from "./config/agentProxy";
import { processMention } from "./mentions";
import "dotenv/config";

connectRedis();


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
