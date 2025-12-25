import fs from 'fs'
import Question from "./questionSchema.js";
import { connectDB } from './db.js'

await connectDB()

const questions = await Question.find()

fs.writeFileSync('allquestions.json', questions)

console.log('Inserted questions:', questions.length);
