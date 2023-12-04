import { Article } from "./Article"

interface SubscriptionArticles {
    "newArticles": Article[],
    "Breaking News": Article[],
    "Local News": Article[],
    "Crime": Article[],
    "Sports": Article[],
    "Government": Article[],
    "Education": Article[],
    [key: string]: any
}

export type { SubscriptionArticles };