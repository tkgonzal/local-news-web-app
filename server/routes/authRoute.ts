import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserByEmail, User } from "../models/User";
require('dotenv').config()

const router = express.Router();
const secretKey = process.env.JWT_SECRET as string;

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await getUserByEmail(email)

        if (!user) {
            return res.status(400).json({ message: 'Email address does not exist' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(403).json({ message: 'IUncorrect Password' })
        }

        const accessToken = jwt.sign({ username: user.email }, secretKey);
        const userWithoutPassword = { ...user, password: undefined };
        
        res.json({ accessToken, userWithoutPassword })

    }
    catch (error) {
        console.log('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;