import { ArticleTag } from "../types/ArticleTag"
import { ArticleImage } from "./ArticleImage"
import { ObjectId } from "mongodb"

interface Article {
    _id?: ObjectId
    tags: (ArticleTag)[]
    source: string
    // For scraped articles, indicates the url of the original article
    sourceUrl?: ""
    heading: string
    authors: string[]
    // String must be in Date ISO format
    publishedDate: string
    images: ArticleImage[]
    body: string[] | string
    subHeading?: string
    engagements?: number
}

export type { Article }