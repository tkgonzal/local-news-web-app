import express, { Express, Request, Response, NextFunction, Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import loginRoute from './routes/authRoute';
import userRoutes from './routes/userRoute';
import passwordResetRoute from './routes/passwordResetRoute';
import confirmResetPassword from './routes/confirmResetPassword';
import articleRoute from './routes/articleRoute'

dotenv.config();

const app: Application = express();
const PORT: Number | string = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
  
app.get('/', (req: Request, res: Response) => {
    res.send('API is running SMOOOOOTHLY');
});

app.use('/api/auth', loginRoute);
app.use('/api/users', userRoutes);
app.use('/api/request-password-reset', passwordResetRoute);
app.use('/api/confirm-password-reset', confirmResetPassword);
app.use('/api/article', articleRoute);


app.listen(PORT, () => {
    console.log(`Local news web app server starting on port ${PORT}`)
});