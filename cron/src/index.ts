import { sendOutSubscriptionNewsletters } from "./services/subscriptions.js";
import { sendOutCommentNotifications } from "./services/notifications.js";
import cron from "node-cron";

(async () => {
    await sendOutCommentNotifications();
    // // Runs Every Hour
    // cron.schedule("0 * * * * ", () => sendOutSubscriptionNewsletters("Hourly"));
    // // Runs Every Hour At Midnight
    // cron.schedule("0 0 * * * ", () => sendOutSubscriptionNewsletters("Daily"));
    // // Runs Every Monday At Midnight
    // cron.schedule("0 0 * * 1 ", () => sendOutSubscriptionNewsletters("Weekly"));
    // // Runs Every 1st and 15th of the Month at Midnight
    // cron.schedule(
    //     "0 0 1,15 * * ", 
    //     () => sendOutSubscriptionNewsletters("Biweekly")
    // );
    // // Runs Every 1st of the Month At Midnight
    // cron.schedule("0 0 1 * * ", () => sendOutSubscriptionNewsletters("Weekly"));
})();