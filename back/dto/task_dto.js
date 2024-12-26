class TaskDto {
    constructor(task) {
        this.task_id = task.task_id;
        this.name = task.name;
        this.description = task.description;
        this.status = task.status;
        this.priority = task.priority;
        this.deadline = task.deadline;
        this.assigned_to = task.assigned_to;
        this.team_id = task.team_id;
        this.created_at = task.created_at;
    }
}

module.exports = TaskDto;