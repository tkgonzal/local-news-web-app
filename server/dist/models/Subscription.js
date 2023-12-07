"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubscription = exports.updateSubscription = exports.createSubscription = exports.getSubscriptionsByEmailOrPhone = exports.getSubscriptionsByFrequency = exports.getSubscriptions = void 0;
const db_1 = require("../config/db");
/**
 * @returns {Promise<Collection<Subscription>>} A collection of all the
 * Subscriptions in the DB
 */
async function getSubscriptionCollection() {
    const db = await (0, db_1.connectToDatabase)();
    if (!db) {
        throw new Error("Database connection not initialized");
    }
    return db.collection("Subscription");
}
/**
 * @returns {Promise<Subscription[]>} The array of all subscriptions in the db
 */
async function getSubscriptions() {
    const subscriptionsCollection = await getSubscriptionCollection();
    const subscriptions = await subscriptionsCollection.find({});
    return subscriptions.toArray();
}
exports.getSubscriptions = getSubscriptions;
/**
 *
 * @param frequency {SubscriptionFrequency} The frequncy to search for
 * @returns {Promise<Subscription[]>} A promise to return an array of
 * subscriptions
 */
async function getSubscriptionsByFrequency(frequency) {
    const subscriptions = await getSubscriptionCollection();
    const matches = await subscriptions.find({ frequency });
    return matches.toArray();
}
exports.getSubscriptionsByFrequency = getSubscriptionsByFrequency;
/**
 *
 * @param email {string | null} An email to search for if any
 * @param phone {phone | null} A phone to search for if any
 * @returns All subscriptions that match given non-null email and phones
 */
async function getSubscriptionsByEmailOrPhone(email, phone) {
    const subscriptions = await getSubscriptionCollection();
    const findConstraints = [];
    const constraints = [
        ["email", email],
        ["phone", phone]
    ];
    constraints.forEach(([name, constraint]) => constraint && findConstraints.push({ [name]: constraint }));
    const matches = await subscriptions.find({ $or: findConstraints });
    return matches.toArray();
}
exports.getSubscriptionsByEmailOrPhone = getSubscriptionsByEmailOrPhone;
/**
 * @param subscription A subscription to add to the db
 * @returns {Promise<Subscription | null>} The subscription as added to the db
 */
async function createSubscription(subscription) {
    const subscriptions = await getSubscriptionCollection();
    const inserted = await subscriptions.insertOne(subscription);
    if (inserted.insertedId) {
        const insertedSubscription = {
            ...subscription,
            _id: inserted.insertedId
        };
        return insertedSubscription;
    }
    else {
        throw new Error("Subscription not added");
    }
}
exports.createSubscription = createSubscription;
/**
 * @param id {ObjectId} The id of the subscription to update
 * @param subscriptionValues {MatchKeysAndValues<Subscription>} The values
 * to update a subscription with
 */
async function updateSubscription(id, subscriptionValues) {
    const subscriptions = await getSubscriptionCollection();
    await subscriptions.findOneAndUpdate({ _id: id }, { $set: subscriptionValues });
}
exports.updateSubscription = updateSubscription;
/**
 * @param id {ObjectId} The id of a subscription to delete
 */
async function deleteSubscription(id) {
    const subscriptions = await getSubscriptionCollection();
    await subscriptions.deleteOne({ _id: id });
}
exports.deleteSubscription = deleteSubscription;
