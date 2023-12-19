import { ArticleTag } from "../types/ArticleTag"
import { ArticleImage } from "./ArticleImage"
import { ObjectId } from "mongodb"
import { ArticleComment } from "./ArticleComment"

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
    engagements?: number,
    businessId?: ObjectId,
    allowComments?: boolean,
    allowAnonymousComments?: boolean,
    comments?: ArticleComment[]
    ipCanComment?: boolean
}

export type { Article }