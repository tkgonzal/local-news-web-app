"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const case_1 = __importDefault(require("case"));
const Article_1 = require("../models/Article");
const authRoute_1 = require("./authRoute");
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    res.status(400).json({ message: 'Specify an article with api/article/:uid or use api/articles to get all' });
});
router.get('/:uid', async (req, res) => {
    const id = req.params.uid;
    const article = await (0, Article_1.getArticleByID)(id);
    if (article == null) {
        return res.status(500).json({ message: 'Article Not Found' });
    }
    res.status(201).json(article);
});
// Endpoint to add a new article to the DB. Should only be called on from the
// client
router.post("/new", authRoute_1.authenticateToken, async (req, res) => {
    try {
        const { articleData } = req.body;
        const newArticle = {
            tags: ["Local News"],
            source: articleData.source,
            heading: case_1.default.title(articleData.heading),
            authors: articleData.authors,
            subHeading: case_1.default.title(articleData.subHeading) || undefined,
            engagements: 0,
            body: articleData.body,
            publishedDate: (new Date()).toISOString(),
            businessId: new mongodb_1.ObjectId(articleData.businessId),
            allowComments: articleData.allowComments || false,
            allowAnonymousComments: articleData.allowAnonymousComments || false,
            images: []
        };
        await (0, Article_1.createArticle)(newArticle);
        res.status(200).json({
            message: "Article succesfully created"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error Occurred Adding New Article",
            error
        });
    }
});
// router.post('/:uid', async (req, res) => {
// })
// Route to update
router.put("/:articleId", authRoute_1.authenticateToken, async (req, res) => {
    try {
        const { articleId } = req.params;
        const { articleValues } = req.body;
        const formattedArticleValues = {
            ...articleValues,
            heading: articleValues["heading"] ?
                case_1.default.title(articleValues["heading"]) : undefined,
            subHeading: articleValues["subHeading"] ?
                case_1.default.title(articleValues["subHeading"]) : undefined
        };
        await (0, Article_1.updateArticleValuesById)(articleId, formattedArticleValues);
        res.status(200).json({
            message: "Article sucessfully updated",
            articleId
        });
    }
    catch (error) {
        console.log("An error occurred while trying to update the article", error);
        res.status(500).json({
            message: "Internal Server Error Occurred While Updating Article",
            error
        });
    }
});
// Given an articleId, deletes the article with the corresponding value for its
// _id
router.delete("/:articleId", authRoute_1.authenticateToken, async (req, res) => {
    try {
        const { articleId } = req.params;
        await (0, Article_1.deleteArticle)(articleId);
        res.status(200).json({
            message: "Successfully deleted article"
        });
    }
    catch (error) {
        console.log("An error occurred deleting the article", error);
        res.status(500).json({
            message: "Internal Server Error Occurred Adding New Article",
            error
        });
    }
});
exports.default = router;
