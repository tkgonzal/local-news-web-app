"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSubscriptionFrequency = void 0;
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
exports.isSubscriptionFrequency = isSubscriptionFrequency;
