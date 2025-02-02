const Task = require('../models/task_model');
const TaskDto = require("../dto/task_dto")

createTask = async (task_attr) => {
    const task = new Task(task_attr);
    await task.save();
    return new TaskDto(task); 
};

getTaskById = async (task_id) => { 
    return await Task.findOne({task_id : task_id});
};

getTaskDtoById = async (task_id) => {
    const task = await getTaskById(task_id);
    if(!task){
        return null;
    }
    return new TaskDto(task);
};

getTasksById = async (task_id) => { 
    return await Task.find({task_id : task_id});
};

getTaskDtosById = async (task_id) => {
    const tasks = await getTasksById(task_id);
    if(tasks.length === 0){
        return [];
    }
    return tasks.map(task => new TaskDto(task));
};

getTasksByUserId = async (user_id) => { 
    return await Task.find({assigned_to : user_id});
};

getTaskDtosByUserId = async (user_id) => {
    const tasks = await getTasksByUserId(user_id);
    if(tasks.length === 0){
        return [];
    }
    return tasks.map(task => new TaskDto(task));
};

getTasksByProjectId = async (project_id) => { 
    return await Task.find({project_id: project_id});
};

getTaskDtosByProjectId = async (project_id) => {
    const tasks = await getTasksByProjectId(project_id);
    if(tasks.length === 0){
        return [];
    }
    return tasks.map(task => new TaskDto(task));
};

getTasksByTeamId = async (team_id) => { 
    return await Task.find({team_id: team_id});
};

getTaskDtosByTeamId = async (team_id) => {
    const tasks = await getTasksByTeamId(team_id);
    if(tasks.length === 0){
        return [];
    }
    return tasks.map(task => new TaskDto(task));
};

updateTaskById = async (task_id, task) => {
    const existingTask = await getTaskById(task_id);
    if (!existingTask) {
        throw new Error("task_not_exists");
    }
    const isUpToDate = Object.keys(task).every(
        (key) => existingTask[key] === task[key]
    );
    if (isUpToDate) {
        throw new Error("task_is_up_to_date");
    }
    await Task.updateOne({ task_id: task_id }, { $set: task });                      
};

deleteTaskById = async (task_id) => {
    const existingTask = await getTaskById(task_id);
    if (!existingTask) {
        throw new Error("task_not_exists");
    }
    return await Task.deleteOne({ task_id: task_id });
};
deleteTasksByProjectId = async (project_id) => {
    return await Task.deleteMany({ project_id: project_id });
};
deleteTasksByTeamId = async (team_id) => {
    return await Task.deleteMany({ team_id: team_id });
};

getProjectTasksCountByStatus = async (project_id, status) => {
    return await Task.countDocuments({project_id: project_id, status: status});
}

getProjectTasksCountByPriority = async (project_id, priority) => {
    return await Task.countDocuments({project_id: project_id, priority: priority});
}

getProjectTasksCountByTeamId = async (project_id, team_id) => {
    return await Task.countDocuments({project_id: project_id, team_id: team_id});
}

getProjectTasksCountByProjectId = async (project_id) => {
    return await Task.countDocuments({project_id: project_id});
}

getTeamTasksCountByStatus = async (team_id, status) => {
    return await Task.countDocuments({team_id: team_id, status: status});
}

getTeamTasksCountByPriority = async (team_id, priority) => {
    return await Task.countDocuments({team_id: team_id, priority: priority});
}

getTeamTasksCountByTeamId = async (team_id) => {
    return await Task.countDocuments({team_id: team_id});
}

module.exports = {
    createTask,
    getTaskById,
    getTaskDtoById,
    getTasksById,
    getTaskDtosById,
    getTasksByUserId,
    getTaskDtosByUserId,
    getTasksByProjectId,
    getTaskDtosByProjectId,
    getTasksByTeamId,
    getTaskDtosByTeamId,
    updateTaskById,
    deleteTaskById,
    deleteTasksByProjectId,
    deleteTasksByTeamId,
    getProjectTasksCountByStatus,
    getProjectTasksCountByPriority,
    getProjectTasksCountByTeamId,
    getProjectTasksCountByProjectId,
    getTeamTasksCountByStatus,
    getTeamTasksCountByPriority,
    getTeamTasksCountByTeamId,
};