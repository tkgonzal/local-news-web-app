import express from "express";
import { Article, getArticles, getArticlesByTag } from "../models/Article";
require('dotenv').config();

const router = express.Router();

router.get('/', async (req, res) => {
    const { tag } = req.body
    let cursor;
    if (tag) {
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