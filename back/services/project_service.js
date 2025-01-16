const Project = require("../models/project_model")
const ProjectDto = require("../dto/project_dto")
const userService = require("../services/user_service")

createProject = async (project_attr) => {
    const project = new Project(project_attr);
    await project.save();
    return await ProjectDto.create(project);
}

getUserProjects = async (user_id) =>{
    const user = await userService.getUserById(user_id);
    const projectIds = [];
    user.roles.forEach(role => {
        if(role.name === "PROJECT_MANAGER"){
            projectIds.push(role.project_id);
        }
    });
    const projects = await Project.find({ project_id: { $in: projectIds } });
    return projects;
}

getUserProjectDtos = async (user_id) =>{
    const projects = await getUserProjects(user_id);
    if(projects.length === 0){
        return [];
    }
    return await Promise.all(projects.map(project => ProjectDto.create(project)));
}

getProjectById = async (project_id) => {
    return await Project.findOne({ project_id });
}
getProjectDtoById = async (project_id) => {
    const project = await getProjectById(project_id);
    if(!project){
        return null;
    }
    return await ProjectDto.create(project);
}
getProjectByName = async (name) => {
    return await Project.findOne({ name });
}
getProjectDtoByName = async (name) => {
    const project = await getProjectByName(name);
    if(!project){
        return null;
    }
    return await ProjectDto.create(project);
}

module.exports = {
    createProject,
    getUserProjects,
    getUserProjectDtos,
    getProjectById,
    getProjectDtoById,
    getProjectByName,
    getProjectDtoByName
}