import express from "express";

import { updateUserMembersById } from "../models/User";

require("dotenv").config();

const router = express.Router();

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
        res.status(500).json({message: "Internal Server Error"});
    }
});

export default router;