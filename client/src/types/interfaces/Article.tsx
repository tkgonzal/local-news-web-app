// Interface currently only accounts for members needed for ArticleThumbnails
import { ArticleTag } from "../types/ArticleTag"
import { SportsArticleTag } from "../types/SportsArticleTag"
import { ArticleImage } from "./ArticleImage"

interface Article {
    _id?: string
    tags: (ArticleTag | SportsArticleTag)[]
    source: string
    // For scraped articles, indicates the url of the original article
    sourceUrl?: ""
    authors: string[]
    images: ArticleImage[]
    heading: string
    subHeading?: string
    engagements?: number
    publishedDate: string
    body: string[] | string
}

export type { Article }