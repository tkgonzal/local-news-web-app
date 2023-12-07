"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../models/User");
const Article_1 = require("../models/Article");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
// Retrieves the users for a given business based on businessId
router.get("/users/:businessId", async (req, res) => {
    try {
        const { businessId } = req.params;
        const users = await (0, User_1.getUsersByBusinessId)(businessId);
        res.status(200).json({
            message: "Users for business succesfully found",
            users: users.map(user => ({ ...user, password: undefined }))
        });
    }
    catch (error) {
        console.log("Error retrieving users for the businessId: ", error);
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
        const businessArticles = await (0, Article_1.getArticlesByBusinessId)(businessId);
        res.status(200).json({
            message: "Articles succesfully retrieved",
            articles: businessArticles
        });
    }
    catch (error) {
        console.log("Error retrieving users for the businessId: ", error);
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
        (0, User_1.updateUserMembersById)(_id, valuesToUpdate);
        res.status(201).json({
            message: "Comment notifications successfully enabled"
        });
    }
    catch (error) {
        console.log("Error updating user's notification settings: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.default = router;
