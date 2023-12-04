import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";

import { 
    ArticleResponse,
    SubscriptionArticlesResponse
} from "../types/interfaces/ArticlesResponse.js";

import { Subscription } from "../types/interfaces/Subscription.js";
import { 
    SubscriptionFrequency, 
    isSubscriptionFrequency 
} from "../types/types/SubscriptionFrequencies.js";
import { 
    SubscriptionResponse 
} from "../types/interfaces/SubscriptionsResponse.js";

// Setup
dotenv.config();

// Constants
const BASE_SERVER_URL: string = process.env.SERVER_URL;

// Utility Functions
// Retrieves new articles published in the given frequency period
const getNewArticles = async (frequency: SubscriptionFrequency) => {
    if (!isSubscriptionFrequency(frequency)) {
        throw new Error("Given frequency is not valid, process terminating");
    }

    try {
        const articlesResponse: AxiosResponse<ArticleResponse> = await axios.get(
            `${BASE_SERVER_URL}/api/articles/subscriptions`,
            {
                params: {
                    frequency
                }
            }
        );

        const articlesData = articlesResponse.data;
        if (articlesData.articles) {
            return articlesData.articles;
        } else {
            console.log(`Error occurred while gathering new articles for frequecy ${frequency}`);
        }
    } catch (error: any) {
        console.log("Error occurred while gathering new articles");
        throw error;
    }
}

// Retrieves the subscriptions in the DB that match the given subscription 
// frequency
const getSubscriptions = async (frequency: SubscriptionFrequency):
    Promise<Subscription[]> => {
    if (!isSubscriptionFrequency(frequency)) {
        throw new Error("Given frequency is not valid, process terminating");
    }

    try {
        const subscriptionsResponse: AxiosResponse<SubscriptionResponse> = 
            await axios.get(
            `${BASE_SERVER_URL}/api/subscriptions/${frequency}`
        )

        const subscriptionsData = subscriptionsResponse.data;

        if (subscriptionsData.subscriptions) {
            return subscriptionsData.subscriptions
        } else {
            throw new Error("No subscriptions found, process terminating");
        }
    } catch (error: any) {
        console.log("Error occurred while gathering subscriptions");
        throw error;
    }
}

// Main function for subscription service, retrieves new articles for a given
// frequncy and subscriptions for that frequency and sends out newsletters for
// each subscription
const sendOutSubscriptionNewsletters = async (
    frequency: SubscriptionFrequency
) => {
    try {
        const subscriptionArticles = await getNewArticles(frequency);
        if (subscriptionArticles.newArticles) {
            const subscriptions = await getSubscriptions(frequency);
        } else {
            console.log(`${(new Date()).toLocaleDateString()}: No new articles made for this period.`);
        }

    } catch (error: any) {
        console.log("Error occurred while sending out subscriptions", error);
    }
}

export { sendOutSubscriptionNewsletters };