import { pgTable, serial, varchar, text, jsonb } from "drizzle-orm/pg-core";

export const questions = pgTable('questions', {
    id: serial('id').primaryKey(),
    category: varchar('category', { length: 20 }).notNull(),
    difficulty: varchar('difficulty', { length: 20 }).notNull(),
    question: text('question').notNull(),
    correct_answer: text('correct_answer').notNull(),
    incorrect_answers: jsonb('incorrect_answers').notNull()
})

