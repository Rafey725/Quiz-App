import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'; 

const pool = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: Number(process.env.DB_PORT)
})

export const db = drizzle(pool)