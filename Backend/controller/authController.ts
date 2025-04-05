import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import AuthenticationError from '../CustomErrorHandler/AuthenticationError'
import ConflictError from '../CustomErrorHandler/conflictError'
require('dotenv').config()
const jwt = require('jsonwebtoken')

const prisma = new PrismaClient()

export async function loginHandler(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const { email, password }: { email: string; password: string } = req.body
    const user = await prisma.user.findUnique({
        where: { email: email },
    })

    if (!user || !user.password) {
        next(new AuthenticationError('Invalid user id', 'email'))
        return
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (isPasswordValid) {
        const token = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET)
        res.cookie('auth_token', token, {
            httpOnly: true, // Ensures the cookie can't be accessed via JavaScript
            maxAge: 3600 * 1000, // 1 hour expiry (in milliseconds)
        })
        res.status(200).send({ message: 'Login successful', token: token })
    } else {
        next(new AuthenticationError('Invalid password', 'password'))
    }
}

export async function registration(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { email, password }: { email: string; password: string } = req.body

    const existingUser = await prisma.user.findUnique({
        where: { email: email },
    })

    if (existingUser) {
        return next(new ConflictError('User already registered', 'email'))
    }
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const user = await prisma.user.create({
        data: { email: email, password: hashedPassword },
    })
    if (user) {
        res.status(200).send({ message: 'User created successfully' })
    } else {
        res.status(500).send('Internal Server Error')
    }
}

export async function home(req: Request, res: Response, next: NextFunction) {
    try {
        const email = req.email

        if (!email || typeof email !== 'string') {
            res.status(400).json({
                message: 'Invalid or missing email in token',
            })
            return
        }

        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            res.status(404).json({ message: 'User not found' })
            return
        }

        res.status(200).json({ user: user.email })
    } catch (error) {
        next(error)
    }
}
