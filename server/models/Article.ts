import { 
  Collection, 
  ObjectId, 
  FindCursor, 
  WithId,
  Filter,
  MatchKeysAndValues 
} from 'mongodb';
import { connectToDatabase } from '../config/db';
import { Article } from '../types/interfaces/Article';
import { ArticleTag, isArticleTag } from '../types/types/ArticleTag';
import { SubscriptionFrequency } from '../types/types/SubscriptionFrequency';
import { ArticleComment } from '../types/interfaces/ArticleComment';
import { cleanComments } from '../utils/commentUtils';

async function getArticleCollection(): Promise<Collection<Article>> {
    const db = await connectToDatabase();
    if (!db) {
        throw new Error("Database connection not initialized");
    }
    return db.collection<Article>("article");
  };

async function getArticles(): Promise<FindCursor<Article> | null> {
    const articleCollection = await getArticleCollection()
    const cursor = articleCollection.find<Article>({})
    return cursor
  };

async function getArticlesByTag(tag: ArticleTag): Promise<FindCursor<Article> | null> {
    const articleCollection = await getArticleCollection()
    const cursor = articleCollection.find<Article>({tags:tag})
    return cursor
  };

/**
 * @param frequency {SubscriptionFrequency} The frequency of a subscription to 
 * check against the Articles for
 * @param tag {ArticleTag} Optional parameter, specifies if the find should only
 * find Articles that also match a certain tag
 * returns {Promise<FindCursor<Article>>} A Promise returning a 
 */
async function getArticlesByFrequencyAndTag(
  frequency: SubscriptionFrequency,
  tag?: ArticleTag
): Promise<FindCursor<Article>> {
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

  const articlesAndQuery: Filter<WithId<Article>>[] = [
    { publishedDate: { $gt: filterDate.toISOString() } }
  ];

  if (tag) {
    articlesAndQuery.push({ tags: tag });
  }

  const articlesCursor = await articles.find<Article>({ $and: articlesAndQuery });
  return articlesCursor;  
}

/**
 * @returns {Promise<FindCursor<Article> | null>} A find cursor consisting of 
 * articles that have been published within the past month
 */
async function getBreakingArticles(): Promise<FindCursor<Article> | null> {
  const articles = await getArticleCollection();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  return articles.find<Article>({ 
    $or: [
      { publishedDate: { $gt: oneMonthAgo.toISOString() } },
      { tags: "Breaking News" }
    ]
  });
}

async function getArticleByID(id: string): Promise<Article | null> {
    const articleCollection = await getArticleCollection()
    return articleCollection.findOne<Article>({_id: new ObjectId(id)})
  };

/**
 * @param businessId {string} The string representing the ObjectId for a 
 * business
 * @returns A promise meant to return an array of all Article objects that 
 * match the provided businessId
 */
async function getArticlesByBusinessId(businessId: string): Promise<WithId<Article>[]> {
  const articles = await getArticleCollection();
  const businessObjectId: ObjectId = new ObjectId(businessId);

  const articlesForBusiness = await articles.find({ businessId: businessObjectId });

  return articlesForBusiness.toArray();
}

/**
 * @param businessId {string} The businessId of an Article represented as a string
 * @returns {Promise<Document[] | undefined>} A promise meant to return an 
 * aggregation of all articles with comments posted in the last day
 */
async function getNewestArticleCommentsByBusinessId(businessId: string) {
  const articles = await getArticleCollection();
  const businessObjectId: ObjectId = new ObjectId(businessId);
  const dayBefore = (new Date());
  dayBefore.setDate(dayBefore.getDate() - 1);

  const articleComments = articles.aggregate([
    { $match: { businessId: businessObjectId }},
    { $unwind: "$comments" },
    { $match: { "comments.publishedDate": { $gt: dayBefore.toISOString() }}},
    { $group: { 
      _id: { _id: "$_id", heading: "$heading" },
      comments: { $push: "$comments" }
    }},
    { $project: {
      _id: "$_id.id", heading: "$_id.heading", comments: "$comments"
    }}
  ]);

  return articleComments.toArray();
}

async function createArticle(article: Article): Promise<Article | null> {
    const articleCollection = await getArticleCollection()
    const result = await articleCollection.insertOne(article)
    if (result.insertedId) {
            const insertedUser = { ...article, _id: result.insertedId } as Article;
            return insertedUser;
        }
        else {
            throw new Error("Article not inserted");
        }
  };

/**
 * Deletes an article from the collection based on a given articleId
 * @param articleId {string} The articleId of the article to delete as a string
 */
async function deleteArticle(articleId: string) {
  const articleCollection = await getArticleCollection();

  const articleObjectId: ObjectId = new ObjectId(articleId);

  const result = await articleCollection.deleteOne({ _id: articleObjectId });
  // console.log(result);
}

/**
 * Finds an article based on the articleId and updates its corresponding values
 * based on the valuesToUpdate
 * @param articleId {string} The string for the id of the Article to update
 * @param valuesToUpdate {Object} The pairs of keys and values to update for the
 * article of _id articleId
 */
async function updateArticleValuesById(
  articleId: string,
  valuesToUpdate: MatchKeysAndValues<Article>
) {
  const articleCollection = await getArticleCollection();

  const filteredValuesToUpdate = {
    ...valuesToUpdate,
    "businessId": valuesToUpdate["businessId"] ?
      new ObjectId(valuesToUpdate["businessId"]) : undefined
  }

  await articleCollection.findOneAndUpdate(
    { _id: new ObjectId(articleId)},
    { $set: filteredValuesToUpdate }
  );
}

/**
 * @param articleId {string} The object id of an article represented as a string
 * @param amount {amount} The amount by which to increment an article's 
 * engagements
 */
async function incrementArticleEngagements(articleId: string, amount: number) {
  const articleCollection = await getArticleCollection();

  await articleCollection.findOneAndUpdate(
    { _id: new ObjectId(articleId) },
    { $inc: { engagements: amount } }
  );
}

/**
 * @param articleId {string} The object id of an article represented as a string
 * @param comment {Comment} The amount by which to increment an article's 
 * engagements
 */
async function createComment(articleId: string, newComment: ArticleComment) {
    const articleCollection = await getArticleCollection();

    const existingArticle = await articleCollection.findOne({ _id: new ObjectId(articleId) });

    if (!existingArticle) {
        console.error(`Article with ID ${articleId} not found.`)
        throw Error(`Article not found.`)
    }

    if (existingArticle.allowComments === false) {
        throw Error(`Comments not allowed`)
    }

    if (!existingArticle.comments) {
        existingArticle.comments = []
    }

    if (newComment.userName === "anonymous" && existingArticle.comments.find((comment)=>(comment.ip==newComment.ip))) {
        console.error(`Article with ID ${articleId} not found.`)
        throw Error(`Ip already posted on this article.`)
    }
    
    if (newComment.userName === "anonymous" && existingArticle.allowAnonymousComments === false) {
        console.error(`Anonymous comments not allowed on ${articleId}.`)
        throw Error(`Anonymous comments are disabled.`)
    }

    const commentWithId = {
        ...newComment,
        _id: new ObjectId(),
        publishedDate: new Date().toISOString()
    }
    existingArticle.comments.push(commentWithId)

    articleCollection.updateOne({ _id: new ObjectId(articleId) }, { $set: { comments: existingArticle.comments } })
    return cleanComments(existingArticle.comments)
}

export {
  Article, 
  getArticles, 
  getArticlesByTag,
  getArticlesByFrequencyAndTag,
  getBreakingArticles,
  getArticleByID, 
  getArticlesByBusinessId,
  getNewestArticleCommentsByBusinessId,
  createArticle,
  createComment,
  deleteArticle,
  incrementArticleEngagements,
  updateArticleValuesById,
};