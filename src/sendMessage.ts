import axios from "axios";
import { SendMessage } from "./interfaces/message";


export const sendMessage = async (message: SendMessage, token: string) => {
  const data = JSON.stringify(message);

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `https://public.api.bsky.app/xrpc/chat.bsky.convo.sendMessage`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
