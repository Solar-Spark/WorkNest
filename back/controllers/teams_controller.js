const teamService = require("../services/team_service");
const userService = require("../services/user_service");
createTeam = async (req, res) => {
    try{
        const team = req.body;
        const user_id = team.lead;
        const teamDto = await teamService.createTeam(team);
        await userService.addRoleById(user_id, { name: "TEAM_LEAD", team_id: teamDto.team_id });
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

deleteTeamById = async (req, res) => {
    try{
        const user_id = req.user.data.user_id;
        const team_id = parseInt(req.params.team_id);
        const teamDto = await teamService.getTeamDtoById(team_id);
        
        const project_id = teamDto.project_id;
        const userRoles = await userService.getRolesById(user_id);
        const hasProjectManagerRole = userRoles.some((role) => role.name === "PROJECT_MANAGER" && role.project_id === project_id);
        const hasPermission = hasProjectManagerRole;
        if (hasPermission) {
            await teamService.deleteTeamById(req.params.team_id);
            return res.status(200).send();
        }
        else {
            return res.status(403).send({ error: "forbidden" });
        }
    } catch(err){
        switch(err.message){
            case "team_not_exists":
                return res.status(404).send({error: "Team Not Found"});
            default:
                console.error(`Error deleting team: ${err}`)
                return res.status(500).send({error: "Internal Server Error"});
        }
    }
};
updateTeamById = async (req, res) => {
    try{
        const { team_id } = req.params;
        const teamDto = await teamService.updateTeamById(team_id, req.body);
        return res.status(200).json({ teamDto });
    } catch(err){
        switch(err.message){
            case "team_not_exists":
                return res.status(404).send({error: "Team Not Found"});
            case "team_is_up_to_date":
                return res.status(304).send({error: "Team Is Up-To-Date"});
            default:
                console.error(`Error updating team: ${err}`)
                return res.status(500).send({error: "Internal Server Error"});
        }
    }
};  
module.exports = {
    createTeam,
    getTeamDtosByProjectId,
    getTeamDtoById,
    deleteTeamById,
    updateTeamById,
}