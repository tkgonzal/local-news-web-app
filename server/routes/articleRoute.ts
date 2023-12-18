import express from "express";
import Case, { type } from "case";
import { verifyToken, verifyTokenMiddleware } from '../utils/jwtUtils';
import { cleanComments } from "../utils/commentUtils";

import { 
    Article, 
    getArticleByID, 
    createArticle, 
    deleteArticle,
    updateArticleValuesById,
    incrementArticleEngagements,
    createComment,
} from "../models/Article";

import { authenticateToken } from "./authRoute";
import { ObjectId } from "mongodb";

import dotenv from "dotenv";
import { getUserByEmail } from "../models/User";
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
    if (article.comments) {
        article.comments = [...cleanComments(article.comments)]
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

// route to post a comment
router.post("/:articleId/comment", verifyTokenMiddleware, async (req: any, res) => {
    const token = req.headers.authorization as string;
    const userEmail = req.decoded.username
    if (userEmail === null) {
        return res.status(400).json({
            message: `Authentication Failed email was null`
        });
    }
    const user = await getUserByEmail(userEmail)
    console.log(user)

    if (user === null) {
        return res.status(400).json({
            message: `Authentication Failed email not found`
        });
    }

    try {
        const { articleId } = req.params;
        const { comment } = req.body

        comment.userName = user.name?.first?user.name.first:"Anon" + user.name?.last?` ${user.name?.last}`:""
        const comments = await createComment(articleId, comment)
        
        // By default, increment an article's engagements by 5
        await incrementArticleEngagements(articleId, 5);

        res.status(200).json({
            message: `Comment Successful Posted`,
            comments: comments
        });
    } catch (error: any) {
        console.log("Comment failed to post", error);
        res.status(500).json({
            message: "Internal Server Error Occurred While Posting Comment"
        });
    }
});

// route to post a comment
router.post("/:articleId/anoncomment", async (req, res) => {
    try {
        const { articleId } = req.params;
        const { comment } = req.body
        const { ip } = req
        if (typeof ip !== "string") {
            return res.status(500).json({
                message: 'ip undefined'
            })
        }
        comment.ip = ip
        comment.userName = "anonymous"

        const comments = await createComment(articleId, comment)

        // By default, increment an article's engagements by 5
        await incrementArticleEngagements(articleId, 5);

        res.status(200).json({
            message: `Comment Successful Posted ${articleId}`,
            comments: comments
        });
    } catch (error: any) {
        console.log("Comment failed to post", error);
        res.status(500).json({
            message: "Internal Server Error Occurred While Posting Comment",
        });
    }
});

// Given an articleId, deletes the article with the corresponding value for its
// _id
router.delete("/:articleId", authenticateToken, async (req, res) => {
    const token = req.headers.authorization as string;
    const userEmail = verifyToken(token);
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