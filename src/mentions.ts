import { Mentions } from "./interfaces/mentions";
import AtpAgent from "@atproto/api";
import "dotenv/config";

export async function getMentions(
  agent: AtpAgent
): Promise<Mentions> {
  await agent.listNotifications();

  const { data } = await agent.listNotifications({
    limit: 100,
  });

  return {
    mentions: data.notifications.filter(({ reason }) => reason === "mention"),
  } as any;
}
