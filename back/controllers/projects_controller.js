const projectService = require("../services/project_service")

createProject = async (req, res) => {
    const result = await projectService.createProject(req.body)
    if(result.status === 201){
        res.status(201).send(result.projectDto);
    }
    else if (result.status === 500){
        res.status(500).send({ error: "Internal Server Error" });
        console.error(result.error);
    }
};

getProjectById = async (req, res) => {
    const result = await projectService.getProjectById(req.params.project_id);

    if (result.status == 200){
        res.status(200).send({project: result.projectDto});
    }
    else if (result.status === 404) {
        res.status(404).send({error: result.error});
    } else if (result.status === 500) {
        res.status(500).send({ error: "Internal Server Error" });
        console.error(result.error)
    }
}

getProjectByName = async (req, res) => {
    const result = await projectService.getProjectByName(req.body.project_name);

    if (result.status == 200){
        res.status(200).send({project: result.projectDto});
    }
    else if (result.status === 404) {
        res.status(404).send({error: result.error});
    } else if (result.status === 500) {
        res.status(500).send({ error: "Internal Server Error" });
        console.error(result.error)
    }
}
getUserProjects = async (req, res) => {
    const result = await projectService.getUserProjects(req.params.project_id);
    
    if (result.status == 200){
        res.status(200).send({project: result.projectDto});
    }
    else if (result.status === 404) {
        res.status(404).send({error: result.error});
    } else if (result.status === 500) {
        res.status(500).send({ error: "Internal Server Error" });
        console.error(result.error)
    }
}

createProjects = async (req, res) => {
    const project = await projectService.createProjects(req.body)
    if(project.status === 201){
        res.status(201).send(project.message);
    }
    else if (project.status === 500){
        res.status(500).send({ message: project.message });
    }
};

module.exports = {
    createProject,
    createProjects,
}