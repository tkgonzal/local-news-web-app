import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import loginRoute, { authenticateToken } from './routes/authRoute';
import userRoutes from './routes/userRoute';
import passwordResetRoute from './routes/passwordResetRoute';
import confirmResetPassword from './routes/confirmResetPassword';
import businessRoute from "./routes/business";
import articleRoute from './routes/articleRoute';
import articlesRoute from './routes/articlesRoute';
import subscriptionsRoute from "./routes/subscription";

dotenv.config();

const app: Application = express();
const PORT: Number | string = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
  
app.get("/", (req, res) => {
    res.status(200).json({
        message: "MoNews Server is Running"
    });
});

// Login/Authentication Endpoints
app.use('/api/auth', loginRoute);
app.use('/api/request-password-reset', passwordResetRoute);
app.use('/api/confirm-password-reset', confirmResetPassword);
// User Endpoints
app.use('/api/users', userRoutes);
// Business Endpoints
app.use("/api/business", authenticateToken, businessRoute);
// Article endpoints
app.use('/api/article', articleRoute);
app.use('/api/articles', articlesRoute);
// Subscriptions endpoints
app.use("/api/subscriptions", authenticateToken, subscriptionsRoute);

app.listen(PORT, () => {
    console.log(`Local news web app server starting on port ${PORT}`);
});

// Added for vercel hosting
export default app;