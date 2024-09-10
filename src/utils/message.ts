import { RichText } from "@atproto/api";

export const messageBuilder = async (
  url: string,
  message: string
) => {

  const date = new Intl.DateTimeFormat(["pt-BR"], {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date());
  const messageWithoutMention = message.replace(
    "@savetoread.bsky.social",
    "🔖"
  );

  const text = `[${date}]: ${messageWithoutMention} - Link para o post: ${url}`;
  const rt = new RichText({
    text: text,
  });

  return rt;
};
