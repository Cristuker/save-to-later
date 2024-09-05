import { AtpAgent, AtpSessionData } from "@atproto/api";
import { getSession, saveSession } from "../redis";
import {Bot} from '@skyware/bot';
import "dotenv/config";

export const generateAgentAndBot = async (): Promise<[AtpAgent, any]> => {

  const bot = new Bot();
  const agent = new AtpAgent({
    service: "https://bsky.social",
    persistSession: async (evt: string, session: AtpSessionData | undefined) => {
      await saveSession(JSON.stringify(session));
      console.log('Persist session');
    }
  });

  const session = await getSession();

  if (session) {
    console.log("Resume session");
    await agent.resumeSession(JSON.parse(session));
    await bot.resumeSession(JSON.parse(session))
    return [agent, bot];
  }

  const  { data } = await agent.login({
    identifier: String(process.env.IDENTIFIER),
    password: String(process.env.PASSWORD),
  });
  await bot.resumeSession({
    refreshJwt: data.refreshJwt,
    accessJwt: data.accessJwt,
    handle: data.handle,
    did: data.did,
    email: data.email,
    emailConfirmed: data.emailConfirmed,
    emailAuthFactor: data.emailAuthFactor,
    active: !!data.active,
    status: data.status
  })

  console.log("Create a new Session");

  return [agent, bot];
};
