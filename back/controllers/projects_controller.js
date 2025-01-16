const projectService = require("../services/project_service");
const userService = require("../services/user_service");

createProject = async (req, res) => {
    try{
        const user_id = req.user.data.user_id;
        const project_attr = req.body;
        project_attr.manager = user_id;
        const projectDto = await projectService.createProject(project_attr);
        await userService.addRoleById(user_id, {name: "PROJECT_MANAGER", project_id: projectDto.project_id});
        return res.status(201).send(projectDto);
    } catch(err){
        console.error(err);
        return res.status(500).send({ error: "Internal Server Error" });
    }
};

getProjectDtoById = async (req, res) => {
    try{
        const projectDto = await projectService.getProjectDtoById(req.params.project_id);
        if(projectDto){
            return res.status(200).send(projectDto);
        }
        else{
            return res.status(404).send({error: "Project not found"});
        }
    } catch(err){
        console.error(err)
        return res.status(500).send({ error: "Internal Server Error" });
    }
}

getProjectDtoByName = async (req, res) => {
    try{
        const projectDto = await projectService.getProjectDtoByName(req.params.name);
        if(projectDto){
            return res.status(200).send(projectDto);
        }
        else{
            return res.status(404).send({error: "Project not found"});
        }
    } catch(err){
        console.error(err)
        return res.status(500).send({ error: "Internal Server Error" });
    }
}

getUserProjectDtos = async (req, res) => {
    try{
        const user_id = req.user.data.user_id;
        const projectDtos = await projectService.getUserProjectDtos(user_id);
        return res.status(200).send(projectDtos);
    }
    catch(err) {
        console.error(err)
        return res.status(500).send({ error: "Internal Server Error" });
    }
}


module.exports = {
    createProject,
    getProjectDtoById,
    getProjectDtoByName,
    getUserProjectDtos,
};