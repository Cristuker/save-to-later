export const messageBuilder = async (
  url: string,
  message: string
) => {
  const { RichText } = await import("@skyware/bot");

  const date = new Intl.DateTimeFormat(["pt-BR"], {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date());
  const messageWithoutMention = message.replace(
    "@savetoread.bsky.social",
    "🔖"
  );
  const rt = new RichText()
    .text(`[${date}]: ${messageWithoutMention} - `)
    .link("Post salvo", url).build();
  return rt;
};
