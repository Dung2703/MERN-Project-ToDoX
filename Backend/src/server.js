import express, { request } from 'express';
import taskRoute from './route/taskRoute.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5001;


const app = express();

app.use("/api/task", taskRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

