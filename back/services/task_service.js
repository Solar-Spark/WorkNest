const Task = require('../models/task_model');
const TaskDto = require("../dto/task_dto")

createTask = async (task_attr) => {
    try{
        const task = new Task(task_attr);
        await task.save();
        const taskDto = new TaskDto(task); 
        return {status : 201, task : taskDto};
    }
    catch(err){
        return {status : 500, message : "Internal server error"}
    }
}
getTaskDto = async (task_id) => {
    try {
        const task = await Task.findOne({ task_id });

        if (!task) {
            return { status: 404, message: 'Task not found' };
        }

        const taskDto = new TaskDto(task);
        return { status: 200, data: taskDto };
    
    } catch (err) {
        console.error(`Error fetching task with id ${task_id}:`, err);
        return { status: 500, message: 'Internal server error' };
    }
};
getTaskDtosByUserId = async (user_id) => {
    try {
        const tasks = await Task.find({assigned_to : user_id});
        return {status : 200, tasks : tasks.map(task => new TaskDto(task))}
    } catch(err) {
        console.error(`Error fetching tasks with user id ${user_id}:`, err);
        return { status: 500, message: 'Internal server error' };
    }
};
updateTask = async (task_id, task) =>{
    try{
        const existingTask = await Task.findOne({ task_id });
        if (!existingTask) {
            return { status: 404, message: `Task with ID ${task_id} not found` };
        }
        const isUpToDate = Object.keys(task).every(
            (key) => existingTask[key] === task[key]
        );
        if (isUpToDate) {
            return { status: 304, message: `Task with ID ${task_id} is already up to date` };
        }
        const status = await Task.updateOne(
                                { task_id: task_id },
                                { $set: task }
                            ).status;
                            
        if(status.updatedCount > 0){
            return {status : 200, message : `Task with ID ${task_id} updated successfully`}
        }
        else{
            return {status : 500, message : `Failed to update task with ID ${task_id}`}
        }
    } catch(err){
        console.error(`Error updating task with id ${task_id}`);
        return { status: 500, message: 'Internal server error' };
    }     
}
deleteTask = async (task_id) => {
    try{
        const existingTask = await Task.findOne({ task_id });
        if (!existingTask) {
            return { status: 404, message: `Task with ID ${task_id} not found` };
        }
        const status = await Task.deleteOne({ task_id: task_id }).status;
                            
        if(status.deletedCount > 0){
            return {status : 200, message : `Task with ID ${task_id} deleted successfully`}
        }
        else{
            return {status : 500, message : `Failed to delete task with ID ${task_id}`}
        }
    } catch(err){
        console.error(`Error deleting task with id ${task_id}`);
        return { status: 500, message: 'Internal server error' };
    }     
}
module.exports = {
    createTask,
    getTaskDto,
    getTaskDtosByUserId,
    updateTask,
    deleteTask,
}