import { db } from '../db.ts'
import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
import { questions } from '../schemas/questionSchema.ts'
import { eq } from 'drizzle-orm';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const questionsFilePath = path.join(__dirname, '../allQuestions/allQuestions.json')

let questionsData = JSON.parse(fs.readFileSync(questionsFilePath, "utf-8"))

async function seed() {
    const newQuestions = await db.insert(questions).values(questionsData).returning()
    console.log('Inserted question', newQuestions);
}

seed().catch(error => console.log(error))