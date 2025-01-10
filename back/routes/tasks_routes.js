const express = require('express');
const router = express.Router();
const tasksController = require("../controllers/tasks_controller")
const jwt = require("../utils/jwt_util")

router.use(jwt.authenticateToken)

router.post("/", tasksController.createTask);

router.post("/list", tasksController.createTasks);

router.get("/:task_id", tasksController.getTask);

router.get("/user/:user_id", tasksController.getTasksByUserId);

router.put("/:task_id", tasksController.updateTask);

router.delete("/:task_id", tasksController.deleteTask);

module.exports = router;