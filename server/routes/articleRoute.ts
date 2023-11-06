import express from "express";
import { getArticleByID, createArticle } from "../models/Article";
require('dotenv').config();

const router = express.Router();

router.get('/', async (req, res) => {
    res.status(400).json({ message: 'Specify an article with api/article/:uid or use api/articles to get all' })
})

router.get('/:uid', async (req, res) => {
    const id = req.params.uid
    const article = await getArticleByID(id)
    if (article == null) {
        return res.status(500).json({ message: 'Article Not Found' })
    }
    res.status(201).json(article)
})

router.post('/:uid', async (req, res) => {

})

export default router;