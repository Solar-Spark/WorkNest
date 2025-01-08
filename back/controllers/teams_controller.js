const teamService = require("../services/team_service")

createTeam = async (req, res) => {
    const team = await teamService.createTeam(req.body)
    if(team.status === 201){
        res.status(201).send(team.team);
    }
    else if (team.status === 500){
        res.status(500).send({ message: team.message });
    }
};

createTeams = async (req, res) => {
    const team = await teamService.createTeams(req.body)
    if(team.status === 201){
        res.status(201).send(team.message);
    }
    else if (team.status === 500){
        res.status(500).send({ message: team.message });
    }
};

module.exports = {
    createTeam,
    createTeams,
}