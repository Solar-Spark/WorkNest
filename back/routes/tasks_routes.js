const express = require('express');
const router = express.Router();
const tasksController = require("../controllers/tasks_controller");
const jwt = require("../utils/jwt_util");

router.use(jwt.verifyAuthTokenMW);

router.post("/", tasksController.createTask);

router.get("/", tasksController.getTaskDtosByUserId);

router.get("/project/:project_id", tasksController.getTaskDtosByProjectId);

router.get("/:task_id", tasksController.getTaskDtoById);

router.put("/:task_id", tasksController.updateTaskById);

router.delete("/:task_id", tasksController.deleteTaskById);

module.exports = router;