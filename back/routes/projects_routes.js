const express = require('express');
const router = express.Router();
const projectsController = require("../controllers/projects_controller")
const jwt = require("../utils/jwt_util")

router.use(jwt.verifyAuthTokenMW)

router.post("/", projectsController.createProject);
router.post("/list", projectsController.createProjects);

module.exports = router