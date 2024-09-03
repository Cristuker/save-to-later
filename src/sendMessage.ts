import AtpAgent, { RichText } from "@atproto/api";
import { messageExists, saveMessage, messageWrongExists } from "./redis";

export const sendMessage = async (
  convoId: string,
  message: RichText,
  agent: AtpAgent,
  taggedPost: string
) => {
  try {
    const [sended, wrongMessage] = await Promise.all([
      messageExists(taggedPost),
      messageWrongExists(taggedPost),
    ]);
    if (sended || wrongMessage) {
      console.log(`Already sended ${taggedPost}`);
      return;
    }
    const proxy = agent.withProxy("bsky_chat", "did:web:api.bsky.chat");
    await proxy.chat.bsky.convo.sendMessage({
      convoId: convoId,
      message: {
        text: message.text,
        facets: message.facets,
      },
    });
    await saveMessage(taggedPost);
  } catch (error) {
    console.log("Error on send message:", error);
  }
};
