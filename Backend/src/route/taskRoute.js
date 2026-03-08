import express from 'express';

const router = express.Router();

export default router;

router.get("/", (request, response) => {
    response.status(200).send("100 task to do");
});

router.post("/", (request, response) => {
    response.status(201).json({ message: "Task created successfully" });
});

router.put("/:id", (request, response) => {
    response.status(200).json({ message: "Task updated successfully" });
});

router.delete("/:id", (request, response) => {
    response.status(200).json({ message: "Task deleted successfully" });
});