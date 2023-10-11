import { Collection, ObjectId } from 'mongodb';
import { connectToDatabase } from '../config/db';

interface User {
    password: string;
    email: string;
}

async function getUserCollection(): Promise<Collection<User>> {
    const db = await connectToDatabase();
    if (!db) {
        throw new Error("Database connection not initialized");
    }
    return db.collection<User>('users'); 
  }

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
  }

async function getUserByEmail(email: string): Promise<User | null> {
    const userCollection = await getUserCollection();
    return userCollection.findOne({ email: email })
}

export { createUser, getUserByEmail, User };