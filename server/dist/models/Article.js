"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateArticleValuesById = exports.deleteArticle = exports.createArticle = exports.getArticlesByBusinessId = exports.getArticleByID = exports.getBreakingArticles = exports.getArticlesByFrequencyAndTag = exports.getArticlesByTag = exports.getArticles = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("../config/db");
async function getArticleCollection() {
    const db = await (0, db_1.connectToDatabase)();
    if (!db) {
        throw new Error("Database connection not initialized");
    }
    return db.collection("article");
}
;
async function getArticles() {
    const articleCollection = await getArticleCollection();
    const cursor = articleCollection.find({});
    return cursor;
}
exports.getArticles = getArticles;
;
async function getArticlesByTag(tag) {
    const articleCollection = await getArticleCollection();
    const cursor = articleCollection.find({ tags: tag });
    return cursor;
}
exports.getArticlesByTag = getArticlesByTag;
;
/**
 * @param frequency {SubscriptionFrequency} The frequency of a subscription to
 * check against the Articles for
 * @param tag {ArticleTag} Optional parameter, specifies if the find should only
 * find Articles that also match a certain tag
 * returns {Promise<FindCursor<Article>>} A Promise returning a
 */
async function getArticlesByFrequencyAndTag(frequency, tag) {
    const articles = await getArticleCollection();
    const filterDate = new Date();
    switch (frequency) {
        case "Hourly":
            filterDate.setHours(filterDate.getHours() - 1);
            break;
        case "Daily":
            filterDate.setDate(filterDate.getDate() - 1);
            break;
        case "Weekly":
            filterDate.setDate(filterDate.getDate() - 7);
            break;
        case "Biweekly":
            filterDate.setDate(filterDate.getDate() - 14);
            break;
        case "Monthly":
            filterDate.setMonth(filterDate.getMonth() - 1);
            break;
    }
    const articlesAndQuery = [
        { publishedDate: { $gt: filterDate.toISOString() } }
    ];
    if (tag) {
        articlesAndQuery.push({ tags: tag });
    }
    const articlesCursor = await articles.find({ $and: articlesAndQuery });
    return articlesCursor;
}
exports.getArticlesByFrequencyAndTag = getArticlesByFrequencyAndTag;
/**
 * @returns {Promise<FindCursor<Article> | null>} A find cursor consisting of
 * articles that have been published within the past month
 */
async function getBreakingArticles() {
    const articles = await getArticleCollection();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return articles.find({
        $or: [
            { publishedDate: { $gt: oneMonthAgo.toISOString() } },
            { tags: "Breaking News" }
        ]
    });
}
exports.getBreakingArticles = getBreakingArticles;
async function getArticleByID(id) {
    const articleCollection = await getArticleCollection();
    return articleCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
}
exports.getArticleByID = getArticleByID;
;
/**
 * @param businessId {string} The string representing the ObjectId for a
 * business
 * @returns A promise meant to return an array of all Article objects that
 * match the provided businessId
 */
async function getArticlesByBusinessId(businessId) {
    const articles = await getArticleCollection();
    const businessObjectId = new mongodb_1.ObjectId(businessId);
    const articlesForBusiness = await articles.find({ businessId: businessObjectId });
    return articlesForBusiness.toArray();
}
exports.getArticlesByBusinessId = getArticlesByBusinessId;
async function createArticle(article) {
    const articleCollection = await getArticleCollection();
    const result = await articleCollection.insertOne(article);
    if (result.insertedId) {
        const insertedUser = { ...article, _id: result.insertedId };
        return insertedUser;
    }
    else {
        throw new Error("Article not inserted");
    }
}
exports.createArticle = createArticle;
;
/**
 * Deletes an article from the collection based on a given articleId
 * @param articleId {string} The articleId of the article to delete as a string
 */
async function deleteArticle(articleId) {
    const articleCollection = await getArticleCollection();
    const articleObjectId = new mongodb_1.ObjectId(articleId);
    const result = await articleCollection.deleteOne({ _id: articleObjectId });
    console.log(result);
}
exports.deleteArticle = deleteArticle;
/**
 * Finds an article based on the articleId and updates its corresponding values
 * based on the valuesToUpdate
 * @param articleId {string} The string for the id of the Article to update
 * @param valuesToUpdate {Object} The pairs of keys and values to update for the
 * article of _id articleId
 */
async function updateArticleValuesById(articleId, valuesToUpdate) {
    const userCollection = await getArticleCollection();
    const filteredValuesToUpdate = {
        ...valuesToUpdate,
        "businessId": valuesToUpdate["businessId"] ?
            new mongodb_1.ObjectId(valuesToUpdate["businessId"]) : undefined
    };
    await userCollection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(articleId) }, { $set: filteredValuesToUpdate });
}
exports.updateArticleValuesById = updateArticleValuesById;
