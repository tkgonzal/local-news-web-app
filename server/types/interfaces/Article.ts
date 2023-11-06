import { ArticleTag } from "../types/ArticleTag"
import { ArticleImage } from "./ArticleImage"
import { ObjectId } from "mongodb"

interface Article {
    _id?: ObjectId
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