export type TComment = {
    content: string,
    created_at: string,
    author: {
        name: string
    },
    replies: TReply[]
}

export type TReply = Omit<TComment, "replies">
