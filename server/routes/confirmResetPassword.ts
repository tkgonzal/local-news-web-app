import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { updateUserPassword } from '../models/User';
import { verifyToken, verifyTokenMiddleware } from '../utils/jwtUtils';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/reset', verifyTokenMiddleware, async (req: Request, res: Response) => {
    try {
        const { newPassword } = req.body;
        const token = req.headers.authorization as string;
        const userEmail = verifyToken(token);
        const hashedPassword: string = await bcrypt.hash(newPassword, 10);

        if (userEmail) {
            updateUserPassword(userEmail, hashedPassword);           
            res.status(200).json({ message: 'Password reset successful' });
        }
        else {
            res.status(400).json({ message: "Invalid token" });
        }
    }
    catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ message: 'An error occured resetting the password' });
    }
});

export default router;
