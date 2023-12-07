"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const emailService_1 = __importDefault(require("../email/emailService"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
const secretKey = process.env.JWT_SECRET;
router.post('/send-request-link', async (req, res) => {
    const { email } = req.body;
    const user = await (0, User_1.getUserByEmail)(email);
    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }
    const token = jsonwebtoken_1.default.sign({ email }, secretKey, { expiresIn: '1h' });
    const resetPasswordLink = `${process.env.CLIENT_URL}/confirm-reset-password?token=${token}`;
    (0, emailService_1.default)(email, resetPasswordLink);
    res.status(200).json({ message: 'Password reset email sent' });
});
exports.default = router;
