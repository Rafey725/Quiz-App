import type { Request, Response, NextFunction } from "express"

export const validataInfo = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.email || !req.body.pass || req.body.pass.length < 8) return res.status(400).json({ message: 'Invalid info' })

    next()
}