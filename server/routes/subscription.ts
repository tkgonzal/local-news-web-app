import express from "express";

import { 
    getSubscriptions, 
    getSubscriptionsByEmailOrPhone,
    createSubscription 
} from "../models/Subscription";

import { Subscription } from "../types/interfaces/Subscription";

import dotenv from "dotenv";
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
        })
    } catch (error: any) {
        console.log("Error retrieving subscriptions: ", error);
        res.status(500).json({
            message: "Internal Server Error Occurred Retrieving Subscriptions",
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

export default router;