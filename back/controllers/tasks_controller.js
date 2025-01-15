const taskService = require("../services/task_service")
const phoneService = require("../services/phone_service")
const userService = require("../services/user_service")

createTask = async (req, res) => {
    try{
        const roles = await userService.getRolesById(req.user.data.user_id);
        
        if(roles.some(role => 
            role.name === "PROJECT_MANAGER" && role.project_id === req.body.project_id)){
            const taskDto = await taskService.createTask(req.body)
            res.status(201).send(taskDto);
            phoneService.notifyCreateTask(taskDto);
        }
        else{
            res.status(403).send({error: "forbidden"});
        }
    } catch(err){
        res.status(500).send({error: "Internal Server Error"});
        console.error(`Error creating task: ${err}`)
    }
};

getTaskDtoById = async (req,res) => {
    try{
        const task_id = req.params.task_id;
        const taskDto = await taskService.getTaskById(task_id);
        if(taskDto){
            res.status(200).send(taskDto);
        }
        else{
            res.status(404).send({error: "Task Not Found"});
        }
    } catch(err){
        res.status(500).send({error: "Internal Server Error"});
        console.error(`Error getting taskDto: ${err}`)
    }
}

getTaskDtosByUserId = async (req, res) => {
    try{
        const user_id = req.user.data.user_id;
        const taskDtos = await taskService.getTaskDtosByUserId(user_id);
        res.status(200).json(taskDtos);
    } catch(err){
        res.status(500).send({error: "Internal Server Error"});
        console.error(`Error getting taskDtos: ${err}`)
    }
};
getTaskDtosByProjectId = async (req, res) => {
    try{
        const project_id = req.params.project_id;
        const taskDtos = await taskService.getTaskDtosByProjectId(project_id);
        res.status(200).json(taskDtos);
    } catch(err){
        res.status(500).send({error: "Internal Server Error"});
        console.error(`Error getting taskDtos: ${err}`)
    }
};

updateTaskById = async (req, res) => {
    try{
        const { task_id } = req.params;
        const taskDto = await taskService.updateTaskById(task_id, req.body);
        res.status(200).json({ taskDto });
    } catch(err){
        switch(err.message){
            case "task_not_exists":
                res.status(404).send({error: "Task Not Found"});
                break;
            case "task_is_up_to_date":
                res.status(304).send({error: "Task Is Up-To-Date"});
                break;
            default:
                res.status(500).send({error: "Internal Server Error"});
                console.error(`Error getting taskDtos: ${err}`)
        }
    }
};

deleteTaskById = async (req, res) => {
    try{
        await taskService.deleteTaskById(req.params.task_id);
        res.status(200).send();
    } catch(err){
        switch(err.message){
            case "task_not_exists":
                res.status(404).send({error: "Task Not Found"});
                break;
            default:
                res.status(500).send({error: "Internal Server Error"});
                console.error(`Error getting taskDtos: ${err}`)
        }
    }

};

module.exports = {
    createTask,
    updateTaskById,
    deleteTaskById,
    getTaskDtosByUserId,
    getTaskDtosByProjectId,
    getTaskDtoById,
}