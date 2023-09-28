import express, {Express, Request, Response, Application} from "express";
import dotenv from "dotenv";

// Server Configuration
dotenv.config();

const app: Application = express();
const PORT: Number | string = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Local news web app server starting on port ${PORT}`));