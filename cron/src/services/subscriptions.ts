import axios from "axios";
import dotenv from "dotenv";

import { SubscriptionFrequency } from "../types/types/SubscriptionFrequencies";

// Setup
dotenv.config();

// Utility Functions
// Retrieves the subscriptions in the DB that match the given subscription 
// frequency
const getSubscriptions = async (frequency: SubscriptionFrequency) => {
    try {

    } catch (error: any) {
        console.log("Error occurred while gathering subscriptions");
        throw error;
    }
}

const sendOutSubscriptionNewsletters = () => {
    try {

    } catch (error: any) {
        console.log("Error occurred while sending out subscriptions", error);
    }
}

export { sendOutSubscriptionNewsletters };