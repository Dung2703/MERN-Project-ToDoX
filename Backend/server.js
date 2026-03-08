import express, { request } from 'express';

const app = express();

app.listen(5001, () => {
    console.log('Server is running on port 5001');
});

app.get("/api/task", (request, response) => {
    response.send("task to do");
});