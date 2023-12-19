import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";

import logActivity from "../utils/log.js";

import { User } from "../types/interfaces/User.js";
import { UsersResponse } from "../types/interfaces/UsersResponse.js";

// Setup
dotenv.config();

// Constants
const BASE_SERVER_URL: string = process.env.SERVER_URL;
const NOTIFICATIONS_AUTH: string = process.env.NOTIFICATIONS_AUTH;

// Utility Functions
// Retrieves all business admin users on MoNews with a 
// receivesCommentNotifications value set to true
const getUsersNeedingNotifications = async (): Promise<User[]> => {
    try {
        const usersResponse: AxiosResponse<UsersResponse> = await axios.get(
            `${BASE_SERVER_URL}/api/business/notifications/users`,
            { headers: { Authorization: `Bearer ${NOTIFICATIONS_AUTH}`}}
        );
        
        const { users } = usersResponse.data;
        return users;
    } catch (error: any) {
        console.log("Error occurred while retrieving users");
        throw error;
    }
}

// Main Function
/**
 * Sends out comment notifications to all business admin accounts on MoNews
 * who have the receviesCommentNotifications attribute set to true
 */
const sendOutCommentNotifications = async () => {
    try {
        const users: User[] = await getUsersNeedingNotifications();
    } catch (error: any) {
        logActivity(
            "Error occurred while sending out comment notifications", 
            error
        );
    }
}

export { sendOutCommentNotifications };