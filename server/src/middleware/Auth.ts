import jwt from "jsonwebtoken";
import {Request, Response, NextFunction} from 'express'

module.exports.isAuth = async (Request: any, Response: any, NextFunction: any) => {
    try {
        const token = Request.headers.authorization
        if (!token) {
            throw new Error('Not Authorized')
        }
        const getToken = token.split(' ')
        
        jwt.verify(getToken[1], 'secret')
        NextFunction()
    } catch (error) {
        Response.send({ message: 'Not Authorized', status: 'Unauthorized' })
    }
}