import { sendMessage } from "./sendMessage";
import { getUrlFromUri } from "./utils/getUrl";
import { messageBuilder } from "./utils/message";
import "dotenv/config";

export async function processMention(mention: any, bot: any) {
  const url = getUrlFromUri(mention.uri);
  const message = await messageBuilder(url, mention.text);
  await sendMessage(bot, mention.author.did, message);
  await mention.like();
}
