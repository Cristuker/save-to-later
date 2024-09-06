import AtpAgent, { RichText } from "@atproto/api"

export const messageBuilder = async (url: string, message: string, agent: AtpAgent): Promise<RichText> => {
    const date = new Intl.DateTimeFormat(['pt-BR'], {
        dateStyle: 'short',
    }).format(new Date());
    console.log(message)
    const messageWithoutMention = message.replace('@savetoread.bsky.social', '🔖')
    console.log(messageWithoutMention)
    const rt = new RichText({
        text: `[Saved at ${date}]: ${messageWithoutMention} - ${url}`,
    });
    await rt.detectFacets(agent)

    return rt;
}