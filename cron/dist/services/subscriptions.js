import axios from "axios";
import dotenv from "dotenv";
import { isSubscriptionFrequency } from "../types/types/SubscriptionFrequencies.js";
// Setup
dotenv.config();
// Constants
const BASE_SERVER_URL = process.env.SERVER_URL;
// Utility Functions
// Retrieves new articles published in the given frequency period
const getNewArticles = async (frequency) => {
    if (!isSubscriptionFrequency(frequency)) {
        throw new Error("Given frequency is not valid, process terminating");
    }
    try {
        const articlesResponse = await axios.get(`${BASE_SERVER_URL}/api/articles/subscriptions`, {
            params: {
                frequency
            }
        });
        const articlesData = articlesResponse.data;
        if (articlesData.articles) {
            return articlesData.articles;
        }
        else {
            console.log(`Error occurred while gathering new articles for frequecy ${frequency}`);
        }
    }
    catch (error) {
        console.log("Error occurred while gathering new articles");
        throw error;
    }
};
// Retrieves the subscriptions in the DB that match the given subscription 
// frequency
const getSubscriptions = async (frequency) => {
    if (!isSubscriptionFrequency(frequency)) {
        throw new Error("Given frequency is not valid, process terminating");
    }
    try {
        const subscriptionsResponse = await axios.get(`${BASE_SERVER_URL}/api/subscriptions/${frequency}`);
        const subscriptionsData = subscriptionsResponse.data;
        if (subscriptionsData.subscriptions) {
            return subscriptionsData.subscriptions;
        }
        else {
            throw new Error("No subscriptions found, process terminating");
        }
    }
    catch (error) {
        console.log("Error occurred while gathering subscriptions");
        throw error;
    }
};
const sendOutSubscriptionNewsletters = async (frequency) => {
    try {
        const subscriptionArticles = await getNewArticles(frequency);
        if (subscriptionArticles.newArticles) {
            const subscriptions = await getSubscriptions(frequency);
        }
        else {
            console.log(`${(new Date()).toLocaleDateString()}: No new articles made for this period.`);
        }
    }
    catch (error) {
        console.log("Error occurred while sending out subscriptions", error);
    }
};
export { sendOutSubscriptionNewsletters };
//# sourceMappingURL=subscriptions.js.map