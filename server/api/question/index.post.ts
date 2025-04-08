import { questionsTable } from '~/server/db/schema/question';
import { lte, desc } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	let limit = 10;
	let cursor = 0;
	if (body) {
		limit = parseInt(body.limit as string, 10) || 10;
		cursor = parseInt(body.cursor as string, 10) || 0;
	}
	if (cursor === 0) {
		return [];
	}
	const { db } = event.context;
	const questions = await db
		.select({
			id: questionsTable.QuestionId,
			title: questionsTable.QuestionTitle,
			createdAt: questionsTable.CreatedAt,
		})
		.from(questionsTable)
		.where(lte(questionsTable.QuestionId, cursor))
		.orderBy(desc(questionsTable.QuestionId))
		.limit(limit)
	return questions;
});
