import express from 'express'
import { db } from './db.ts'
import { questions } from "./schemas/questionSchema.ts"
import { eq, sql } from 'drizzle-orm'
import authRouter from './routes/authRouter.ts'

const port = 3041
const app = express()
app.use(express.json())

app.use('/auth', authRouter)

app.get(`/questions/:id`, async (req, res) => {
    let category = req.params.id
    let fetchedQuestions = await db
        .select()
        .from(questions)
        .where(eq(questions.category, category))
        .orderBy(sql`RANDOM()`)
        .limit(10)

    res.json(fetchedQuestions)
})

async function startServer() {
    app.listen(port, () => {
        console.log(`🚀 Server running on http://localhost:${port}`);
    })
}
startServer()