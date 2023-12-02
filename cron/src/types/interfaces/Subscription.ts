import { ArticleTag } from "../types/ArticleTag";
import { SubscriptionFrequency } from "../types/SubscriptionFrequencies";

interface Subscription {
    _id?: string
    email: string | null;
    phone: string | null;
    frequency: SubscriptionFrequency;
    subscribedForAll: boolean;
    subscriptionTypes: ArticleTag[];
}

export type { Subscription };