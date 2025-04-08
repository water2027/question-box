import { eq } from 'drizzle-orm';
import { answersTable } from '~/server/db/schema/answer';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	let id = -1; // 问题id
	let limit = 10;
	let offset = 0;
	if (body) {
		id = body.id || -1;
		limit = body.limit || 10;
		offset = body.offset || 0;
	}
	if (id === -1) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			data: 'id is required',
		});
	}

	const { db } = event.context;
	const questions = await db
		.select({
			id: answersTable.AnswerId,
			content: answersTable.AnswerContent,
			createdAt: answersTable.CreatedAt,
		})
		.from(answersTable)
		.where(eq(answersTable.QuestionId, id))
		.limit(limit)
		.offset(offset)
		.all();
	return questions;
});
