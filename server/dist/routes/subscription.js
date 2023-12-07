"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const Subscription_1 = require("../models/Subscription");
const SubscriptionFrequency_1 = require("../types/types/SubscriptionFrequency");
dotenv_1.default.config();
const router = express_1.default.Router();
// Returns newsletter subscriptions. If an email or phone param is given,
// returns subscriptions that match the given email or phone
router.get("/", async (req, res) => {
    try {
        const { email, phone } = req.query;
        const subscriptions = (email || phone) ?
            await (0, Subscription_1.getSubscriptionsByEmailOrPhone)(email, phone) :
            await (0, Subscription_1.getSubscriptions)();
        res.status(200).json({
            message: "Newsletters subscriptions found",
            subscriptions
        });
    }
    catch (error) {
        console.log("Error retrieving subscriptions: ", error);
        res.status(500).json({
            message: "Internal Server Error Occurred Retrieving Subscriptions",
            error
        });
    }
});
// Endpoint to retrieve newsletter subscriptions by frequency
router.get("/:frequency", async (req, res) => {
    try {
        const { frequency } = req.params;
        if (!(0, SubscriptionFrequency_1.isSubscriptionFrequency)(frequency)) {
            return res.status(400).json({
                message: "Must give a valid subscription frequency to search for"
            });
        }
        const subscriptions = await (0, Subscription_1.getSubscriptionsByFrequency)(frequency);
        res.status(200).json({
            message: "Subscriptions found",
            subscriptions
        });
    }
    catch (error) {
        console.log("An error occurred while retrieving subscriptions", error);
        res.status(500).json({
            message: "Internal Server Error Occurred Retrieving subscriptions",
            error
        });
    }
});
// Adds a subscription to the DB
router.post("/new", async (req, res) => {
    try {
        const { subscriptionData } = req.body;
        const subscription = {
            email: subscriptionData.email,
            phone: subscriptionData.phone,
            frequency: subscriptionData.frequency,
            subscribedForAll: subscriptionData.subscribedForAll,
            subscriptionTypes: subscriptionData.subscriptionTypes
        };
        await (0, Subscription_1.createSubscription)(subscription);
        res.status(200).json({
            message: "New subscription added"
        });
    }
    catch (error) {
        console.log("Error adding subscription: ", error);
        res.status(500).json({
            message: "Internal Server Error Occurred Adding Subscription",
            error
        });
    }
});
// Endpoint to update a subscription in the DB. Finds the subscription by 
// matching based on a given email and phone. If multiple matches are found
// for the email and phone combination, will delete extra matches of the 
// subscription
router.put("/", async (req, res) => {
    try {
        const { subscriptionData } = req.body;
        const email = subscriptionData.email;
        const phone = subscriptionData.phone;
        const subscriptionMatches = await (0, Subscription_1.getSubscriptionsByEmailOrPhone)(email, phone);
        if (!subscriptionMatches || subscriptionMatches.length < 1) {
            return res.status(400).json({
                message: "No subscriptions found for the given email or phone, updated failed"
            });
        }
        const subscriptionValues = {
            email,
            phone,
            frequency: subscriptionData.frequency,
            subscribedForAll: subscriptionData.subscribedForAll,
            subscriptionTypes: subscriptionData.subscriptionTypes
        };
        const firstMatch = subscriptionMatches[0];
        firstMatch._id && await (0, Subscription_1.updateSubscription)(firstMatch._id, subscriptionValues);
        // Delete extra subscriptions if they exist to prevent a single
        // email/phone from being sent newsletters for the same updates
        if (subscriptionMatches.length > 1) {
            for (let i = 1; i < subscriptionMatches.length; i++) {
                const curSubscription = subscriptionMatches[i];
                curSubscription._id && await (0, Subscription_1.deleteSubscription)(curSubscription._id);
            }
        }
        res.status(200).json({
            message: "Subscription successfully updated"
        });
    }
    catch (error) {
        console.log("Error occurred updating subscription: ", error);
        res.status(500).json({
            message: "Internal server Error Occurred Updating Subscription",
            error
        });
    }
});
exports.default = router;
