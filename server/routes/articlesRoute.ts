import express from "express";
import { 
    Article, 
    getArticles, 
    getArticlesByTag, 
    getBreakingArticles 
} from "../models/Article";

import { isArticleTag } from "../types/types/ArticleTag";

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

export default router;