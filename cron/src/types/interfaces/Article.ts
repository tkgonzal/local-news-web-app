import { ArticleTag } from "../types/ArticleTag"

interface Article {
    _id?: string
    tags: (ArticleTag)[]
    source: string
    heading: string
    authors: string[]
    // String must be in Date ISO format
    publishedDate: string
}

export type { Article }