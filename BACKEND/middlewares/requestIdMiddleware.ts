import type { RequestHandler, NextFunction, Request, Response } from 'express';
import crypto from 'crypto'

interface idRequest extends Request {
    requestId?: string
}

const requestIdMiddleware = (req: idRequest, res: Response, next: NextFunction) => {
    req.requestId = crypto.randomUUID();
    let start = Date.now()
    res.on('finish', () => {
        const duration = Date.now() - start
        const slow = duration > 500 ? 'SLOW' : ''
        console.log(`[${req.requestId}] ${req.method} ${req.url} -> ${res.statusCode} in ${duration}ms${slow}`);
    })
    next()
}

export default requestIdMiddleware