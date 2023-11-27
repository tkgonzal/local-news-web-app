import express from "express";

import { getSubscriptions } from "../models/Subscription";

import dotenv from "dotenv";
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

export default router;