import { Collection, ObjectId, FindCursor } from 'mongodb';
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
    return articleCollection.findOne<Article>({_id:id})
  };

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

export {Article, getArticles, getArticlesByTag, getArticleByID, createArticle}