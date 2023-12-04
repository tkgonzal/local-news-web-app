import pkg from "twilio";
import dotenv from "dotenv";
// Setup
dotenv.config();
const { Twilio } = pkg;
// Constants
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const SMS_NUMBER = process.env.TWILIO_NUMBER;
const client = new Twilio(ACCOUNT_SID, AUTH_TOKEN);
// Given a number, a header for the text, and a body for the text, sends 
// the header and body to the number
// [IMPORTANT]: number must be in format XXXXXXXXXX where X is a digit
const sendText = async (number, header, body) => {
    try {
        await client.messages.create({
            from: SMS_NUMBER,
            // Recipient's number must be in aforementioned format due to 
            // string literal formatting here
            to: `+1${number}`,
            body: `${header}\n${body}`
        });
    }
    catch (error) {
        console.log("An error occurred while sending text", error);
    }
};
export { sendText };
//# sourceMappingURL=phone.js.map