import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import { AuthRoutes } from './modules/auth/auth.routes';
import { UserRoutes } from './modules/user/user.routes';

dotenv.config({ path: './.env' });

const app = express();
const port = process.env.PORT || 8001;

mongoose.connect(process.env.DB_URI!);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => { res.redirect('/api') });
app.get('/api', (req, res) => { res.send('Challenge para Gravitad') });

const authRoutes = new AuthRoutes();
app.use('/api', authRoutes.router);
const userRoutes = new UserRoutes();
app.use('/api', userRoutes.router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});