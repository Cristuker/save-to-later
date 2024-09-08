export const sendMessage = async (bot: any, did: string, message) => {
  try {
    const botWithProxy = bot.agent.withProxy(
      "bsky_chat",
      "did:web:api.bsky.chat"
    );
    const convo = await botWithProxy.chat.bsky.convo.getConvoForMembers({
      members: [did],
    });
    await botWithProxy.chat.bsky.convo.sendMessage({
      convoId: convo.data.convo.id,
      message: {
        text: message.text,
        facets: message.facets,
      },
    });
  } catch (error) {
    console.log("Error on send message:", error);
  }
};
