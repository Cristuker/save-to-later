import AtpAgent from "@atproto/api";
import "dotenv/config";
import { listConvo } from "./list.convo";
import { saveWrongMessage } from "./redis";
import { sendMessage } from "./sendMessage";
import { getUrlFromUri } from "./utils/getUrl";
import { messageBuilder } from "./utils/message";
import { Mentions } from "./interfaces/mentions";

export async function getMentions(
  agent: AtpAgent
): Promise<Mentions> {
  await agent.listNotifications();

  const { data } = await agent.listNotifications();

  return {
    mentions: data.notifications.filter(({ reason }) => reason === "mention"),
  } as any;
}
