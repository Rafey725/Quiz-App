import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken'
import type { Request, Response, NextFunction } from "express"

type authPayload = JwtPayload & {
    userId: number,
    email: string
}

interface authRequest extends Request {
    user?: authPayload
}

export const requireAuth = (req: authRequest, res: Response, next: NextFunction) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    let token = req.headers.authorization.split(' ')[1]
    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET!)
        req.user = decoded as authPayload
        next()
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: 'Invalid token' })
    }

}

