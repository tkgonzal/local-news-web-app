import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getUserByEmail } from '../models/User';
import sendResetEmail from '../email/emailService';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const secretKey = process.env.JWT_SECRET as string;

router.post('/send-request-link', async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }

    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });

    const resetPasswordLink = `http://localhost:5173/confirm-reset-password?token=${token}`;

    sendResetEmail(email, resetPasswordLink);

    res.status(200).json({ message: 'Password reset email sent' });
});

export default router;