import AtpAgent, { RichText } from "@atproto/api";
import { messageExists, saveMessage } from "./redis";

export const sendMessage = async (
  convoId: string,
  message: RichText,
  agent: AtpAgent,
  uri: string
) => {
  try {
    const sended = await messageExists(uri);
    if (sended) {
      console.log(`Already sended ${uri}`);
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
  } catch (error) {
    console.log("Error on send message:", error);
  } finally {
    await saveMessage(uri);
  }
};
