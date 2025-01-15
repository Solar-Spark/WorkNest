const Team = require("../models/team_model")
const TeamDto = require("../dto/team_dto")

createTeam = async (team_attr) => {
    const team = new Team(team_attr);
    await team.save();
    return new TeamDto(team);
}

module.exports = {
    createTeam,
}