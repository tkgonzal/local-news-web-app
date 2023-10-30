import { ArticleTag } from "../types/ArticleTag"
import { ArticleImage } from "./ArticleImage"

interface Article {
    _id?: string
    tags: (ArticleTag)[]
    source: string
    // For scraped articles, indicates the url of the original article
    sourceUrl?: ""
    authors: string[]
    images: ArticleImage[]
    heading: string
    subHeading?: string
    engagements?: number
    // String must be in Date ISO format
    publishedDate: string
    body: string[] | string
}

export type { Article }