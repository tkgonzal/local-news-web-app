import { Collection, MatchKeysAndValues, ObjectId } from "mongodb";
import { connectToDatabase } from "../config/db";
import { Subscription } from "../types/interfaces/Subscription";
import { SubscriptionFrequency } from "../types/types/SubscriptionFrequency";

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
}

/**
 * @returns {Promise<Subscription[]>} The array of all subscriptions in the db
 */
async function getSubscriptions(): Promise<Subscription[]> {
    const subscriptionsCollection = await getSubscriptionCollection();
    const subscriptions = await subscriptionsCollection.find({});
    return subscriptions.toArray();
}

/**
 * 
 * @param frequency {SubscriptionFrequency} The frequncy to search for
 * @returns {Promise<Subscription[]>} A promise to return an array of 
 * subscriptions
 */
async function getSubscriptionsByFrequency(frequency: SubscriptionFrequency):
    Promise<Subscription[]> {
    const subscriptions = await getSubscriptionCollection();
    const matches = await subscriptions.find({ frequency });
    return matches.toArray();
}

/**
 * 
 * @param email {string | null} An email to search for if any
 * @param phone {phone | null} A phone to search for if any
 * @returns All subscriptions that match given non-null email and phones
 */
async function getSubscriptionsByEmailOrPhone(
    email: string | null, 
    phone: string | null
): Promise<Subscription[] | null> {
    const subscriptions = await getSubscriptionCollection();
    const findConstraints: MatchKeysAndValues<Subscription>[] = [];
    const constraints: [string, string | null][] = [
        ["email", email], 
        ["phone", phone]
    ];
    
    constraints.forEach(([name, constraint]) => 
        constraint && findConstraints.push({ [name]: constraint })
    );

    const matches = await subscriptions.find(
        { $or: findConstraints }
    );
    return matches.toArray();
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

/**
 * @param id {ObjectId} The id of the subscription to update
 * @param subscriptionValues {MatchKeysAndValues<Subscription>} The values
 * to update a subscription with
 */
async function updateSubscription(
    id: ObjectId,
    subscriptionValues: MatchKeysAndValues<Subscription>
) {
    const subscriptions = await getSubscriptionCollection();

    await subscriptions.findOneAndUpdate(
        { _id: id },
        { $set: subscriptionValues }
    );
}

/**
 * @param id {ObjectId} The id of a subscription to delete
 */
async function deleteSubscription(id: ObjectId) {
    const subscriptions = await getSubscriptionCollection();

    await subscriptions.deleteOne({ _id: id });
}

export { 
    getSubscriptions, 
    getSubscriptionsByFrequency,
    getSubscriptionsByEmailOrPhone, 
    createSubscription,
    updateSubscription,
    deleteSubscription,
};