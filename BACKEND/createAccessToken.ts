import jwt from "jsonwebtoken";

type payloadType = {
    userId: number,
    email: string
}

export const createAccessToken = (payload: payloadType) => {
    const secret = process.env.JWT_SECRET
    if (!secret) throw new Error("JWT_SECRET is missing");
    
    return jwt.sign(payload, secret, { expiresIn: '30m' })
}