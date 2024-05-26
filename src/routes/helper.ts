import { NextFunction, Request, Response } from 'express'
const { validateAccessToken,middlewareValidateAccessToken } = require('../utils/jwt')

function routeHelper(callback: any) {
    return async (req: Request, res: Response) => {
        try {
            await callback(req, res)
        } catch (error: any) {
            console.log('error route')
            res.status(500).json(error)
        }
    }
}

function errorMiddleware(error: any, req: Request, res: Response, next: NextFunction) {
    console.log(error)
    res.status(error.status).json(error.message)
}

function ValidateToken(req: Request, res: Response, next: NextFunction) {
    validateAccessToken(req,process.env.SECRET)
    next();
}



module.exports = {
    routeHelper,
    errorMiddleware,
    ValidateToken
}