const User = require('../models/user_model');

const signIn = async (req, res) => {
    const {username, password} = req.body;
    try{
        const user = await User.findOne({username : username});
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if(user.password === password){
            res.status(200).json({ message: `Welcome, ${username}`});
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
        await user.save();
        res.status(201).send(user);
      } catch (err) {
        console.log(err)
        res.status(400).send({ error: err.message });
    }
};

module.exports = {
    signIn,
    signUp
};