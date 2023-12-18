interface ArticleComment {
    _id: string,
    userName: string | "anonymous",
    message: string,
    publishedDate: string
}

interface NewArticleComment {
    message: string
}

export type { ArticleComment, NewArticleComment };