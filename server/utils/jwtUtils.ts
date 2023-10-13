import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET as string;


const verifyToken = (token: string): string | null => {
    try {
        const decoded = jwt.verify(token, secretKey) as { email: string } | null;
        if (decoded && 'email' in decoded) {
            return decoded.email;
        }
    }
    catch (error) {
        return null;
    }
    return null;
}

const verifyTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        (req as any).decoded = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token. Please provide a valid token' });
    }
}

export { verifyToken, verifyTokenMiddleware }