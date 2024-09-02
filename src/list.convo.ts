import axios from "axios";
import 'dotenv/config';
import { AtpAgent } from '@atproto/api'

const agent = new AtpAgent({
  service: 'https://bsky.social'
})
export const listConvo = async (token: string, did: string) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://public.api.bsky.app/xrpc/chat.bsky.convo.getConvoForMembers?members=${did}`,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios(config);
  console.log(JSON.stringify(response.data));
  return { data: response.data };


  // await agent.login({
  //   identifier: 'cmsdev45@gmail.com',
  //   password: '2009@11Lc'
  // })
  //did:plc:szqflswwslhzp72qxwcxyvfk
  // const r = await agent.chat.bsky.convo.getConvoForMembers({
  //   members: [did]
  // })
  // console.log(r)
  // console.log(await agent.chat.bsky.convo.listConvos())
};
