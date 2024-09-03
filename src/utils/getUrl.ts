export const getUrlFromUri = (uri: string) => {
    const [,,did,,postId] = uri.split('/')
    return `https://bsky.app/profile/${did}/post/${postId}`
}