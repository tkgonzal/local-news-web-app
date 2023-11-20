import express from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

import { createUser, 
    getUserByEmail,
    getUserById,
    updateUserMembersById, 
    User 
} from "../models/User";
import { authenticateToken } from "./authRoute";
import Permission from "../types/enums/Permission";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const secretKey = process.env.JWT_SECRET as string;

// Retrieves the information of a user of a given id
router.get("/id/:userId", authenticateToken, async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await getUserById(userId);

        if (user) {
            res.status(200).json({
                message: "User succesfully retrieved",
                userById: {...user, password: undefined}
            });
        } else {
            res.status(201).json({
                message: `No user for id ${userId} found`,
                userById: null 
            });
        }
    } catch (error: any) {
        console.log("Error occurred while retrieving user", error);
        res.status(500).json({
            message: "Internal Server Error Occurred while retrieving user",
            error
        });
    }
});

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
            name: {
                first: "",
                last: "",
            },
            email: userData.email,
            password: hashedPassword,
            phone: userData.mobileNumber,
            accType: userData.accType,
            businessId: undefined,
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

// Endpoint to retrieve a user by their email
router.post("/email", authenticateToken, async (req, res) => {
    try {
        const { email } = req.body;
        const userByEmail: User | null = await getUserByEmail(email);
        
        if (userByEmail) {
            res.status(200).json({
                message: `User for email ${email} found`,
                userByEmail: { ...userByEmail, password: undefined }
            });
        } else {
            res.status(201).json({
                message: `No user for email ${email} found`,
                data: null
            });
        }
    } catch (error: any) {
        console.log("Error finding user by email");
        res.json({
            status: 500,
            message: "Internal Server Error"
        });
    }
});

// Endpoint to update a user's (found based on _id) values
router.put("/id/:userId", authenticateToken, async (req, res) => {
    try {
        const { userId } = req.params;
        const { userValues } = req.body;

        // Converts businessId to an ObjectId for the puprposes of the update
        // function
        const filteredValuesToUpdate = {
            ...userValues,
            businessId: userValues["businessId"] ? 
              new ObjectId(userValues["businessId"]) : undefined
        }
        
        updateUserMembersById(userId, filteredValuesToUpdate);
    } catch (error: any) {
        console.log(`Error updating user by id`);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

export default router;