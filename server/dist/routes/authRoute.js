"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
const secretKey = process.env.JWT_SECRET;
// Middleware
// Middleware to authenticate an access token given with a request
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.json({
            status: 401,
            message: "No access token given, please login"
        });
    }
    jsonwebtoken_1.default.verify(token, secretKey, (err) => {
        if (err) {
            return res.json({
                status: 403,
                message: "Invalid access token given"
            });
        }
        next();
    });
};
exports.authenticateToken = authenticateToken;
// Endpoints
// Endpoint to log user in
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await (0, User_1.getUserByEmail)(email);
        if (!user) {
            return res.status(400).json({ message: 'Email address does not exist' });
        }
        if (user.hasDisabledLogin) {
            return res.status(401).json({
                message: "Your login has been disabled. Please contact the system administrator"
            });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({ message: 'Incorrect Password' });
        }
        const accessToken = jsonwebtoken_1.default.sign({ username: user.email }, secretKey, { expiresIn: "3h" });
        const userWithoutPassword = { ...user, password: undefined };
        res.json({ accessToken, userWithoutPassword });
    }
    catch (error) {
        console.log('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.default = router;
