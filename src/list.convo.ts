import 'dotenv/config';
import { AtpAgent } from '@atproto/api'
import { ConvoView } from '@atproto/api/dist/client/types/chat/bsky/convo/defs';

export const listConvo = async (did: string, agent: AtpAgent): Promise<ConvoView> => {
  const proxy = agent.withProxy("bsky_chat", "did:web:api.bsky.chat");
  const members = await proxy.chat.bsky.convo.getConvoForMembers({
    members: [did]
  })
  return members.data.convo;
};
