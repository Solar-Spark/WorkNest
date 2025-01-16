const teamService = require("../services/team_service");

createTeam = async (req, res) => {
    try{
        const teamDto = await teamService.createTeam(req.body);
        return res.status(201).send(teamDto);
    } catch(err){
        console.error(`Creating task error: ${err}`)
        return res.status(500).send({ error: "Internal Server Error" });
    }
    
};

getTeamDtosByProjectId = async (req, res) => {
    try{
        const project_id = req.params.project_id;
        const teamDtos = await teamService.getTeamDtosByProjectId(project_id);
        return res.status(200).json(teamDtos);
    } catch(err){
        console.error(`Error getting teamDtos: ${err}`)
        return res.status(500).send({error: "Internal Server Error"});
    }
};

getTeamDtoById = async (req,res) => {
    try{
        const team_id = req.params.team_id;
        const teamDto = await teamService.getTeamById(team_id);
        if(teamDto){
            return res.status(200).send(teamDto);
        }
        else{
            return res.status(404).send({error: "Team Not Found"});
        }
    } catch(err){
        console.error(`Error getting teamDto: ${err}`)
        return res.status(500).send({error: "Internal Server Error"});
    }
}

module.exports = {
    createTeam,
    getTeamDtosByProjectId,
    getTeamDtoById,
}