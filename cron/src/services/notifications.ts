import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";

import logActivity from "../utils/log.js";

import { User } from "../types/interfaces/User.js";
import { UsersResponse } from "../types/interfaces/UsersResponse.js";

import { Article } from "../types/interfaces/Article.js";
import { CommentsResponse } from "../types/interfaces/CommentsResponse.js";

import { sendEmail } from "../utils/email.js";

// Setup
dotenv.config();

// Constants
const BASE_SERVER_URL: string = process.env.SERVER_URL;
const BASE_CLIENT_URL: string = process.env.CLIENT_URL;
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

// Retrieves the comments to notify a business admin about based on a given
// businessId (meant to be the id of the user)
const getArticleComments = async (businessId: string) => {
    try {
        const commentsResponse: AxiosResponse<CommentsResponse> = await axios.get(
            `${BASE_SERVER_URL}/api/business/notifications/${businessId}`,
            { headers: { Authorization: `Bearer ${NOTIFICATIONS_AUTH}`}}
        );

        const { articleComments } = commentsResponse.data;
        return articleComments;
    } catch (error: any) {
        console.log("Error occurred while retrieving article comments");
        throw error;
    }
}

// Given an articles and its comments posted in the last day, returns a string
// to be put into an email denoting all new comments for that article in the last
// day
const formatArticleCommentsSection = (article: Article): string => {
    let commentsSection = `${article.heading} (${BASE_CLIENT_URL}/article/${article._id})\n`;

    for (const comment of article.comments) {
        commentsSection += `• "${comment.message}" - ${comment.userName}\n`;
    }

    commentsSection += "\n";

    return commentsSection;
}

// Given a business admin user, retrieves all articles with new comments
// posted within the last day and sends an email notifying them of all new 
// comments posted
const sendOutNotificationsForUser = async (user: User) => {
    try {
        const articleComments = await getArticleComments(user._id);

        let emailBody = ""

        for (const articleComment of articleComments) {
            emailBody += formatArticleCommentsSection(articleComment);
        }

        if (!emailBody) {
            emailBody = "No comments posted to articles in the past day";
        }

        sendEmail(
            user.email, 
            `MoNews - Comment Notifications for ${(new Date()).toDateString()}`,
            emailBody
        );
    } catch (error: any) {
        console.log("Error occurred while sending out notifications");
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

        for (const user of users) {
            sendOutNotificationsForUser(user)
        }
    } catch (error: any) {
        logActivity(
            "Error occurred while sending out comment notifications", 
            error
        );
    }
}

export { sendOutCommentNotifications };