require('dotenv').config();
const jwt = require('jsonwebtoken');
const { getUserDtoById } = require('../services/user_service');

const JWT_AUTH_SECRET = process.env.JWT_AUTH_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_AUTH_EXPIRES = process.env.JWT_AUTH_EXPIRES;
const JWT_REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES;

const verifyAuthTokenMW = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(403).json({ error: "auth_required" });
        }

        const token = authHeader.split(" ")[1];
        req.user = await verifyAuthToken(token);

        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).send({ error: "token_expired" });
        }
        return res.status(401).send({ error: "invalid_token" });
    }

};

const verifyToken = async (token, secret) => {
    return jwt.verify(token, secret);
};

const verifyAuthToken = async (token) => {
    return await verifyToken(token, JWT_AUTH_SECRET);
};
const verifyRefreshToken = async (token) => {
    return await verifyToken(token, JWT_REFRESH_SECRET);
};
const generateAuthToken = (data) => {
    return jwt.sign({ data }, JWT_AUTH_SECRET, { expiresIn: JWT_AUTH_EXPIRES });
}
const generateRefreshToken = (data) => {
    return jwt.sign({ data }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES });
}
const generateTokenPair = async (user_id) => {
    const userDto = await getUserDtoById(user_id);
    if (userDto) {
        data = { user_id };
        return { authToken: generateAuthToken(data), refreshToken: generateRefreshToken(data) };
    }
    else {
        throw new Error("user_not_found");
    }
}
module.exports = {
    verifyAuthTokenMW,
    verifyAuthToken,
    generateAuthToken,
    generateRefreshToken,
    verifyRefreshToken,
    generateTokenPair,
}