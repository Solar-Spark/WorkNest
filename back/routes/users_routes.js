const express = require('express');
const router = express.Router();
const userController = require("../controllers/user_controller");
const jwt = require("../utils/jwt_util");

router.use(jwt.verifyAuthTokenMW);

router.post("/ids", userController.getUserDtosByIds);
router.get("/team/:team_id", userController.getUserDtosByTeamId);
router.post("/search", userController.searchUserDtosByUsername);
router.get("/:user_id", userController.getUserDtoById);
router.get("/username/:username", userController.getUserDtoById);

module.exports = router;