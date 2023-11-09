import express from "express";

import { 
    updateUserMembersById,
    getUsersForBusinessId
} from "../models/User";

import {
    getArticlesByBusinessId
} from "../models/Article"

require("dotenv").config();

const router = express.Router();

// Retrieves the users for a given business based on businessId
router.get("/users/:businessId", async (req, res) => {
    try {
        const { businessId } = req.params;
        const users = await getUsersForBusinessId(businessId);

        res.status(200).json({
            message: "Users for business succesfully found",
            users: users.map(user => ({...user, password: undefined}))
        });
    } catch (error: any) {
        console.log(
            "Error retrieving users for the businessId: ",
            error
        );
        res.status(500).json({ 
            message: "Interal Server Error Occurred Retrieving Users",
            error
        });
    }
});

// Retrieves the articles for a given business based on the businessId
router.get("/articles/:businessId", async (req, res) => {
    try {
        const { businessId } = req.params;

        const businessArticles = await getArticlesByBusinessId(businessId);

        res.status(200).json({
            message: "Articles succesfully retrieved",
            businessArticles
        });
    } catch (error: any) {
        console.log(
            "Error retrieving users for the businessId: ",
            error
        );
        res.status(500).json({ 
            message: "Interal Server Error Occurred Retrieving Users",
            error
        });
    }
});

// Updates the user's notifications settings for aritcle comments
router.put("/notifications", async (req, res) => {
    try {
        const { _id, valuesToUpdate } = req.body;
        updateUserMembersById(_id, valuesToUpdate);

        res.status(201).json({
            message: "Comment notifications successfully enabled"
        });
    } catch (error: any) {
        console.log("Error updating user's notification settings: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;