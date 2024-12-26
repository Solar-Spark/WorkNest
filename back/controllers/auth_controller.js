const User = require('../models/user_model');

const signIn = (req, res) => {
    const {username, password} = req.body;
    console.log(username);
    res.status(200).json({ message: `Welcome, ${username}`});
};

const signUp = async (req, res) => {
    try {
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