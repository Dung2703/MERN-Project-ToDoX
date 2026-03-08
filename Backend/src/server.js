import express, { request } from 'express';

const app = express();

app.listen(5001, () => {
    console.log('Server is running on port 5001');
});

app.get("/api/task", (request, response) => {
    response.status(200).send("50 task to do");
});

app.post("/api/task", (request, response) => {
    response.status(201).json({ message: "Task created successfully" });
});

app.put("/api/task/:id", (request, response) => {
    response.status(200).json({ message: "Task updated successfully" });
});

app.delete("/api/task/:id", (request, response) => {
    response.status(200).json({ message: "Task deleted successfully" });
});