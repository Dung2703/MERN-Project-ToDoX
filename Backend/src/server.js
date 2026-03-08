import express, { request } from 'express';
import taskRoute from './route/taskRoute.js';

const app = express();

app.use("/api/task", taskRoute);

app.listen(5001, () => {
    console.log('Server is running on port 5001');
});

