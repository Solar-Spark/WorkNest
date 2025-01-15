const teamService = require("../services/team_service");

createTeam = async (req, res) => {
    try{
        const teamDto = await teamService.createTeam(req.body);
        res.status(201).send(teamDto);
    } catch(err){
        res.status(500).send({ error: "Internal Server Error" });
        console.error(`Creating task error: ${err}`)
    }
    
};

module.exports = {
    createTeam,
}