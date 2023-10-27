import express from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

import { createUser, getUserByEmail, User } from "../models/User";
import Permission from "../types/enums/Permission";

require('dotenv').config();

const router = express.Router();
const secretKey = process.env.JWT_SECRET as string;

// Registers users to the app
router.post('/register', async (req, res) => {
    try {
        const { userData } = req.body;

        const userExists = await getUserByEmail(userData.email);
        if (userExists) {
            return res.status(400).json({ message: 'Email address already exists' });
        }

        const hashedPassword: string = await bcrypt.hash(userData.password, 10);

        const newUser: User = { 
            email: userData.email,
            password: hashedPassword,
            phone: userData.mobileNumber,
            accType: userData.accType,
            businessId: "",
            businessName: userData.businessName,
            businessWebsite: userData.businessWebsite,
            articlePermissions: userData.accType === "Business" ?
                Permission.DELETE : Permission.READ_ONLY,
            userPermissions: userData.accType === "Business" ?
                Permission.DELETE : Permission.READ_ONLY,
            hasDisabledLogin: false,
            receivesCommentNotifications: false
        };

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

export default router;