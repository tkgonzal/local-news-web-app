import { Collection } from "mongodb";
import { connectToDatabase } from "../config/db";
import { Subscription } from "../types/interfaces/Subscription";

async function getSubscriptionCollection(): Promise<Collection<Subscription>> {
    const db = await connectToDatabase();
    
    if (!db) {
        throw new Error("Database connection not initialized");
    }

    return db.collection<Subscription>("Subscription");
}