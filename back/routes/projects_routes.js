const express = require('express');
const router = express.Router();
const projectsController = require("../controllers/projects_controller")

router.post("/", projectsController.createProject);
router.post("/list", projectsController.createProjects);

module.exports = router