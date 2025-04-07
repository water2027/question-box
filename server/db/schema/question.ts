import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const questionsTable = sqliteTable('questions', {
    QuestionId: int().primaryKey({ autoIncrement: true }),
    QuestionTitle: text().notNull(),
    QuestionContent: text().notNull(),
    CreatedAt: text().default(sql`CURRENT_TIMESTAMP`)
});
