const express = require('express');
const router = express.Router();
const teamsController = require("../controllers/teams_controller");
const jwt = require("../utils/jwt_util");

router.use(jwt.verifyAuthTokenMW);

router.post("/", teamsController.createTeam);

module.exports = router