import express from 'express'
import type { Request, Response } from 'express'
import 'dotenv/config'
import authRouter from './routes/authRouter.ts'
import { requireAuth } from './middlewares/requireAuth.ts'
import rateLimit from 'express-rate-limit'
import concurrencyLimit from './serviceFunctions/concurrencyLimit.ts'
import { getRandomQuestions } from './serviceFunctions/getRandomQuestions.ts'
import requestIdMiddleware from './middlewares/requestIdMiddleware.ts'
import { getOrFetchOnce } from './serviceFunctions/cacheFunctions.ts'

const port = 3041
interface idRequest extends Request {
    requestId?: string
}

const app = express()
app.use(express.json())

app.use(requestIdMiddleware)

const globalRateLimit = rateLimit({
    windowMs: 60_000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests. Slow down.",
})
app.use(globalRateLimit)
app.use('/auth', authRouter)

const questionsConcurrencyLimit = concurrencyLimit(25)

app.get(`/questions/:category`, requireAuth, async (req: idRequest, res: Response) => {
    try {
        let category = req.params.category
        const fetchedQuestions = await getOrFetchOnce(`questions:${category}`, 30_000, () => getRandomQuestions(category))

        res.json(fetchedQuestions)
    } catch (err) {
        console.log(`${req.requestId} DB error`, err);
        res.json({ message: 'Network Error: Someting is wrong' })
    }
})

async function startServer() {
    app.listen(port, () => {
        console.log(`🚀 Server is running on http://localhost:${port}`);
    })
}
startServer()