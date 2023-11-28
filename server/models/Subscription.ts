import { Collection } from "mongodb";
import { connectToDatabase } from "../config/db";
import { Subscription } from "../types/interfaces/Subscription";

/**
 * @returns {Promise<Collection<Subscription>>} A collection of all the
 * Subscriptions in the DB
 */
async function getSubscriptionCollection(): Promise<Collection<Subscription>> {
    const db = await connectToDatabase();
    
    if (!db) {
        throw new Error("Database connection not initialized");
    }

    return db.collection<Subscription>("Subscription");
};

/**
 * @returns {Promise<Subscription[]>} The array of all subscriptions in the db
 */
async function getSubscriptions(): Promise<Subscription[]> {
    const subscriptionsCollection = await getSubscriptionCollection();
    const subscriptions = await subscriptionsCollection.find({});
    return subscriptions.toArray();
}

/**
 * @param subscription A subscription to add to the db
 * @returns {Promise<Subscription | null>} The subscription as added to the db
 */
async function createSubscription(subscription: Subscription): 
    Promise<Subscription | null> {
        const subscriptions = await getSubscriptionCollection();
        const inserted = await subscriptions.insertOne(subscription);

        if (inserted.insertedId) {
            const insertedSubscription = {
                ...subscription,
                _id: inserted.insertedId
            } as Subscription;

            return insertedSubscription;
        } else {
            throw new Error("Subscription not added");
        }
}

export { getSubscriptions, createSubscription }