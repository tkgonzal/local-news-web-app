// Interface currently only accounts for members needed for ArticleThumbnails
import { ArticleTag } from "../types/ArticleTag"

interface Article {
    imgSrc: string
    heading: string
    subHeading: string
    tags: ArticleTag[]
}

export type { Article }