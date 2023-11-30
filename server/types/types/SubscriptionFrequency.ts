const subscriptionFrequencies = [
    "Hourly",
    "Daily",
    "Weekly",
    "Biweekly",
    "Monthly"
];
type SubscriptionFrequency = typeof subscriptionFrequencies[number]

// Type Guard for Subscription Frequency
const isSubscriptionFrequency = (value: string): 
    value is SubscriptionFrequency => {
    return subscriptionFrequencies.includes(value);
}

export type { SubscriptionFrequency }
export { isSubscriptionFrequency }