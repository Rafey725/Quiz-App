import { and, eq, gte, lt, sql } from "drizzle-orm"
import { db } from "../db.ts"
import { questions } from "../schemas/questionSchema.ts"

export const getRandomQuestions = async (category: string, limit: number = 10) => {
    const r = Math.random()

    const firstBatch = await db
        .select()
        .from(questions)
        .where(and(eq(questions.category, category), gte(questions.shuffle_key, r)))
        .limit(limit)

    if (firstBatch.length === limit) return firstBatch

    const remaining = limit - firstBatch.length

    const secondBatch = await db
        .select()
        .from(questions)
        .where(and(eq(questions.category, category), lt(questions.shuffle_key, r)))
        .limit(remaining)

    return [...firstBatch, ...secondBatch]
}