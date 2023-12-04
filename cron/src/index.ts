import { sendOutSubscriptionNewsletters } from "./services/subscriptions.js";
import dotenv from "dotenv";
dotenv.config();

(async () => {
    sendOutSubscriptionNewsletters("Hourly");
})();