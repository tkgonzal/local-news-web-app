"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArticleTag = void 0;
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
exports.isArticleTag = isArticleTag;
