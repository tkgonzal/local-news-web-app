import express, { Express, Request, Response, NextFunction, Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import loginRoute, { authenticateToken } from './routes/authRoute';
import userRoutes from './routes/userRoute';
import passwordResetRoute from './routes/passwordResetRoute';
import confirmResetPassword from './routes/confirmResetPassword';
import businessRoute from "./routes/business";
import articleRoute from './routes/articleRoute'
import articlesRoute from './routes/articlesRoute'


dotenv.config();

const app: Application = express();
const PORT: Number | string = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
  
app.get('/', (req: Request, res: Response) => {
    res.send('API is running SMOOOOOTHLY');
});

// Login/Authentication Endpoints
app.use('/api/auth', loginRoute);
app.use('/api/users', userRoutes);
app.use('/api/request-password-reset', passwordResetRoute);
app.use('/api/confirm-password-reset', confirmResetPassword);
// Business Endpoints
app.use("/api/business", authenticateToken, businessRoute);
app.use('/api/article', articleRoute);
app.use('/api/articles', articlesRoute);


app.listen(PORT, () => {
    console.log(`Local news web app server starting on port ${PORT}`)
});