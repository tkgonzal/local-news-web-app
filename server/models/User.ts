import { Collection, ObjectId } from 'mongodb';
import { connectToDatabase } from '../config/db';

interface User {
    password: string;
    email: string;
    accType: string; 
    businessName: string;
    businessWebsite: string; 
    mobileNumber: string;
};

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