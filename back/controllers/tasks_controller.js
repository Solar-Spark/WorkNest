const Task = require('../models/task_model');
const TaskDto = require("../dto/task_dto")

createTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).send(task);
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: err.message });
    }
};

getTask = async (req, res) => {
    try {
        const task = await Task.findOne({ task_id : req.params.task_id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(new TaskDto(task));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

updateTask = async (req, res) => {
    const { task_id } = req.params;

    try {
        const result = await Task.updateOne(
            { task_id: task_id },
            { $set: req.body }
        );
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Task not found or no changes made" });
        }
        res.status(200).json({ message: "Task updated successfully", result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};

deleteTask = (req, res) => {
    const {task_id} = req.params;
    res.status(200).json({ message: `Task with id ${task_id} deleted`})
};

module.exports = {
    createTask,
    getTask,
    updateTask,
    deleteTask
}