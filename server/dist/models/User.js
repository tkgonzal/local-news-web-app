"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserMembersById = exports.updateUserPassword = exports.getUserCollection = exports.getUsersByBusinessId = exports.getUserById = exports.getUserByEmail = exports.createUser = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("../config/db");
/**
 * @returns {Promise<Collection<User>>} A Promise meant to return the DB's
 * collection of Users
 */
async function getUserCollection() {
    const db = await (0, db_1.connectToDatabase)();
    if (!db) {
        throw new Error("Database connection not initialized");
    }
    return db.collection("User");
}
exports.getUserCollection = getUserCollection;
;
/**
 * @param user {User} A User to insert into the collection
 * @returns {Promise<User | null>} A Promise meant to return the user inserted
 * into the collection
*/
async function createUser(user) {
    const userCollection = await getUserCollection();
    const result = await userCollection.insertOne(user);
    if (result.insertedId) {
        const insertedUser = { ...user, _id: result.insertedId };
        return insertedUser;
    }
    else {
        throw new Error("User not inserted");
    }
}
exports.createUser = createUser;
;
/**
 * @param email {string} Email to find user from
 * @returns {Promise<User | null>} Promise meant to return User based on email
*/
async function getUserByEmail(email) {
    const userCollection = await getUserCollection();
    return userCollection.findOne({ email: email });
}
exports.getUserByEmail = getUserByEmail;
;
/**
 * @param id {string} The id of a user
 * @returns Either the user based on the id or null if the user doesn't exist
*/
async function getUserById(id) {
    const userCollection = await getUserCollection();
    return userCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
}
exports.getUserById = getUserById;
/**
 * @param businessId {string} The businessId to search for
 * @returns The array of all users associated with the businessId
 */
async function getUsersByBusinessId(businessId) {
    const users = await getUserCollection();
    const businessObjectId = new mongodb_1.ObjectId(businessId);
    const usersForBusiness = await users.find({ $or: [{ _id: businessObjectId }, { businessId: businessObjectId }] });
    return usersForBusiness.toArray();
}
exports.getUsersByBusinessId = getUsersByBusinessId;
/**
 * Updates User of email's password to the newPassword
 * @param email {string} Email to find User from
 * @param newPassword {string} new password to update User's password to
 * @returns The User with their password updated
*/
async function updateUserPassword(email, newPassword) {
    const userCollection = await getUserCollection();
    const updatedUser = await userCollection.findOneAndUpdate({ email }, { $set: { password: newPassword } });
    if (updatedUser) {
        return updatedUser;
    }
    else {
        return null;
    }
}
exports.updateUserPassword = updateUserPassword;
;
/**
 * Finds a user based on a given userId and updates its corresponding members
 * based on a passed members object
 * @param userId {string} The string representing the Object of of a User's _id
 * @param valuesToUpdate {Object} The pairs of keys and values to update for the
 * given User of _id ObjectId(userId)
 */
async function updateUserMembersById(userId, valuesToUpdate) {
    const userCollection = await getUserCollection();
    await userCollection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(userId) }, { $set: valuesToUpdate });
}
exports.updateUserMembersById = updateUserMembersById;
