import { questionsTable } from '~/server/db/schema/question';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	let limit = 10;
	let offset = 0;
	if (body) {
		limit = body.limit || 10;
		offset = body.offset || 0;
	}

	const { db } = event.context;
	const questions = await db
		.select({
			id: questionsTable.QuestionId,
			title: questionsTable.QuestionTitle,
			createdAt: questionsTable.CreatedAt,
		})
		.from(questionsTable)
		.limit(limit)
		.offset(offset)
		.all();
	return questions;
});
