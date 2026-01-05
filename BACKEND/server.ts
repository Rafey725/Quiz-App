import express from 'express'
import 'dotenv/config'
import authRouter from './routes/authRouter.ts'
import { requireAuth } from './middlewares/requireAuth.ts'
import rateLimit from 'express-rate-limit'
import concurrencyLimit from './serviceFunctions/concurrencyLimit.ts'
import { getRandomQuestions } from './serviceFunctions/getRandomQuestions.ts'

const port = 3041
const app = express()
app.use(express.json())

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

app.get(`/questions/:category`, requireAuth, questionsConcurrencyLimit, async (req, res) => {
    try {
        let category = req.params.category
        let fetchedQuestions = await getRandomQuestions(category)

        res.json(fetchedQuestions)
    } catch (err) {
        res.json({ message: 'Network Error: Someting is wrong' })
    }
})

async function startServer() {
    app.listen(port, () => {
        console.log(`🚀 Server is running on http://localhost:${port}`);
    })
}
startServer()