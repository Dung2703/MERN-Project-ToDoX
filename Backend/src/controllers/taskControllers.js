export const getAllTasks = (request, response) => {
    response.status(200).send("50 task to do");
};

export const createTask = (request, response) => {
    response.status(201).json({ message: "Task created successfully" });
};

export const updateTask = (request, response) => {
    response.status(200).json({ message: "Task updated successfully" });
};

export const deleteTask = (request, response) => {
    response.status(200).json({ message: "Task deleted successfully" });
};