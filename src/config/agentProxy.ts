import { getSession, saveSession } from "../redis";
import "dotenv/config";

export const generateAgentAndBot = async () => {
  const skyware = await import("@skyware/bot");

  const bot = new skyware.Bot({
    emitChatEvents: true,
  });
  const session = await getSession();
  if (session) {
    try {
      await bot.resumeSession(JSON.parse(session));
    } catch (error) {
      const { data } = await bot.agent.login({
        identifier: String(process.env.IDENTIFIER),
        password: String(process.env.PASSWORD),
      });

      await saveSession(JSON.stringify(data.session));
      console.log("Create a new Session");
    }
  }

  return bot;
};
