import type { NextFunction, Request, Response } from "express";
import { Router } from 'express'
import { validataInfo } from "../middlewares/validateInfo.ts";
import { db } from "../db.ts";
import { users } from "../schemas/userSchema.ts";
import { eq } from "drizzle-orm";
import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken'
import { createAccessToken } from "../createAccessToken.ts";
import { requireAuth } from "../middlewares/requireAuth.ts";
import { rateLimit } from 'express-rate-limit'
import concurrencyLimit from "../serviceFunctions/concurrencyLimit.ts";

const router = Router()

const loginRateLimit = rateLimit({
    windowMs: 60_000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many login attempts. Try again later.'
})


const loginConcurrencyLimit = concurrencyLimit(10)

interface authRequest extends Request {
    user?: {
        userId: number,
        email: string
    }
}

router.get('/me', requireAuth, async (req: authRequest, res: Response) => {
    let data = req.user
    if (!data) return res.status(401).json({ message: 'Unauthorized' })
    let findUser = await db
        .select()
        .from(users)
        .where(eq(users.email, data.email))

    res.json({ message: 'User info is sent', username: findUser[0].username, id: findUser[0].id })
})

router.post('/signup', validataInfo, async (req, res) => {
    let find = await db
        .select()
        .from(users)
        .where(eq(users.email, req.body.email))

    if (find.length > 0) return res.status(400).json({ message: 'Email already exists' })

    const password_hash = await bcrypt.hash(req.body.pass, 12)
    await db.insert(users).values({
        username: req.body.username,
        email: req.body.email,
        password_hash: password_hash
    })

    res.json({ message: 'Registered new user' })
})

router.post('/login', loginRateLimit, loginConcurrencyLimit, async (req, res) => {
    // Finding email
    let findUser = await db
        .select()
        .from(users)
        .where(eq(users.email, req.body.email))
    if (findUser.length == 0) return res.status(401).json({ message: 'Email does not exists' })

    // Verifying password hash
    let verifyPass = await bcrypt.compare(req.body.pass, findUser[0].password_hash)
    if (!verifyPass) return res.status(401).json({ message: 'Password is incorrect' })

    // Return token
    const token = createAccessToken({ userId: findUser[0].id, email: findUser[0].email })

    const userInfo = {
        username: findUser[0].username,
        id: findUser[0].id
    }

    res.json({ message: 'User found', token: token, data: { userInfo } })
})

export default router