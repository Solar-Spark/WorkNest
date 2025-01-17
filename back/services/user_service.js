const User = require("../models/user_model")
const UserDto = require("../dto/user_dto")
const { hashPassword } = require('../utils/password_util');

getUserByUsername = async (username) => {
    return await User.findOne({ username: username });
}

getUserDtoByUsername = async (username) => {
    const user = await getUserByUsername(username);
    if(!user){
        return null;
    }
    return await new UserDto(User.findOne({ username: username }));
}
getUserById = async (user_id) => {
    return await User.findOne({ user_id });
}
getUserDtoById = async (user_id) => {
    const user = await getUserById(user_id);
    if(!user){
        return null;
    }
    return new UserDto(user);
}

getUsersByIds = async (ids) => {
    return await User.find({user_id: {$in : ids}});
}

getUserDtosByIds = async (ids) => {
    const users = await getUsersByIds(ids);
    if(users.length === 0){
        return [];
    }
    return users.map(user => new UserDto(user));
}

createUser = async (user_attr) => {
    const existingUser = await User.findOne({
        $or: [{ username: user_attr.username }, { email: user_attr.email }]
    });
    if (existingUser) {
        throw new Error("user_exists")
    }
    const user = new User(user_attr);
    user.password = await hashPassword(user_attr.password)
    await user.save();
    return new UserDto(user);
}
addRoleById = async (user_id, role) => {
    await User.updateOne({user_id: user_id}, {$push: {roles: role}});
}
getRolesById = async (user_id) => {
    const user = await getUserById(user_id);
    if (user) {
        return user.roles;
    }
    else{
        throw new Error("user_not_found");
    }  
};

module.exports = {
    createUser,
    getUserByUsername,
    getUserById,
    addRoleById,
    getUserDtoById,
    getRolesById,
    getUsersByIds,
    getUserDtosByIds,
}