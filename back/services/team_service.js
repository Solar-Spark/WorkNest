const Team = require("../models/team_model")
const TeamDto = require("../dto/team_dto")

createTeam = async (team_attr) => {
    try{
        const team = new Team(team_attr);
        await team.save();
        return {status : 201, teamDto : new TeamDto(team) };
    }
    catch(err){
        return {status : 500, error : err.message}
    }
}

createTeams = async(teams) => {
    try{
        await Team.insertMany(teams);
        return {status: 201, message: "Teams created"}
    }
    catch(err){
        return {status : 500, message : "Internal server error"}
    }
}

module.exports = {
    createTeam,
    createTeams,
}