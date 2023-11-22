import { ArticleTag } from "../types/ArticleTag";
import { SubscriptionFrequency } from "../types/SubscriptionFrequency";

interface Subscription {
    email: string | null;
    phone: string | null;
    frequency: SubscriptionFrequency;
    subscribedForAll: boolean;
    subscriptionTypes: ArticleTag[];
}

export type { Subscription };