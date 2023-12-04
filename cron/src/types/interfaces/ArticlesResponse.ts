import { Article } from "./Article.js";

interface ArticleResponse {
    message: string;
    articles?: SubscriptionArticlesResponse;
};

interface SubscriptionArticlesResponse {
    newArticles: Article[],
    "Local News": Article[],
    "Breaking News": Article[],
    "Crime": Article[],
    "Sports": Article[],
    "Government": Article[],
    "Education": Article[],
};

const SubscriptionArticleTags = [
    "newArticles",
    "Local News",
    "Breaking News",
    "Crime",
    "Sports",
    "Government",
    "Education",
];


export type { ArticleResponse, SubscriptionArticlesResponse };
export { SubscriptionArticleTags };