import axios from "axios";
import dotenv from "dotenv";
import { isSubscriptionFrequency } from "../types/types/SubscriptionFrequencies.js";
// Setup
dotenv.config();
// Constants
const BASE_SERVER_URL = process.env.SERVER_URL;
// Utility Functions
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
        const subscriptions = await getSubscriptions(frequency);
        console.log(subscriptions);
    }
    catch (error) {
        console.log("Error occurred while sending out subscriptions", error);
    }
};
export { sendOutSubscriptionNewsletters };
//# sourceMappingURL=subscriptions.js.map