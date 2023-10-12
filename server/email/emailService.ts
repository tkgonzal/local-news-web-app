import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendResetEmail = async (email: string, url: string): Promise<void> => {
    try {
        if (!process.env.EMAIL || !process.env.Pass) {
            throw new Error('Email credentials are missing');
        }

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Bay Valley Tech News - Password Reset',
            text: `You've requested that the password be reset for your account.
            To reset your password, click on the link: ${url}`,
        };

        await transporter.sendMail(mailOptions);
    }
    catch (error) {
        console.log('Error sending email:', error);
    }
}

export default sendResetEmail;