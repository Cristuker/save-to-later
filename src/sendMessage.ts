import AtpAgent, { RichText } from "@atproto/api";
import { saveMessage } from "./redis";

export const sendMessage = async (
  convoId: string,
  message: RichText,
  agent: AtpAgent,
  taggedPost: string
) => {
  const proxy = agent.withProxy("bsky_chat", "did:web:api.bsky.chat");
  await proxy.chat.bsky.convo.sendMessage({
    convoId: convoId,
    message: {
      text: message.text,
      facets: message.facets,
    },
  });
  await saveMessage(taggedPost);
};
