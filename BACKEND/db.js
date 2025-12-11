import mongoose from "mongoose";
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '.env') })

// console.log('MONGODB_URI =', process.env.DB_CONNECTION_STRING) 

export async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING)
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.log("Connection failed:", err);
    }
}
