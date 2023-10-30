import { Collection, ObjectId } from 'mongodb';
import { connectToDatabase } from '../config/db';

interface Article {

};

async function getArticleCollection(): Promise<Collection<Article>> {
    const db = await connectToDatabase();
    if (!db) {
        throw new Error("Database connection not initialized");
    }
    return db.collection<Article>("article");
  };