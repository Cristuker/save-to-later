import { AtpAgent, AtpSessionData } from "@atproto/api";
import { getSession, saveSession } from "../redis";
import "dotenv/config";

export const generateAgent = async () => {
  
  const agent = new AtpAgent({
    service: "https://bsky.social",
    persistSession: async (evt: string, session: AtpSessionData | undefined) => {
      if (session) {
        await saveSession(JSON.stringify(session));
        console.log('Persist session');
      }
    }
  });

  const session = await getSession();

  try {
    if (session) {
      console.log("Resume session");
      await agent.resumeSession(JSON.parse(session));
      return agent;
    }
  } catch (error) {
    await agent.login({
      identifier: String(process.env.IDENTIFIER),
      password: String(process.env.PASSWORD),
    });
    console.log("Create a new Session");
  }



  return agent;
};
