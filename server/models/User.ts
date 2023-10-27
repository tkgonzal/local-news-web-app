import { Collection, ObjectId } from 'mongodb';

import { connectToDatabase } from '../config/db';

import { Name } from '../types/interfaces/Name';
import Permission from '../types/enums/Permission';
import { UserAccountType } from '../types/types/UserAccountType';

interface User {
  _id?: string | null;
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



export { createUser, getUserByEmail, User, getUserCollection, updateUserPassword };