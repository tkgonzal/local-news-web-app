import express from "express";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail, User } from "../models/User";
require('dotenv').config()

const router = express.Router();
const secretKey = process.env.JWT_SECRET as string;

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExists = await getUserByEmail(email)
        if (userExists) {
            return res.status(400).json({ message: 'Email address already exists' })
        }

        const hashedPassword: string = await bcrypt.hash(password, 10)
        const newUser: User = { email, password: hashedPassword };

        const createdUser = await createUser(newUser);

        

        const userWithoutPassword = { ...createdUser, password: undefined };
        const accessToken = jwt.sign({ username: userWithoutPassword.email }, secretKey);
        res.status(201).json({ userWithoutPassword, accessToken });
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/get-users/:email', async (req, res) => {
    const userEmail = req.params.email;

    try {
        const user = await getUserByEmail(userEmail);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).send('User not found');
        }
    }
    catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;