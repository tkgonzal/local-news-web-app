import express from "express";
import Case from "case";

import { 
    Article, 
    getArticleByID, 
    createArticle, 
    deleteArticle,
    updateArticleValuesById,
    incrementArticleEngagements
} from "../models/Article";

import { authenticateToken } from "./authRoute";
import { ObjectId } from "mongodb";

import dotenv from "dotenv";
dotenv.config();

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
            heading: Case.title(articleData.heading),
            authors: articleData.authors,
            subHeading: Case.title(articleData.subHeading) || undefined,
            engagements: 0,
            body: articleData.body,
            publishedDate: (new Date()).toISOString(),
            businessId: new ObjectId(articleData.businessId),
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

// Route to update
router.put("/:articleId", authenticateToken, async (req, res) => {
    try {
        const { articleId } = req.params;
        const { articleValues } = req.body;

        const formattedArticleValues = {
            ...articleValues,
            heading: articleValues["heading"] ? 
                Case.title(articleValues["heading"]) : undefined,
            subHeading: articleValues["subHeading"] ?
                Case.title(articleValues["subHeading"]) : undefined
        }

        await updateArticleValuesById(articleId, formattedArticleValues);

        res.status(200).json({
            message: "Article sucessfully updated",
            articleId
        });
    } catch (error: any) {
        console.log("An error occurred while trying to update the article", error);
        res.status(500).json({
            message: "Internal Server Error Occurred While Updating Article",
            error
        });
    }
});

// Route to increase the engagements of an article by their articleId
router.put("/engagements/:articleId", authenticateToken, async (req, res) => {
    try {
        const { articleId } = req.params;

        // By default, increment an article's engagements by 1
        await incrementArticleEngagements(articleId, 1);

        res.status(200).json({
            message: `Engagements successfully increased for article of id ${articleId}`
        });
    } catch (error: any) {
        console.log("An error occurred whil trying to update the article", error);
        res.status(500).json({
            message: "Internal Server Error Occurred While Updating Article Engagements"
        });
    }
});

// Given an articleId, deletes the article with the corresponding value for its
// _id
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