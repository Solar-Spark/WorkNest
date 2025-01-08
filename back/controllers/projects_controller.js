const projectService = require("../services/project_service")

createProject = async (req, res) => {
    const project = await projectService.createProject(req.body)
    if(project.status === 201){
        res.status(201).send(project.project);
    }
    else if (project.status === 500){
        res.status(500).send({ message: project.message });
    }
};

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