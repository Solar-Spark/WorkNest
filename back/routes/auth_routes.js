const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth_controller");

router.post('/sign_in', authController.signIn);

router.post('/sign_up', authController.signUp);

router.post('/refresh', authController.refresh);

router.post("/verify-otp", authController.verifyOTP);
//router.post("/list", authController.createUsers);

module.exports = router;