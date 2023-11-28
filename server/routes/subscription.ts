import express from "express";

import { getSubscriptions, createSubscription } from "../models/Subscription";

import dotenv from "dotenv";
import { Subscription } from "../types/interfaces/Subscription";
dotenv.config();

const router = express.Router();

// Returns newsletter subscriptions
router.get("/", async (req, res) => {
    try {
        const subscriptions = await getSubscriptions();

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