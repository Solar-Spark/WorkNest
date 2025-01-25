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
    return new UserDto(user);
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
deleteRoleById = async (user_id, role) => {
    const user = await getUserById(user_id);
    if(!user){
        throw new Error("user_not_found");
    }
    user.roles = user.roles.filter((userRole) => !(userRole.name === role.name && userRole.project_id === role.project_id));
    await User.updateOne({user_id: user.user_id}, {$set: {roles: user.roles}});
}

searchUsersByUsername = async (prompt) => {
    return await User.find({username: {$regex: prompt}}).limit(20);
}

searchUserDtosByUsername = async (prompt) => {
    const users = await searchUsersByUsername(prompt);
    return users.map(user => new UserDto(user));
}

deleteUserById = async (user_id) => {
    const existingUser = await getUserById(user_id);
    if (!existingUser) {
        throw new Error("user_not_exists");
    }
    return await User.deleteOne({ user_id: user_id });
}

module.exports = {
    createUser,
    getUserByUsername,
    getUserDtoByUsername,
    getUserById,
    addRoleById,
    getUserDtoById,
    getRolesById,
    getUsersByIds,
    getUserDtosByIds,
    deleteRoleById,
    searchUsersByUsername,
    searchUserDtosByUsername,
    deleteUserById,
}