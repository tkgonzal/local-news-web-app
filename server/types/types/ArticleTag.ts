const SectionTags = [
    "Breaking News",
    "Local News",
    "Crime",
    "Government",
    "Education" ,
    "Sports"
]
type SectionTag =  typeof SectionTags[number]

// Types denoting the different types of valid sports article types
const SportsArticleTags = [
    "Soccer",
    "Basketball",
    "Tennis",
    "Football",
    "Golf",
    "Fishing"
]
type SportsArticleTag =  typeof SportsArticleTags[number]


type ArticleTag = SectionTag | SportsArticleTag

function isArticleTag(value: string): value is ArticleTag {
    return SectionTags.includes(value) || SportsArticleTags.includes(value)
}

export type { ArticleTag, SectionTag, SectionTags, SportsArticleTag, SportsArticleTags }
export { isArticleTag }