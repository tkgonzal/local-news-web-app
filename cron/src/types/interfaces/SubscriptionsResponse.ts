import { Subscription } from "./Subscription.js";

interface SubscriptionResponse {
    message: string;
    subscriptions?: Subscription[];
};

export type { SubscriptionResponse };
