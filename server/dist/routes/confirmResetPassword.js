"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const jwtUtils_1 = require("../utils/jwtUtils");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
router.post('/reset', jwtUtils_1.verifyTokenMiddleware, async (req, res) => {
    try {
        const { newPassword } = req.body;
        const token = req.headers.authorization;
        const userEmail = (0, jwtUtils_1.verifyToken)(token);
        const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
        if (userEmail) {
            (0, User_1.updateUserPassword)(userEmail, hashedPassword);
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
exports.default = router;
