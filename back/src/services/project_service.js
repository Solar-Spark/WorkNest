const Project = require("../models/project_model")
const ProjectDto = require("../dto/project_dto")

createProject = async (project_attr) => {
    const project = new Project(project_attr);
    await project.save();
    return await ProjectDto.create(project);
}

getProjectsByIds = async (ids) =>{
    const projects = await Project.find({ project_id: { $in: ids } });
    return projects;
}

getProjectDtosByIds = async (ids) =>{
    const projects = await getProjectsByIds(ids);
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
deleteProjectById = async (project_id) => {
    const existingProject = await getProjectById(project_id);
    if (!existingProject) {
        throw new Error("project_not_exists");
    }
    return await Project.deleteOne({ project_id: project_id });
}
module.exports = {
    createProject,
    getProjectsByIds,
    getProjectDtosByIds,
    getProjectById,
    getProjectDtoById,
    getProjectByName,
    getProjectDtoByName,
    deleteProjectById,
}