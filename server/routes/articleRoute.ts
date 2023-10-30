import express from "express";
import { createUser, getUserByEmail, User } from "../models/User";
require('dotenv').config();

const router = express.Router();

router.get('/', async (req, res) => {
    res.status(400).json({ message: 'Specify an article with api/article/:uid or use api/articles' })
})

router.get('/:uid', async (req, res) => {
    
})

router.post('/:uid', async (req, res) => {

})

export default router;