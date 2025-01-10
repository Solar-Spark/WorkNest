const express = require('express');
const router = express.Router();
const teamsController = require("../controllers/teams_controller")
const jwt = require("../utils/jwt_util")

router.use(jwt.authenticateToken)

router.post("/", teamsController.createTeam);

router.post("/list", teamsController.createTeams);

module.exports = router