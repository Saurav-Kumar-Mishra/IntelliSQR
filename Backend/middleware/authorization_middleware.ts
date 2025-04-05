import { NextFunction, Request, Response } from 'express'
import AuthenticationError from '../CustomErrorHandler/AuthenticationError'
import validationError from '../CustomErrorHandler/ValidationError'
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

declare global {
    namespace Express {
        interface Request {
            email?: string | JwtPayload
        }
    }
}

function authorizationCheck(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.auth_token
    if (!token) {
        return next(new AuthenticationError('No token found', 'missing token'))
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET as string
        ) as JwtPayload
        req.email = decoded
        next()
    } catch (err) {
        return next(new validationError('Not a valid token', 'token'))
    }
}

export default authorizationCheck
