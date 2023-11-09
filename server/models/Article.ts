import { Collection, ObjectId, FindCursor, WithId } from 'mongodb';
import { connectToDatabase } from '../config/db';
import { Article } from '../types/interfaces/Article';
import { ArticleTag } from '../types/types/ArticleTag';

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
  console.log(result);
}

export {
  Article, 
  getArticles, 
  getArticlesByTag, 
  getArticleByID, 
  getArticlesByBusinessId,
  createArticle,
  deleteArticle
}