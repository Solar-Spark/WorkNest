class TeamDto {
    constructor(team) {
        this.team_id = team.team_id;
        this.name = team.name;
        this.project_id = team.project_id;
        this.members = team.members;
        this.created_at = team.created_at;
    }
}

module.exports = TeamDto;