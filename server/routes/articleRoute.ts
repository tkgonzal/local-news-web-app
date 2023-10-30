import express from "express";
import { getArticleByID, createArticle } from "../models/Article";
require('dotenv').config();

const router = express.Router();

router.get('/', async (req, res) => {
    res.status(400).json({ message: 'Specify an article with api/article/:uid or use api/articles' })
})

router.get('/:uid', async (req, res) => {
    const article = getArticleByID(req.params.uid)
    if (article == null) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
    res.status(201).json(article)
})

router.post('/:uid', async (req, res) => {

})

export default router;