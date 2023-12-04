const SectionTags = [
    "Headline",
    "Breaking News",
    "Local News",
    "Crime",
    "Government",
    "Education",
    "Sports"
];
// Types denoting the different types of valid sports article types
const SportsArticleTags = [
    "Soccer",
    "Basketball",
    "Tennis",
    "Football",
    "Golf",
    "Fishing"
];
function isArticleTag(value) {
    return SectionTags.includes(value) || SportsArticleTags.includes(value);
}
export { isArticleTag };
//# sourceMappingURL=ArticleTag.js.map