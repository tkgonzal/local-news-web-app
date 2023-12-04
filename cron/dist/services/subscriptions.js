import axios from "axios";
import dotenv from "dotenv";
import { isArticleTag } from "../types/types/ArticleTag.js";
import { SubscriptionArticleTags } from "../types/interfaces/ArticlesResponse.js";
import { isSubscriptionFrequency } from "../types/types/SubscriptionFrequencies.js";
import { sendEmail } from "../utils/email.js";
// SMS unused due to Twilio API restrictions
// import { sendText } from "../utils/text.js";
// Setup
dotenv.config();
// Constants
const BASE_SERVER_URL = process.env.SERVER_URL;
const BASE_CLIENT_URL = process.env.CLIENT_URL;
// Utility Functions
// Retrieves new articles published in the given frequency period
const getNewArticles = async (frequency) => {
    if (!isSubscriptionFrequency(frequency)) {
        throw new Error("Given frequency is not valid, process terminating");
    }
    try {
        const articlesResponse = await axios.get(`${BASE_SERVER_URL}/api/articles/subscriptions`, { params: { frequency } });
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
// Creates a NewsletterTagText object to use for generating a Newsletter
const makeNewsletterText = (subscriptionArticles) => {
    const newsletterText = {
        "Breaking News": "",
        "Local News": "",
        "Crime": "",
        "Sports": "",
        "Government": "",
        "Education": "",
    };
    for (const tag of SubscriptionArticleTags) {
        if (isArticleTag(tag)) {
            // Get the articles for that tag and process them accordingly
            const articles = subscriptionArticles[tag];
            let tagText = "";
            for (const article of articles) {
                tagText += makeNewsletterBullet(article);
            }
            newsletterText[tag] = tagText;
        }
    }
    return newsletterText;
};
// Sends out a newsletter for a subscription
const sendOutNewsletter = async (subscription, newsletterText, frequency) => {
    let newsletter = `Here's your ${subscription.frequency} MoNews Newsletter!\n\n`;
    const newsletterSubject = `MoNews ${frequency} Newsletter Subscription`;
    for (const tag of subscription.subscriptionTypes) {
        newsletter += `${tag} Articles:\n`;
        newsletter += newsletterText[tag] || "No new articles for this period\n";
        newsletter += "\n";
    }
    if (subscription.email) {
        sendEmail(subscription.email, newsletterSubject, newsletter);
    }
    // if (subscription.phone) {
    //     sendText(subscription.phone, newsletterSubject, newsletter);
    // }
};
// Creates a bulletpoint for an article to be used in a Newsletter
const makeNewsletterBullet = (article) => {
    return `• ${article.heading} [${article.source}] (${BASE_CLIENT_URL}/article/${article._id})\n`;
};
// Main function for subscription service, retrieves new articles for a given
// frequncy and subscriptions for that frequency and sends out newsletters for
// each subscription
const sendOutSubscriptionNewsletters = async (frequency) => {
    try {
        const subscriptionArticles = await getNewArticles(frequency);
        if (subscriptionArticles.newArticles) {
            const newsletterText = makeNewsletterText(subscriptionArticles);
            const subscriptions = await getSubscriptions(frequency);
            for (const subscription of subscriptions) {
                sendOutNewsletter(subscription, newsletterText, frequency);
            }
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