require('dotenv').config();
const userService = require("../services/user_service")
const { comparePassword } = require('../utils/password_util');
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES= process.env.JWT_EXPIRES;

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
            const token = jwt.sign({ user_id: user.user_id, username: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
            res.status(200).send({ token: token });
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

/*const createUsers = async (req, res) => {
    const result = await userService.createUsers(req.body);
    if(result.status === 201){
        res.status(201).send({ message: result.message })
    }
    else if(result.status === 500){
        res.status(500).send({ message: "Internal Server Error" });
        console.error(result.error)
    }
}*/

module.exports = {
    signIn,
    signUp,
//    createUsers,
};