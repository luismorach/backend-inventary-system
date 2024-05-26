"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
require('dotenv').config();
const generateAccessToken = (user, key, timeExpires) => {
    return jwt.sign(user, key, { expiresIn: timeExpires });
};
const validateAccessToken = (req, key) => {
    const token = req.headers.authorization?.split(' ')[1];
    try {
        let user = jwt.verify(token, key);
        return user;
    }
    catch (error) {
        let status = (error.message.includes('expired')) ? 401 : 403;
        throw ({ message: 'Ups.. algo ha salido mal', status });
    }
};
module.exports = { generateAccessToken, validateAccessToken };
