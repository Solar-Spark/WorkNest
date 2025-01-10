const Project = require("../models/project_model")
const ProjectDto = require("../dto/project_dto")

createProject = async (project_attr) => {
    try{
        const project = new Project(project_attr);
        await project.save();
        return {status : 201, projectDto : new ProjectDto(project)};
    }
    catch(err){
        return {status : 500, error: err.message}
    }
}

createProjects = async(projects) => {
    try{
        await Project.insertMany(projects);
        return {status: 201, message: "Projects created"}
    }
    catch(err){
        return {status : 500, message : "Internal server error"}
    }
}
module.exports = {
    createProject,
    createProjects,
}