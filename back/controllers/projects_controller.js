const projectService = require("../services/project_service");
const userService = require("../services/user_service");

createProject = async (req, res) => {
    try{
        const user_id = req.user.data.user_id;
        const project_attr = req.body;
        project_attr.created_by = user_id;
        const projectDto = await projectService.createProject(project_attr);
        await userService.addRoleById(user_id, {name: "PROJECT_MANAGER", project_id: projectDto.project_id});
        res.status(201).send(projectDto);
    } catch(err){
        console.error(err);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

getProjectDtoById = async (req, res) => {
    try{
        const projectDto = await projectService.getProjectDtoById(req.params.project_id);
        if(projectDto){
            res.status(200).send(projectDto);
        }
        else{
            res.status(404).send({error: "Project not found"});
        }
    } catch(err){
        res.status(500).send({ error: "Internal Server Error" });
        console.error(err)
    }
}

getProjectDtoByName = async (req, res) => {
    try{
        const projectDto = await projectService.getProjectDtoByName(req.params.name);
        if(projectDto){
            res.status(200).send(projectDto);
        }
        else{
            res.status(404).send({error: "Project not found"});
        }
    } catch(err){
        res.status(500).send({ error: "Internal Server Error" });
        console.error(err)
    }
}

getUserProjectDtos = async (req, res) => {
    try{
        const user_id = req.user.data.user_id;
        const projectDtos = await projectService.getUserProjectDtos(user_id);
        res.status(200).send(projectDtos);
    }
    catch(err) {
        res.status(500).send({ error: "Internal Server Error" });
        console.error(err)
    }
}


module.exports = {
    createProject,
    getProjectDtoById,
    getProjectDtoByName,
    getUserProjectDtos,
};