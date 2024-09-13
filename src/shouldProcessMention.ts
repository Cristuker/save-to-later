import { messageExists, messageWrongExists } from "./redis";

export const shouldProcessMention = async (taggedPost: string) => {
  const [sended, wrongMessage] = await Promise.all([
    messageExists(taggedPost),
    messageWrongExists(taggedPost),
  ]);
  return sended || wrongMessage;
};
