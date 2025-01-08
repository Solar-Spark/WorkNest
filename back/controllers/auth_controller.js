const User = require('../models/user_model');
const { hashPassword, comparePassword } = require('../utils/password_util');

const signIn = async (req, res) => {
    const {username, password} = req.body;
    try{
        const user = await User.findOne({username : username});
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if(await comparePassword(password, user.password)){
            res.status(200).json({ user_id : user.user_id});
        }
        else{
            res.status(401).json({ message: "Invalid password"});
        }
    } catch(err){
        console.error("Error during sign-in:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const signUp = async (req, res) => {
    try {
        const existingUser = await User.findOne({
            $or: [{ username: req.body.username }, { email: req.body.email }]
        });

        if (existingUser) {
            return res.status(409).send({ error: "User with this username or email already exists" });
        }
        
        const user = new User(req.body);
        user.password = await hashPassword(req.body.password)
        await user.save();
        res.status(201).send(user);
      } catch (err) {
        console.log(err)
        res.status(400).send({ error: err.message });
    }
};

const createUsers = async (req, res) => {
    const users = req.body;
    for(user of users){
        user.password = await hashPassword(user.password)
    }
    try {
        await User.insertMany(users);
    } 
    catch (err) {
        console.log(err)
        res.status(400).send({ error: err.message });
    }
    return res.status(201).send({message: "Users created"});
}
module.exports = {
    signIn,
    signUp,
    createUsers,
};