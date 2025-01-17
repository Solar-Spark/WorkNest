const express = require('express');
const router = express.Router();
const projectsController = require("../controllers/projects_controller");
const jwt = require("../utils/jwt_util");

router.use(jwt.verifyAuthTokenMW);

router.post("/", projectsController.createProject);
router.get("/", projectsController.getUserProjectDtos);
router.get("/:project_id", projectsController.getProjectDtoById);
router.get("/name/:name", projectsController.getProjectDtoByName);
router.delete("/:project_id", projectsController.deleteProjectById);
module.exports = router;