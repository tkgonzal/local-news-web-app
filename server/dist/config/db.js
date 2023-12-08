"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = process.env.MONGODB_URI;
let db = null;
async function connectToDatabase() {
    if (!db) {
        const client = new mongodb_1.MongoClient(uri);
        try {
            await client.connect();
            db = client.db(process.env.DB_NAME);
        }
        catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    }
    console.log('Successfully connected to MongoDB!');
    return db;
}
exports.connectToDatabase = connectToDatabase;
