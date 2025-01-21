const { getUserDtoById } = require("../services/user_service");

class TeamDto {
    constructor(team, lead) {
        this.team_id = team.team_id;
        this.name = team.name;
        this.project_id = team.project_id;
        this.members = team.members;
        this.lead = lead;
        this.created_at = team.created_at;
    }

    static async create(team) {
        const userDto = await getUserDtoById(team.lead);
        return new TeamDto(team, userDto);
    }
}

module.exports = TeamDto;