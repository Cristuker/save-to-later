import AtpAgent, { RichText } from "@atproto/api";

export const sendMessage = async (
  convoId: string,
  message: RichText,
  agent: AtpAgent
) => {
  try {
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
  }
};
