const jwt = require('jsonwebtoken')
require('dotenv').config()
import { NextFunction, Request, Response } from 'express'

const generateAccessToken = (user: any,key:any,timeExpires:string) => {
    return jwt.sign(user, key,{expiresIn:timeExpires})
}


const validateAccessToken=(req:Request,key:string)=>{
    const token = req.headers.authorization?.split(' ')[1]
    try{
        let user=jwt.verify(token, key)
        return user
    }catch(error:any){
        let status=(error.message.includes('expired'))?401:403
        throw ({message:'Ups.. algo ha salido mal',status})
    }
}

module.exports = { generateAccessToken, validateAccessToken}