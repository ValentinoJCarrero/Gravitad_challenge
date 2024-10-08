import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
dotenv.config({ path: './.env' });

const app = express();
const port = process.env.PORT || 8001;

mongoose.connect(process.env.DB_URI!);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});