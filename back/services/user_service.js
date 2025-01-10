const User = require("../models/user_model")
const UserDto = require("../dto/user_dto")
const { hashPassword } = require('../utils/password_util');

getUserByUsername = async (username) => {
    try {
        return await User.findOne({ username: username });
    } catch (err) {
        console.error("User find error: ", err.message);
        throw new Error("Internal Server Error");
    }
}

getUserDtoByUsername = async (username) => {
    try {
        return await new UserDto(User.findOne({ username: username }));
    } catch (err) {
        console.error("User find error: ", err.message);
        throw new Error("Internal Server Error");
    }
}

createUser = async (user_attr) => {
    try {
        const existingUser = await User.findOne({
            $or: [{ username: user_attr.username }, { email: user_attr.email }]
        });
        if (existingUser) {
            return { status: 409, error: "User with this username or email already exists" };
        }
        const user = new User(user_attr);
        user.password = await hashPassword(user_attr.password)
        await user.save();
        return { status: 201, userDto: new UserDto(user) };
    } catch(err){
        return { status: 500, error: err.message };
    }
}
createUsers = async (users) =>{
    for(user of users){
        user.password = await hashPassword(user.password);
    }
    try {
        await User.insertMany(users);
        return { status: 201, message: "Users created"};
    } 
    catch (err) {
        return { status: 500, error: err.message };
    }
}

module.exports = {
    createUser,
    createUsers,
    getUserByUsername,
}