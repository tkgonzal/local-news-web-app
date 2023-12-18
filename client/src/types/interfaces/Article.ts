import { ArticleTag } from "../types/ArticleTag";
import { ArticleComment } from "./ArticleComment";
import { ArticleImage } from "./ArticleImage";

// Server import type definition commentout out due to isolatedModules requirement
// import { Article as backendArticle } from "../../../../server/models/Article"

// interface Article extends Omit<backendArticle,"_id"|"businessId"> {
//     _id: string,
//     businessId: string | undefined
// }

interface Article {
    _id?: string
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
    businessId?: string
    allowComments?: boolean
    allowAnonymousComments?: boolean
    comments?: ArticleComment[]
    ipCanComment?: boolean
}

export type { Article }