const redis = require("../config/redis");

getOtpByUsername = async (username) => {
    return await redis.get(`otp:${username}`);
}
setOtpByUsername = async (username, otp) => {
    return await redis.setex(`otp:${username}`, 300, otp);
}
deleteOtpByUsername = async (username) => {
    return await redis.del(`otp:${username}`);
}
getRefreshTokenByUserId = async (user_id) => {
    return await redis.get(`refresh:${user_id}`);
}
setRefreshTokenByUserId = async (user_id, refreshToken) => {
    return redis.setex(`refresh:${user_id}`, 60 * 24 * 60 * 60, refreshToken);
}
module.exports = {
    getOtpByUsername,
    getRefreshTokenByUserId,
    setRefreshTokenByUserId,
    deleteOtpByUsername,
    setOtpByUsername,
}