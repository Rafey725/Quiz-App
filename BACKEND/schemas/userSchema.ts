import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    username: varchar('username', { length: 255 }).notNull().default(''),
    email: varchar('email', { length: 255 }).unique().notNull(),
    password_hash: text('password_hash').notNull(),
    created_at: timestamp('created_at').defaultNow()
})