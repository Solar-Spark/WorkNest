const Task = require('../models/task_model');
const TaskDto = require("../dto/task_dto")
const taskService = require("../services/task_service")
const phoneService = require("../services/phone_service")

createTask = async (req, res) => {
    const task = await taskService.createTask(req.body)
    if(task.status === 201){
        res.status(201).send(task.task);
        phoneService.notifyCreateTask(task.task)
    }
    else if (task.status === 500){
        res.status(500).send({ message: task.message });
    }
};

getTask = async (req, res) => {
    const { status, data, message } = await taskService.getTaskDto(req.params.task_id);

    if (status === 404) {
        return res.status(404).json({ message });
    } else if (status === 500) {
        return res.status(500).json({ message: message });
    }

    return res.status(200).json(data);
};

getTasksByUserId = async (req, res) => {
    const taskDtos = await taskService.getTaskDtosByUserId(req.params.user_id);
    if(taskDtos.status === 200){
        res.status(200).json(taskDtos.tasks);
    }
    else if(taskDtos.status === 500){
        res.status(500).json({message : taskDtos.message})
    }
};

updateTask = async (req, res) => {
    const { task_id } = req.params;
    const result = await this.updateTask(task_id, req.body);
    res.status(result.status).json({ message: result.message });
};

deleteTask = async (req, res) => {
    const {task_id} = req.params;
    const result = await taskService.deleteTask(task_id);
    res.status(result.status).json({ message: result.message });
};

module.exports = {
    createTask,
    getTask,
    updateTask,
    deleteTask,
    getTasksByUserId,
}