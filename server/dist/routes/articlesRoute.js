"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Article_1 = require("../models/Article");
const ArticleTag_1 = require("../types/types/ArticleTag");
const SubscriptionFrequency_1 = require("../types/types/SubscriptionFrequency");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    const { tag } = req.query;
    if (typeof tag !== "string") {
        return res.status(400).json({ message: 'Invalid Tag Type' });
    }
    if (!(0, ArticleTag_1.isArticleTag)(tag)) {
        return res.status(400).json({ message: 'Invalid Article Type' });
    }
    let cursor;
    if (tag && tag === "Breaking News") {
        cursor = await (0, Article_1.getBreakingArticles)();
    }
    else if (tag) {
        cursor = await (0, Article_1.getArticlesByTag)(tag);
    }
    else {
        cursor = await (0, Article_1.getArticles)();
    }
    if (cursor == null) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    const articles = await cursor.toArray();
    res.status(201).json(articles);
});
// Endpoint to retrieve a set of articles for subscription notifications
router.get("/subscriptions", async (req, res) => {
    try {
        const { frequency } = req.query;
        if (!frequency || !(0, SubscriptionFrequency_1.isSubscriptionFrequency)(frequency)) {
            return res.status(400).json({
                message: "Request failed must include a valid subscription frequency as frequency param"
            });
        }
        const freq = frequency;
        const newArticlesCursor = await (0, Article_1.getArticlesByFrequencyAndTag)(freq);
        const newArticles = await newArticlesCursor.toArray();
        const subscriptionArticles = {
            "newArticles": newArticles,
            "Breaking News": [],
            "Local News": [],
            "Crime": [],
            "Sports": [],
            "Government": [],
            "Education": [],
        };
        if (newArticles) {
            for (const tag in subscriptionArticles) {
                if ((0, ArticleTag_1.isArticleTag)(tag)) {
                    const tagCursor = await (0, Article_1.getArticlesByFrequencyAndTag)(freq, tag);
                    const tagArticles = await tagCursor.toArray();
                    subscriptionArticles[tag] = tagArticles;
                }
            }
        }
        res.status(200).json({
            message: "Subscriptions succssfully retrieved",
            articles: subscriptionArticles
        });
    }
    catch (error) {
        console.log("An error occurred while retrieving articles for subscriptions", error);
        res.status(500).json({
            message: "Internal Server Error Occurred While Retrieving Subscription Articles",
            error
        });
    }
});
exports.default = router;
