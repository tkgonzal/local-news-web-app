import { Collection, FindCursor, MatchKeysAndValues, ObjectId, WithId } from 'mongodb';

import { connectToDatabase } from '../config/db';

import { Name } from '../types/interfaces/Name';
import Permission from '../types/enums/Permission';
import { UserAccountType } from '../types/types/UserAccountType';

interface User {
  _id?: string | null | ObjectId;
  name?: Name;
  password: string;
  email: string;
  phone?: string;
  accType: UserAccountType;
  // For non-Business User accounts, indicates the _id of 
  // a Business User account they're associated with
  businessId?: string;
  businessName?: string;
  businessWebsite?: string;
  articlePermissions?: Permission;
  userPermissions?: Permission;
  hasDisabledLogin?: boolean;
  // For Business Accounts, Indicates whether or not the account should receive
  // an email about new comment notifcation
  receivesCommentNotifications?: boolean;
  notes?: string;
}

/**
 * @returns {Promise<Collection<User>>} A Promise meant to return the DB's
 * collection of Users
 */
async function getUserCollection(): Promise<Collection<User>> {
  const db = await connectToDatabase();
  if (!db) {
      throw new Error("Database connection not initialized");
  }
  return db.collection<User>("User");
};

/**
 * @param businessId {string} The businessId to search for
 * @returns The array of all users associated with the businessId
 */
async function getUsersForBusinessId(businessId: string): Promise<WithId<User>[]> {
  const users = await getUserCollection();
  const businessObjectId: ObjectId = new ObjectId(businessId);

  const usersForBusiness = await users.find(
    { $or: [{ _id: businessObjectId }, { businessId }]}
  );

  return usersForBusiness.toArray();
}

/**
 * @param user {User} A User to insert into the collection
 * @returns {Promise<User | null>} A Promise meant to return the user inserted
 * into the collection
 */
async function createUser(user: User): Promise<User | null> {
  const userCollection = await getUserCollection();
  const result = await userCollection.insertOne(user);

  if (result.insertedId) {
    const insertedUser = { ...user, _id: result.insertedId } as User;
    return insertedUser;
  }
  else {
    throw new Error("User not inserted");
  }
};

/**
 * @param email {string} Email to find user from
 * @returns {Promise<User | null>} Promise meant to return User based on email
 */
async function getUserByEmail(email: string): Promise<User | null> {
    const userCollection = await getUserCollection();
    return userCollection.findOne({ email: email });
};

/**
 * @param id {string} The id of a user
 * @returns Either the user based on the id or null if the user doesn't exist
 */
async function getUserById(id: string): Promise<User | null> {
  const userCollection = await getUserCollection();
  return userCollection.findOne({_id: new ObjectId(id)});
}

/**
 * Updates User of email's password to the newPassword
 * @param email {string} Email to find User from
 * @param newPassword {string} new password to update User's password to
 * @returns The User with their password updated
 */
async function updateUserPassword(email: string, newPassword: string): Promise<User | null> {
  const userCollection = await getUserCollection();

  const updatedUser = await userCollection.findOneAndUpdate(
      { email },
      { $set: { password: newPassword } },
  );

  if (updatedUser) {
    return updatedUser;
  } else {
    return null;
  }
};

/**
 * Finds a user based on a given userId and updates its corresponding members
 * based on a passed members object
 * @param userId {string} The string representing the Object of of a User's _id
 * @param valuesToUpdate {Object} The pairs of keys and values to update for the 
 * given User of _id ObjectId(userId)
 */
async function updateUserMembersById(
  userId: string, 
  valuesToUpdate: MatchKeysAndValues<User>
) {
  const userCollection = await getUserCollection();

  await userCollection.findOneAndUpdate(
    { _id: new ObjectId(userId) },
    { $set: valuesToUpdate }
  );
}

export { 
  User, 
  createUser, 
  getUserByEmail,
  getUserById,
  getUsersForBusinessId,
  getUserCollection, 
  updateUserPassword, 
  updateUserMembersById 
};