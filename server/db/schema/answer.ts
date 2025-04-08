import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const answersTable = sqliteTable('answers', {
    AnswerId: int().primaryKey({ autoIncrement: true }),
    QuestionId: int().notNull(),
    AnswerContent: text().notNull(),
    CreatedAt: text().default(sql`CURRENT_TIMESTAMP`)
});
