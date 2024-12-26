const Task = require('../models/task_model');

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
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

updateTask = (req, res) => {
    const {task_id} = req.params;
    const {task_name, description, deadline, category} = req.body;
    res.status(200).json({ message: `Updated task id for ${task_name} equals ${task_id}`})
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