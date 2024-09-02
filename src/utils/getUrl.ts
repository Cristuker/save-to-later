export const getUrlFromUri = (uri: string) => {
    const postId = uri.split('/')[4]
    return `https://bsky.app/profile/kr1s.bsky.social/post/${postId}`
}