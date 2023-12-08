import express from "express";
import { MatchKeysAndValues } from "mongodb";
import dotenv from "dotenv";

import { 
    getSubscriptions,
    getSubscriptionsByFrequency,
    getSubscriptionsByEmailOrPhone,
    createSubscription, 
    updateSubscription,
    deleteSubscription
} from "../models/Subscription";

import { Subscription } from "../types/interfaces/Subscription";

import { 
    SubscriptionFrequency, 
    isSubscriptionFrequency 
} from "../types/types/SubscriptionFrequency";

dotenv.config();

const router = express.Router();

// Returns newsletter subscriptions. If an email or phone param is given,
// returns subscriptions that match the given email or phone
router.get("/", async (req, res) => {
    try {
        const { email, phone } = req.query;

        const subscriptions = (email || phone) ? 
            await getSubscriptionsByEmailOrPhone(
                email as string, phone as string
            ) :
            await getSubscriptions();

        res.status(200).json({
            message: "Newsletters subscriptions found",
            subscriptions
        });
    } catch (error: any) {
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

        if (!isSubscriptionFrequency(frequency)) {
            return res.status(400).json({
                message: "Must give a valid subscription frequency to search for"
            });
        }

        const subscriptions = await getSubscriptionsByFrequency(
            frequency as SubscriptionFrequency
        );

        res.status(200).json({
            message: "Subscriptions found",
            subscriptions
        });
    } catch (error: any) {
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

        const subscription: Subscription = {
            email: subscriptionData.email,
            phone: subscriptionData.phone,
            frequency: subscriptionData.frequency,
            subscribedForAll: subscriptionData.subscribedForAll,
            subscriptionTypes: subscriptionData.subscriptionTypes
        };

        await createSubscription(subscription);

        res.status(200).json({
            message: "New subscription added"
        });
    } catch (error: any) {
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

        const subscriptionMatches = await getSubscriptionsByEmailOrPhone(
            email, phone
        );

        if (!subscriptionMatches || subscriptionMatches.length < 1) {
            return res.status(400).json({
                message: "No subscriptions found for the given email or phone, updated failed"
            });
        }

        const subscriptionValues: MatchKeysAndValues<Subscription> = {
            email,
            phone,
            frequency: subscriptionData.frequency,
            subscribedForAll: subscriptionData.subscribedForAll,
            subscriptionTypes: subscriptionData.subscriptionTypes
        }

        const firstMatch = subscriptionMatches[0];
        firstMatch._id && await updateSubscription(
            firstMatch._id, subscriptionValues
        );

        // Delete extra subscriptions if they exist to prevent a single
        // email/phone from being sent newsletters for the same updates
        if (subscriptionMatches.length > 1) {
            for (let i = 1; i < subscriptionMatches.length; i++) {
                const curSubscription = subscriptionMatches[i];
                curSubscription._id && await deleteSubscription(
                    curSubscription._id
                );
            }
        }

        res.status(200).json({
            message: "Subscription successfully updated"
        });
    } catch (error: any) {
        console.log("Error occurred updating subscription: ", error);
        res.status(500).json({
            message: "Internal server Error Occurred Updating Subscription",
            error
        });
    }
});

export default router;