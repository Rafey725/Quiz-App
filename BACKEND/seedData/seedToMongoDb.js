import mongoose from "mongoose";
import fs from "fs";
import Question from "../schemas/questionSchema.js";
import { connectDB } from '../db.js'
import path from 'path';
import { fileURLToPath } from 'url';

await connectDB()

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const questionsFilePath = path.join(__dirname, 'questions.json')

let questions = JSON.parse(fs.readFileSync(questionsFilePath, "utf-8"))

await Question.insertMany(questions)
console.log('Inserted questions:', questions.length);