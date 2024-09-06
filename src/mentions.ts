import AtpAgent from "@atproto/api";
import "dotenv/config";
import { listConvo } from "./list.convo";
import { saveWrongMessage } from "./redis";
import { sendMessage } from "./sendMessage";
import { getUrlFromUri } from "./utils/getUrl";
import { messageBuilder } from "./utils/message";

export async function processMention(
  agent: AtpAgent,
  mention: any
) {
  const convo = await listConvo(mention.author.did, agent);
  const url = getUrlFromUri(mention.uri);
  const message = await messageBuilder(url, mention.text, agent);
  await sendMessage(convo.id, message, agent);
  await saveWrongMessage(mention.uri);
  await mention.like();
}
