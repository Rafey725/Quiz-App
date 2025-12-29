import dotenv from 'dotenv/config'
import express from 'express'
import { db } from './db.ts'
import { questions } from "./schemas/questionSchema.ts"
import { eq, sql } from 'drizzle-orm'
import authRouter from './routes/authRouter.ts'
import { requireAuth } from './middlewares/requireAuth.ts'

const port = 3041
const app = express()
app.use(express.json())

app.use('/auth', authRouter)

app.get(`/questions/:category`, requireAuth, async (req, res) => {
    try {
        let category = req.params.category
        let fetchedQuestions = await db
            .select()
            .from(questions)
            .where(eq(questions.category, category))
            .orderBy(sql`RANDOM()`)
            .limit(10)

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