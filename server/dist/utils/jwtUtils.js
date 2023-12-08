"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenMiddleware = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = process.env.JWT_SECRET;
const verifyToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        if (decoded && 'email' in decoded) {
            return decoded.email;
        }
    }
    catch (error) {
        return null;
    }
    return null;
};
exports.verifyToken = verifyToken;
const verifyTokenMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        req.decoded = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token. Please provide a valid token' });
    }
};
exports.verifyTokenMiddleware = verifyTokenMiddleware;
