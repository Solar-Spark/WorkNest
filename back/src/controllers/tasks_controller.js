const taskService = require("../services/task_service")
const teamService = require("../services/team_service")
const phoneService = require("../services/phone_service")
const userService = require("../services/user_service")

createTask = async (req, res) => {
    try{
        const roles = await userService.getRolesById(req.user.data.user_id);
        if(roles.some(role => 
            (role.name === "PROJECT_MANAGER" && role.project_id === req.body.project_id) || (role.name === "TEAM_LEAD" && role.team_id === req.body.team_id))){
            const taskDto = await taskService.createTask(req.body)
            await phoneService.notifyCreateTask(taskDto);
            return res.status(201).send(taskDto);
        }
        else{
            return res.status(403).send({error: "forbidden"});
        }
    } catch(err){
        console.error(`Error creating task: ${err}`)
        return res.status(500).send({error: "Internal Server Error"});
    }
};

getTaskDtoById = async (req,res) => {
    try{
        const task_id = req.params.task_id;
        const taskDto = await taskService.getTaskById(task_id);
        if(taskDto){
            return res.status(200).send(taskDto);
        }
        else{
            return res.status(404).send({error: "Task Not Found"});
        }
    } catch(err){
        console.error(`Error getting taskDto: ${err}`)
        return res.status(500).send({error: "Internal Server Error"});
    }
}

getTaskDtosByUserId = async (req, res) => {
    try{
        const user_id = req.user.data.user_id;
        const taskDtos = await taskService.getTaskDtosByUserId(user_id);
        return res.status(200).json(taskDtos);
    } catch(err){
        console.error(`Error getting taskDtos: ${err}`)
        return res.status(500).send({error: "Internal Server Error"});
    }
};
getTaskDtosByProjectId = async (req, res) => {
    try{
        const project_id = req.params.project_id;
        const taskDtos = await taskService.getTaskDtosByProjectId(project_id);
        return res.status(200).json(taskDtos);
    } catch(err){
        console.error(`Error getting taskDtos: ${err}`)
        return res.status(500).send({error: "Internal Server Error"});
    }
};

getTaskDtosByTeamId = async (req, res) => {
    try{
        const team_id = req.params.team_id;
        const taskDtos = await taskService.getTaskDtosByTeamId(team_id);
        return res.status(200).json(taskDtos);
    } catch(err){
        console.error(`Error getting taskDtos: ${err}`)
        return res.status(500).send({error: "Internal Server Error"});
    }
};

updateTaskById = async (req, res) => {
    try{
        const task_id = parseInt(req.params.task_id);
        const { user_id } = req.user.data;
        const savedTask = await taskService.getTaskDtoById(task_id);
        const userRoles = await userService.getRolesById(user_id);
        const hasProjectManagerRole = userRoles.some((role) => role.name === "PROJECT_MANAGER" && role.project_id === savedTask.project_id);
        const hasTeamLeadRole = userRoles.some((role) => role.name === "TEAM_LEAD" && role.team_id === savedTask.team_id);
        const hasPermission = hasProjectManagerRole || hasTeamLeadRole;

        if(!hasPermission){
            return res.status(403).send({error: "forbidden"});
        }

        await taskService.updateTaskById(task_id, req.body);
        return res.status(200).json();
    } catch(err){
        switch(err.message){
            case "task_not_exists":
                return res.status(404).send({error: "Task Not Found"});
            case "task_is_up_to_date":
                return res.status(304).send({error: "Task Is Up-To-Date"});
            default:
                console.error(`Error getting taskDtos: ${err}`)
                return res.status(500).send({error: "Internal Server Error"});
        }
    }
};

deleteTaskById = async (req, res) => {
    try{
        const user_id = req.user.data.user_id;
        const task_id = parseInt(req.params.task_id);
        const taskDto = await taskService.getTaskDtoById(task_id);
        
        const { team_id, project_id } = taskDto;

        const userRoles = await userService.getRolesById(user_id);
        const hasProjectManagerRole = userRoles.some((role) => role.name === "PROJECT_MANAGER" && role.project_id === project_id);
        const hasTeamLeadRole = userRoles.some((role) => role.name === "TEAM_LEAD" && role.team_id === team_id);
        const hasPermission = hasProjectManagerRole || hasTeamLeadRole;
        if (hasPermission) {
            await taskService.deleteTaskById(task_id);
            return res.status(200).send();
        }
        else {
            return res.status(403).send({ error: "forbidden" });
        }
    } catch(err){
        switch(err.message){
            case "task_not_exists":
                return res.status(404).send({error: "Task Not Found"});
            default:
                console.error(`Error deleting taskDtos: ${err}`)
                return res.status(500).send({error: "Internal Server Error"});
        }
    }
};

module.exports = {
    createTask,
    updateTaskById,
    deleteTaskById,
    getTaskDtosByUserId,
    getTaskDtosByProjectId,
    getTaskDtosByTeamId,
    getTaskDtoById,
}