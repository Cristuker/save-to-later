import { Mentions } from "./interfaces/mentions";
import AtpAgent from "@atproto/api";
import { isToday } from "./utils/isToday";
import "dotenv/config";

export async function getMentions(
  agent: AtpAgent
): Promise<Mentions> {
  await agent.listNotifications();

  const { data } = await agent.listNotifications({
    limit: 100,
  });

  
  return {
    mentions: data.notifications.filter((notification) => notification.reason === 'mention' && isToday(notification.indexedAt)),
  } as any;
}
