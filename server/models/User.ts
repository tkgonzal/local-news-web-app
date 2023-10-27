import { Collection, MatchKeysAndValues, ObjectId } from 'mongodb';

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
}

async function getUserCollection(): Promise<Collection<User>> {
  const db = await connectToDatabase();
  if (!db) {
      throw new Error("Database connection not initialized");
  }
  return db.collection<User>("User");
};

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
 * @param email Returns u
 * @returns {Promise<User | null>} Returns User based on associated email
 */
async function getUserByEmail(email: string): Promise<User | null> {
    const userCollection = await getUserCollection();
    return userCollection.findOne({ email: email });
};

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
async function updateUserMembersById(userId: string, valuesToUpdate: MatchKeysAndValues<User>) {
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
  getUserCollection, 
  updateUserPassword, 
  updateUserMembersById 
};