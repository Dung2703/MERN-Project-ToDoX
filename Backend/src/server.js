import express, { request } from 'express';
import taskRoute from './route/taskRoute.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();



const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.json());

app.use("/api/task", taskRoute);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});


