import { Article } from "./Article.js";

interface ArticleResponse {
    message: string;
    articles?: SubscriptionArticles;
};

interface SubscriptionArticles {
    newArticles: Article[],
    "Local News": Article[],
    "Breaking News": Article[],
    "Crime": Article[],
    "Sports": Article[],
    "Government": Article[],
    "Education": Article[],
};

const SubscriptionArticleTags = [
    "Local News",
    "Breaking News",
    "Crime",
    "Sports",
    "Government",
    "Education",
];


export type { ArticleResponse, SubscriptionArticles };
export { SubscriptionArticleTags };