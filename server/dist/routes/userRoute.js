"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongodb_1 = require("mongodb");
const User_1 = require("../models/User");
const authRoute_1 = require("./authRoute");
const Permission_1 = __importDefault(require("../types/enums/Permission"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
const secretKey = process.env.JWT_SECRET;
// Retrieves the information of a user of a given id
router.get("/id/:userId", authRoute_1.authenticateToken, async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await (0, User_1.getUserById)(userId);
        if (user) {
            res.status(200).json({
                message: "User succesfully retrieved",
                userById: { ...user, password: undefined }
            });
        }
        else {
            res.status(201).json({
                message: `No user for id ${userId} found`,
                userById: null
            });
        }
    }
    catch (error) {
        console.log("Error occurred while retrieving user", error);
        res.status(500).json({
            message: "Internal Server Error Occurred while retrieving user",
            error
        });
    }
});
// Registers users to the app
router.post('/register', async (req, res) => {
    try {
        const { userData } = req.body;
        const userExists = await (0, User_1.getUserByEmail)(userData.email);
        if (userExists) {
            return res.status(400).json({ message: 'Email address already exists' });
        }
        const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
        const newUser = {
            name: {
                first: "",
                last: "",
            },
            email: userData.email,
            password: hashedPassword,
            phone: userData.mobileNumber,
            accType: userData.accType,
            businessId: undefined,
            businessName: userData.businessName,
            businessWebsite: userData.businessWebsite,
            articlePermissions: userData.accType === "Business" ?
                Permission_1.default.DELETE : Permission_1.default.READ_ONLY,
            userPermissions: userData.accType === "Business" ?
                Permission_1.default.DELETE : Permission_1.default.READ_ONLY,
            hasDisabledLogin: false,
            receivesCommentNotifications: false
        };
        const createdUser = await (0, User_1.createUser)(newUser);
        const userWithoutPassword = { ...createdUser, password: undefined };
        const accessToken = jsonwebtoken_1.default.sign({ username: userWithoutPassword.email }, secretKey, { expiresIn: "3h" });
        res.status(201).json({ userWithoutPassword, accessToken });
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
});
// Endpoint to retrieve a user by their email
router.post("/email", authRoute_1.authenticateToken, async (req, res) => {
    try {
        const { email } = req.body;
        const userByEmail = await (0, User_1.getUserByEmail)(email);
        if (userByEmail) {
            res.status(200).json({
                message: `User for email ${email} found`,
                userByEmail: { ...userByEmail, password: undefined }
            });
        }
        else {
            res.status(201).json({
                message: `No user for email ${email} found`,
                data: null
            });
        }
    }
    catch (error) {
        console.log("Error finding user by email");
        res.json({
            status: 500,
            message: "Internal Server Error"
        });
    }
});
// Endpoint to update a user's (found based on _id) values
router.put("/id/:userId", authRoute_1.authenticateToken, async (req, res) => {
    try {
        const { userId } = req.params;
        const { userValues } = req.body;
        // Converts businessId to an ObjectId for the puprposes of the update
        // function
        const filteredValuesToUpdate = {
            ...userValues,
            businessId: userValues["businessId"] ?
                new mongodb_1.ObjectId(userValues["businessId"]) : undefined
        };
        (0, User_1.updateUserMembersById)(userId, filteredValuesToUpdate);
    }
    catch (error) {
        console.log(`Error updating user by id`);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.default = router;
