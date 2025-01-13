require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_AUTH_SECRET = process.env.JWT_AUTH_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_AUTH_EXPIRES = process.env.JWT_AUTH_EXPIRES;
const JWT_REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES;

const verifyAuthTokenMW = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Authorization required" });
    }

    const token = authHeader.split(" ")[1];
    const result = await verifyAuthToken(token);
    if(result.status === 200){
        req.user = result.decoded;
        next();
    }
    else{
        return res.status(result.status).json({ error: result.error });
    }
};

const verifyToken = async (token, secret) => {
    try {
        const decoded = await jwt.verify(token, secret);
        return { status: 200, decoded: decoded };
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return { status: 401, error: "Token expired" };
        }
        return { status: 403, error: "Invalid token" };
    }
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

module.exports = {
    verifyAuthTokenMW,
    verifyAuthToken,
    generateAuthToken,
    generateRefreshToken,
    verifyRefreshToken,
}