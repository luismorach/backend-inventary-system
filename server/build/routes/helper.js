"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { validateAccessToken, middlewareValidateAccessToken } = require('../utils/jwt');
function routeHelper(callback) {
    return async (req, res) => {
        try {
            await callback(req, res);
        }
        catch (error) {
            console.log('error route');
            res.status(500).json(error);
        }
    };
}
function errorMiddleware(error, req, res, next) {
    console.log(error);
    res.status(error.status).json(error.message);
}
function ValidateToken(req, res, next) {
    validateAccessToken(req, process.env.SECRET);
    next();
}
module.exports = {
    routeHelper,
    errorMiddleware,
    ValidateToken
};
