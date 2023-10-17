import { MongoClient, Db } from "mongodb";
require('dotenv').config()

const uri = process.env.MONGODB_URI as string;

let db: Db | null = null;

async function connectToDatabase() {
    if (!db) {
        const client = new MongoClient(uri);

        try {
            await client.connect();
            db = client.db(process.env.DB_NAME);
        }
        catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    }
    console.log('Successfully connected to MongoDB!')
    return db;
}

export { connectToDatabase };