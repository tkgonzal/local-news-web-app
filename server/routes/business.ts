import express from "express";

import { authenticateToken } from "./authRoute";

import { 
    updateUserMembersById,
    getUsersByBusinessId,
    getUsersByNotifications,
} from "../models/User";

import {
    getArticlesByBusinessId,
    getNewestArticleCommentsByBusinessId
} from "../models/Article"

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Retrieves the users for a given business based on businessId
router.get("/users/:businessId", async (req, res) => {
    try {
        const { businessId } = req.params;
        const users = await getUsersByBusinessId(businessId);

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
            articles: businessArticles
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

// Gets all business admins who have their notifications toggle on
router.get("/notifications/users", async (req, res) => { 
    try {
        const usersWithNotificationsOn = await getUsersByNotifications();

        res.status(200).json({
            message: "Users for notifications update successfully retrieved",
            users: usersWithNotificationsOn.map(user => 
                ({...user, password: undefined})
            )
        });
    } catch (error: any) {
        console.log("Error occurred retrieving users for notifications", error);
        res.status(500).json({
            message: "Internal Server Error Occurred Retrieving Users",
            error
        });
    }
});

// Gets all comments posted in the past day on articles that match the given 
// businessId
router.get("/notifications/:businessId", async (req, res) => {
    try {
        const { businessId } = req.params;

        const articleComments = await getNewestArticleCommentsByBusinessId(
            businessId
        );

        res.status(200).json({
            message: "New comments for business successfully retrieved",
            articleComments
        });
    } catch (error: any) {
        console.log("Error occureed retrieving new comments", error);
        res.status(500).json({
            message: "Internal server error occurred while retrieving comments",
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