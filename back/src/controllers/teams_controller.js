const teamService = require("../services/team_service");
const userService = require("../services/user_service");
const taskService = require("../services/task_service");

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
        const teamDto = await teamService.getTeamDtoById(team_id);
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
        const team_id = parseInt(req.params.team_id);
        const teamDto = await teamService.getTeamDtoById(team_id);
        const user_id = req.user.data.user_id;

        const project_id = teamDto.project_id;
        const userRoles = await userService.getRolesById(user_id);
        const hasPermission = userRoles.some((role) => role.name === "PROJECT_MANAGER" && role.project_id === project_id);
        if (hasPermission) {
            await taskService.deleteTasksByTeamId(req.params.team_id);
            await teamService.deleteTeamById(req.params.team_id);
            await userService.deleteRoleById(user_id, {name: "TEAM_LEAD", team_id: team_id});
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
        console.log(req.body);
        const team_id = req.params.team_id;
        const lead = req.body.lead;
        const { user_id } = req.user.data;
        const role = {name: "TEAM_LEAD", team_id: team_id};
        const savedTeam = await teamService.getTeamDtoById(team_id);
        console.log(savedTeam);
        const userRoles = await userService.getRolesById(user_id);
        const hasProjectManagerRole = userRoles.some((role) => role.name === "PROJECT_MANAGER" && role.project_id === savedTeam.project_id);
        const hasTeamLeadRole = userRoles.some((role) => role.name === "TEAM_LEAD" && role.team_id === team_id);
        const hasPermission = hasProjectManagerRole || hasTeamLeadRole;

        if(!hasPermission){
            return res.status(403).send({error: "forbidden"});
        }
        
        await userService.deleteRoleById(user_id, role);
        await userService.addRoleById(lead, role);

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

getUserTeamDtos = async (req, res) => {
    try {
        const user_id = req.user.data.user_id;
        const teamIds = [];

        const userRoles = await userService.getRolesById(user_id);
        userRoles.forEach(role => {
            if (role.name === "TEAM_LEAD") {
                teamIds.push(role.team_id);
            }
        });

        const teamDtos = await teamService.getTeamDtosByIds(teamIds);
        return res.status(200).send(teamDtos);
    }
    catch (err) {
        console.error(err)
        return res.status(500).send({ error: "Internal Server Error" });
    }
}

getTeamStatistics = async (req, res) => {
    try{
        const user_id = req.user.data.user_id;
        const team_id = parseInt(req.params.team_id);

        const team = await teamService.getTeamDtoById(team_id);
        if (!team) {
            return res.status(404).send({ error: "Team Not Found" });
        }

        const userRoles = await userService.getRolesById(user_id);
        const hasPermission = userRoles.some(
            (role) =>
                (role.name === "PROJECT_MANAGER" && role.project_id === team.project_id) ||
                (role.name === "TEAM_LEAD" && role.team_id === team_id)
        );

        if (!hasPermission) {
            return res.status(403).send({ error: "Forbidden" });
        }

        const tasks = await taskService.getTaskDtosByTeamId(team_id);

        const statusMap = {};
        const priorityMap = {};

        tasks.forEach((task) => {
            statusMap[task.status] = (statusMap[task.status] || 0) + 1;

            priorityMap[task.priority] = (priorityMap[task.priority] || 0) + 1;
        });

        const tasks_count = tasks.length;

        const response = {
            tasks_count,
            statuses: {
                statuses: Object.keys(statusMap),
                statuses_counts: Object.values(statusMap),
            },
            priorities: {
                priorities: Object.keys(priorityMap),
                priorities_counts: Object.values(priorityMap),
            },
        };

        return res.status(200).send(response);
    }catch(err){
        switch (err.message) {
            case "team_not_exists":
                return res.status(404).send({ error: "Team Not Found" });
            case "project_not_exists":
                return res.status(404).send({ error: "Project Not Found" });
            case "user_not_found":
                return res.status(404).send({ error: "User Not Found" });
            default:
                console.error(`Error getting team statistics: ${err}`)
                return res.status(500).send({ error: "Internal Server Error" });
        }
    }
};
module.exports = {
    createTeam,
    getTeamDtosByProjectId,
    getTeamDtoById,
    deleteTeamById,
    updateTeamById,
    getUserTeamDtos,
    getTeamStatistics,
}