const Team = require("../models/team_model")
const TeamDto = require("../dto/team_dto")

createTeam = async (team_attr) => {
    const team = new Team(team_attr);
    await team.save();
    return await TeamDto.create(team);
};

getTeamById = async (team_id) => { 
    return await Team.findOne({team_id : team_id});
};

getTeamDtoById = async (team_id) => {
    const team = await getTeamById(team_id);
    if(!team){
        return null;
    }
    return await TeamDto.create(team);
};

getTeamsByIds = async (ids) =>{
    const teams = await Team.find({ team_id: { $in: ids } });
    return teams;
}

getTeamDtosByIds = async (ids) =>{
    const teams = await getTeamsByIds(ids);
    if(teams.length === 0){
        return [];
    }
    return await Promise.all(teams.map(team => TeamDto.create(team)));
}

getTeamsByUserId = async (user_id) => { 
    return await Team.find({members: user_id});
};

getTeamDtosByUserId = async (user_id) => {
    const teams = await getTeamsByUserId(user_id);
    if(teams.length === 0){
        return [];
    }
    return await Promise.all(teams.map(team => TeamDto.create(team)));
};

getTeamsByProjectId = async (project_id) => { 
    return await Team.find({project_id: project_id});
};

getTeamDtosByProjectId = async (project_id) => {
    const teams = await getTeamsByProjectId(project_id);
    if(teams.length === 0){
        return [];
    }
    return Promise.all(teams.map(team => TeamDto.create(team)));
};

updateTeamById = async (team_id, team) => {
    const existingTeam = await getTeamById(team_id);
    if (!existingTeam) {
        throw new Error("team_not_exists");
    }
    const isUpToDate = Object.keys(team).every(
        (key) => existingTeam[key] === team[key]
    );
    if (isUpToDate) {
        throw new Error("team_is_up_to_date");
    }
    const result = await Team.updateOne({ team_id: team_id }, { $set: team });
    if (result.modifiedCount > 0) {
        return await getTeamById(team_id);
    }                       
};

deleteTeamById = async (team_id) => {
    const existingTeam = await getTeamById(team_id);
    if (!existingTeam) {
        throw new Error("team_not_exists");
    }
    return await Team.deleteOne({ team_id: team_id });
};

module.exports = {
    createTeam,
    getTeamById,
    getTeamDtoById,
    getTeamsByIds,
    getTeamDtosByIds,
    getTeamsByUserId,
    getTeamDtosByUserId,
    getTeamsByProjectId,
    getTeamDtosByProjectId,
    updateTeamById,
    deleteTeamById,
};