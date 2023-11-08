import { Article } from "../Article"

// An interface for the data to be sent to create a new article or update an
// existing one from the Business Panel
interface ArticleRequestData extends Omit<Article, 
    "_id" |
    "tags" |
    "publishedDate" | 
    "images" | 
    "engagements"
> {}

export type { ArticleRequestData }