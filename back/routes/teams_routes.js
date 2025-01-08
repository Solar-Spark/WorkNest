const express = require('express');
const router = express.Router();
const teamsController = require("../controllers/teams_controller")

router.post("/", teamsController.createTeam);

router.post("/list", teamsController.createTeams);

module.exports = router