import { ArticleTag } from "../types/ArticleTag.js";
import { SubscriptionFrequency } from "../types/SubscriptionFrequencies.js";

interface Subscription {
    _id?: string
    email: string | null;
    phone: string | null;
    frequency: SubscriptionFrequency;
    subscribedForAll: boolean;
    subscriptionTypes: ArticleTag[];
}

export type { Subscription };