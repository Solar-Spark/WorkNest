const express = require('express');
const router = express.Router();
const teamsController = require("../controllers/teams_controller");
const jwt = require("../utils/jwt_util");

router.use(jwt.verifyAuthTokenMW);

router.post("/", teamsController.createTeam);

router.get("/", teamsController.getUserTeamDtos);

router.put("/:team_id", teamsController.updateTeamById);

router.delete("/:team_id", teamsController.deleteTeamById);

router.get("/:team_id", teamsController.getTeamDtoById),

router.get("/project/:project_id", teamsController.getTeamDtosByProjectId),

module.exports = router