import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { getUserByEmail, User } from "../models/User";

import { verifyTokenMiddleware } from '../utils/jwtUtils';

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const secretKey = process.env.JWT_SECRET as string;

// Middleware
// Middleware to authenticate an access token given with a request
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader: string | undefined = req.headers["authorization"];
    const token: string | undefined = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.json({
            status: 401,
            message: "No access token given, please login"
        });
    }

    jwt.verify(token, secretKey,
        (err) => {
            if (err) {
                return res.json({
                    status: 403,
                    message: "Invalid access token given"
                });
            }

            next();
        }
    );
}

// Endpoints
// Endpoint to log user in
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user: User | null = await getUserByEmail(email);

        if (!user) {
            return res.status(400).json({ message: 'Email address does not exist' });
        }

        if (user.hasDisabledLogin) {
            return res.status(401).json({
                message: "Your login has been disabled. Please contact the system administrator"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(403).json({ message: 'Incorrect Password' });
        }

        const accessToken = jwt.sign(
            { username: user.email }, secretKey, { expiresIn: "3h"}
        );
        const userWithoutPassword = { ...user, password: undefined };
        
        res.json({ accessToken, userWithoutPassword });

    }
    catch (error) {
        console.log('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Used to relogin user after refresh if their token is still valid
router.post("/relogin", verifyTokenMiddleware, async (req: any, res) => {
    try {
        const userEmail = req.decoded.username;

        if (!userEmail) {
            return res.status(400).json({
                message: "Authentication failed, no matching email found"
            });
        }

        const user = await getUserByEmail(userEmail);

        if (!user) {
            return res.status(400).json({
                message: "Authentication failed, no matching user found"
            });
        }

        res.status(200).json({
            message: "Successfully relogged in",
            user: {...user, password: undefined}
        });
    } catch (error: any) {
        console.log("Error occurred logging user back in", error);
        res.status(500).json({
            message: "Internal Server Error Occurred While Posting Comment"
        });
    }
});

export default router;
export { authenticateToken };