import express from "express";

import { 
    Article, 
    getArticleByID, 
    createArticle, 
    deleteArticle 
} from "../models/Article";

import { authenticateToken } from "./authRoute";

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

// Endpoint to add a new article to the DB. Should only be called on from the
// client
router.post("/new", authenticateToken, async (req, res) => {
    try {
        const { articleData } = req.body;

        const newArticle: Article = {
            tags: ["Local News"],
            source: articleData.source,
            heading: articleData.heading,
            authors: articleData.authors,
            subHeading: articleData.subheading || undefined,
            engagements: 0,
            body: articleData.body,
            publishedDate: (new Date()).toISOString(),
            businessId: articleData.businessId,
            allowComments: articleData.allowComments || false,
            allowAnonymousComments: articleData.allowAnonymousComments || false,
            images: []
        };

        await createArticle(newArticle);

        res.status(200).json({
            message: "Article succesfully created"
        });
    } catch (error: any) {
        res.status(500).json({
            message: "Internal Server Error Occurred Adding New Article",
            error
        });      
    }
});

router.post('/:uid', async (req, res) => {

})

router.delete("/:articleId", authenticateToken, async (req, res) => {
    try {
        const { articleId } = req.params;

        await deleteArticle(articleId);

        res.status(200).json({
            message: "Successfully deleted article"
        });
    } catch (error: any) {
        console.log("An error occurred deleting the article", error);
        res.status(500).json({
            message: "Internal Server Error Occurred Adding New Article",
            error
        });
    }
});


export default router;