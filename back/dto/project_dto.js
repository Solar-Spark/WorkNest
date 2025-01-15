const { getUserDtoById } = require("../services/user_service");

class ProjectDto {
    constructor(project, userDto) {
        this.project_id = project.project_id;
        this.name = project.name;
        this.description = project.description;
        this.created_by = userDto;
        this.created_at = project.created_at;
    }

    static async create(project) {
        const userDto = await getUserDtoById(project.created_by);
        return new ProjectDto(project, userDto);
    }
}

module.exports = ProjectDto;