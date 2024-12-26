class ProjectDto {
    constructor(project) {
        this.project_id = project.project_id;
        this.name = project.name;
        this.description = project.description;
        this.created_by = project.created_by;
        this.created_at = project.created_at;
    }
}

module.exports = ProjectDto;