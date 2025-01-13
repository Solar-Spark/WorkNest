require('dotenv').config();
const userService = require("../services/user_service");
const { comparePassword } = require('../utils/password_util');
const { generateAuthToken, generateRefreshToken, verifyRefreshToken} = require('../utils/jwt_util');
const redis = require("../config/redis");
const phoneService = require("../services/phone_service")

function generateOTP(){
    return Math.floor(100000 + Math.random() * 900000).toString()
}

const signIn = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).send({ message: "Username and password are required" });
    }
    try {
        const user = await userService.getUserByUsername(username);

        if (!user) {
            res.status(404).send({ message: "User not found" });
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (isPasswordValid) {
            const otp = generateOTP();
            await redis.setex(`otp:${user.username}`, 300, otp);
            //await phoneService.sendOTP(user.phone_number, otp);
            console.log(`otp: ${otp}`);
            res.status(200).send();
        } else {
            res.status(401).send({ message: "Invalid Password" });
        }
    } catch (err) {
        console.error("Sign In Error: ", err.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

const signUp = async (req, res) => {
    const result = await userService.createUser(req.body);
    if(result.status === 201){
        res.status(201).send(result.userDto);
    }
    else if(result.status === 409){
        res.status(409).send({ message: result.error });
    }
    else if(result.status === 500){
        res.status(500).send({ message: "Internal Server Error" });
        console.error(result.error)
    }
};

const verifyOTP = async(req, res) => {
    try{
        const savedOTP = await redis.get(`otp:${req.body.username}`);
        const user = await userService.getUserByUsername(req.body.username);
        if(req.body.otp === savedOTP){
            await redis.del(`otp:${req.body.username}`);
            const authToken = generateAuthToken({user_id: user.user_id});
            const refreshToken = generateRefreshToken({user_id: user.user_id});
            redis.setex(`refresh:${user.user_id}`, 60 * 24 * 60 * 60, refreshToken);
            res.cookie('refresh', refreshToken, {
                httpOnly: true,
                sameSite: 'Strict',
                maxAge: 60 * 24 * 60 * 60 * 1000,
            });
            res.status(200).send({auth: authToken });
        }
        else{
            res.status(401).send({error: "Invalid code"});
        }
    } catch(err){
        console.error("Sign In Error: ", err.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
}

const refresh = async(req, res) => {
    try{
        const { refresh } = req.cookies;
        if (!refresh) {
            return res.status(401).json({ error: 'Refresh token not provided' });
        }
        const result = await verifyRefreshToken(refresh);
        console.log(result);
        if(result.status === 200){
            const user_id = result.decoded.data.user_id;
            const savedRefresh = await redis.get(`refresh:${user_id}`);
            if(refresh === savedRefresh){
                const authToken = generateAuthToken({user_id});
                const refreshToken = generateRefreshToken({user_id});
                redis.setex(`refresh:${user_id}`, 60 * 24 * 60 * 60, refreshToken);
                res.cookie('refresh', refreshToken, {
                    httpOnly: true,
                    sameSite: 'Strict',
                    maxAge: 60 * 24 * 60 * 60 * 1000,
                });
                res.status(200).send({ auth: authToken });
            }
        }
        else{
            res.status(401).send({error: result.error});
        }
    } catch(err){
        console.error("Refreshing error: ", err.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
}
module.exports = {
    signIn,
    signUp,
    verifyOTP,
    refresh,
//    createUsers,
};