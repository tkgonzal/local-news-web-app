import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Setup
dotenv.config();

// Constants
const MAILER_EMAIL: string = process.env.MAILER_EMAIL;
const MAILER_CREDENTIALS: string = process.env.MAILER_PASS;

// Given an email to send to, a header to use as the email subject, and a body
// for the text of the email
const sendEmail = async (email: string, header: string, body: string) => {
    try {
        const transport = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: MAILER_EMAIL,
                pass: MAILER_CREDENTIALS
            }
        });

        const mailOptions = {
            from: MAILER_EMAIL,
            to: email,
            subject: header,
            text: body
        };

        await transport.sendMail(mailOptions);
    } catch (error: any) {
        console.log("An error occurred while trying to send email", error);
        throw error;
    }
}

export { sendEmail };