import type { NextFunction, Request, Response } from "express";

export default function concurrencyLimit(maxInFlight: number) {
    let inFlight = 0;

    return (req: Request, res: Response, next: NextFunction) => {
        if (inFlight >= maxInFlight) return res.status(503).json({ message: 'Server is busy, try again.' })

        inFlight++
        let done = false

        const release = () => {
            if (done) return
            done = true
            inFlight--
        }

        res.on('finish', release) // res sent
        res.on('close', release) // client disconnected

        next()
    }
}