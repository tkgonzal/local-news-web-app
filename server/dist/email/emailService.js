"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sendResetEmail = async (email, url) => {
    try {
        if (!process.env.EMAIL || !process.env.Pass) {
            throw new Error('Email credentials are missing');
        }
        const transporter = nodemailer_1.default.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'MoNews - Password Reset',
            text: `You've requested that the password be reset for your account.
            To reset your password, click on the link: ${url}`,
        };
        await transporter.sendMail(mailOptions);
    }
    catch (error) {
        console.log('Error sending email:', error);
    }
};
exports.default = sendResetEmail;
