require('dotenv').config();
const userService = require("../services/user_service");
const { comparePassword } = require('../utils/password_util');
const { verifyRefreshToken, generateTokenPair } = require('../utils/jwt_util');
const phoneService = require("../services/phone_service");
const emailService = require("../services/email_service");
const redisService = require('../services/redis_service');

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

const signIn = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send({ message: "Username and password are required" });
    }
    try {
        const user = await userService.getUserByUsername(username);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const isPasswordValid = await comparePassword(password, user.password);

        if (isPasswordValid) {
            const otp = generateOTP();
            await redisService.setOtpByUsername(username, otp);
            //await phoneService.sendOTP(user.phone_number, otp);
            await emailService.sendOTP(otp, user.email);
            console.log(`otp: ${otp}`);
            return res.status(200).send();
        } else {
            return res.status(401).send({ error: "invalid_password" });
        }
    } catch (err) {
        console.error("Sign In Error: ", err.message);
        return res.status(500).send({ error: "Internal Server Error" });
    }
};

const signUp = async (req, res) => {
    try {
        const userDto = await userService.createUser(req.body);
        return res.status(201).send(userDto);
    } catch (err) {
        if (err.message === "user_exists") {
            return res.status(409).send({ error: "User exists" });
        }
        else {
            console.error("Sign Up Error: ", err.message);
            return res.status(500).send({ message: "Internal Server Error" });
        }
    }
};

const verifyOTP = async (req, res) => {
    try {
        const { username, otp } = req.body;

        const savedOTP = await redisService.getOtpByUsername(username);
        const userDto = await userService.getUserDtoByUsername(username);

        if (!savedOTP) {
            return res.status(400).send({ error: "2fa_expired" });
        }

        if (!userDto){
            return res.status(404).send({ error: "user_not_found" });
        }

        if (otp === savedOTP) {
            await redisService.deleteOtpByUsername(username);
            const { authToken, refreshToken } = await generateTokenPair(userDto.user_id);
            await redisService.setRefreshTokenByUserId(userDto.user_id, refreshToken);
            res.cookie('refresh', refreshToken, {
                httpOnly: true,
                sameSite: 'Strict',
                maxAge: 60 * 24 * 60 * 60 * 1000,
            });
            return res.status(200).send({ auth: authToken });
        }
        else {
            return res.status(401).send({ error: "invalid_2fa_code" });
        }
    } catch (err) {
        console.error("Verifying OTP Error: ", err.message);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}

const refresh = async (req, res) => {
    try {
        const { refresh } = req.cookies;
        
        if (!refresh) {
            return res.status(401).json({ error: 'refresh_token_needed' });
        }
        
        const tokenData = await verifyRefreshToken(refresh);
        const user_id = tokenData.data.user_id;
        const savedRefresh = await redisService.getRefreshTokenByUserId(user_id);
        
        if (refresh === savedRefresh) {
            const { authToken, refreshToken } = await generateTokenPair(user_id);
            await redisService.setRefreshTokenByUserId(user_id, refreshToken);
            
            res.cookie('refresh', refreshToken, {
                httpOnly: true,
                sameSite: 'Strict',
                maxAge: 60 * 24 * 60 * 60 * 1000,
            });
            
            return res.status(200).send({ auth: authToken });
        }
        else{
            return res.status(401).send("invalid_refresh_token");
        }
    } catch (err) {
        if(err.name === "TokenExpiredError"){
            return res.status(401).send({ error: "refresh_expired" });
        }
        else if(err.name === "JsonWebTokenError"){
            return res.status(400).send({ error: "invalid_refresh" });
        }
        console.error("Refreshing error: ", err.message);
        return res.status(500).send({ error: "refresh_error" });
    }
}
const logOut = async (req, res) => {
    try {
        const { user_id } = req.user.data;
        const savedRefresh = await redisService.getRefreshTokenByUserId(user_id);
        if (!savedRefresh){
            return res.status(403).send({ error: "user_logged_out" });
        }
        await redisService.deleteRefreshTokenByUserId(user_id);
        return res.status(200).send();
    } catch (err) {
        console.error("Logging out Error: ", err.message);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}
module.exports = {
    signIn,
    signUp,
    verifyOTP,
    refresh,
    logOut,
};