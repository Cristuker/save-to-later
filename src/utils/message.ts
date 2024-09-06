import AtpAgent, { RichText } from "@atproto/api"

export const messageBuilder = async (url: string, message: string, agent: AtpAgent): Promise<RichText> => {
    const date = new Intl.DateTimeFormat(['pt-BR'], {
        dateStyle: 'short',
        hour: 'numeric',
        minute: 'numeric',
    }).format(new Date());
    const messageWithoutMention = message.replace('@savetoread.bsky.social', '🔖')
    const rt = new RichText({
        text: `[${date}]: ${messageWithoutMention} - ${url}`,
    });
    await rt.detectFacets(agent)

    return rt;
}