const subscriptionFrequencies = [
    "Hourly",
    "Daily",
    "Weekly",
    "Biweekly",
    "Monthly"
];
// Type Guard for Subscription Frequency
const isSubscriptionFrequency = (value) => {
    return subscriptionFrequencies.includes(value);
};
export { isSubscriptionFrequency };
//# sourceMappingURL=SubscriptionFrequencies.js.map