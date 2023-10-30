// Types denoting the different types of valid article types
import { SportsArticleTag } from "./SportsArticleTag"


type SectionTags = 
    "Breaking News" | 
    "Local News" | 
    "Crime" | 
    "Government" | 
    "Education" | 
    "Sports"

type ArticleTag = SectionTags | SportsArticleTag

export type { ArticleTag }