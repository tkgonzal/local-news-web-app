import express from "express";
import { 
    Article, 
    getArticles, 
    getArticlesByFrequencyAndTag, 
    getArticlesByTag, 
    getBreakingArticles 
} from "../models/Article";

import { isArticleTag } from "../types/types/ArticleTag";
import { 
    SubscriptionFrequency, 
    isSubscriptionFrequency 
} from "../types/types/SubscriptionFrequency";
import { SubscriptionArticles } from "../types/interfaces/SubscriptionArticles";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get('/', async (req, res) => {
    const { tag } = req.query
    if (typeof tag !== "string") {
        return res.status(400).json({ message: 'Invalid Tag Type' })
    }
    if (!isArticleTag(tag)) {
        return res.status(400).json({ message: 'Invalid Article Type' })
    }

    let cursor;
    if (tag && tag === "Breaking News") {
        cursor = await getBreakingArticles();
    }
    else if (tag) {
        cursor = await getArticlesByTag(tag)
    }
    else {
        cursor = await getArticles()
    }
    if (cursor == null) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
    const articles: Article[] = await cursor.toArray()

    res.status(201).json(articles)
})

// Endpoint to retrieve a set of articles for subscription notifications
router.get("/subscriptions", async (req, res) => {
    try {
        const { frequency } = req.query;

        if (!frequency || !isSubscriptionFrequency(frequency as string)) {
            return res.status(400).json({
                message: "Request failed must include a valid subscription frequency as frequency param"
            });
        }

        const freq = frequency as SubscriptionFrequency;

        const newArticlesCursor = await getArticlesByFrequencyAndTag(freq);
        const newArticles = await newArticlesCursor.toArray();

        const subscriptionArticles: SubscriptionArticles = {
            "newArticles": newArticles,
            "Breaking News": [],
            "Local News": [],
            "Crime": [],
            "Sports": [],
            "Government": [],
            "Education": [],
        }

        if (newArticles) {
            for (const tag in subscriptionArticles) {
                if (isArticleTag(tag)) {
                    const tagCursor = await getArticlesByFrequencyAndTag(
                        freq, tag
                    );
                    const tagArticles = await tagCursor.toArray();
                    subscriptionArticles[tag] = tagArticles;
                }
            }
        }

        res.status(200).json({
            message: "Subscriptions succssfully retrieved",
            articles: subscriptionArticles
        });
    } catch (error: any) {
        console.log(
            "An error occurred while retrieving articles for subscriptions",
            error
        );
        res.status(500).json({
            message: "Internal Server Error Occurred While Retrieving Subscription Articles",
            error
        });
    }
});

export default router;