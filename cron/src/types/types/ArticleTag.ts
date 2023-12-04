const SectionTags = [
    "Breaking News",
    "Local News",
    "Crime",
    "Government",
    "Education" ,
    "Sports"
];
type SectionTag =  typeof SectionTags[number];


type ArticleTag = SectionTag;

function isArticleTag(value: string): value is ArticleTag {
    return SectionTags.includes(value);
}

export type { ArticleTag, SectionTag };
export { isArticleTag };