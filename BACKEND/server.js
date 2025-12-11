import express from 'express'
import fs from 'fs'
import { connectDB } from './db.js'
import Question from "./questionSchema.js"
import questionSchema from './questionSchema.js'

const app = express()
app.use(express.json())
const port = 3041


app.get(`/questions`, async (req, res) => {
    let questions = await Question.find({ category: 'html' }).limit(5)
    res.send(questions)
})

async function startServer() {
    await connectDB()
    app.listen(port, () => {
        console.log(`🚀 Server running on http://localhost:${port}`);
    })
}
startServer()