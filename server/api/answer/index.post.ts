import { eq, and, lte } from 'drizzle-orm';
import { answersTable } from '~/server/db/schema/answer';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	let id = -1; // 问题id
	let cursor = 0;
	let limit = 10;
	if (body) {
		id = body.id || -1;
		limit = parseInt(body.limit as string, 10) || 10;
		cursor = parseInt(body.cursor as string, 10) || 0;
	}
	if (id === -1 || cursor === 0) {
		return {}
	}

	const { db } = event.context;
	const answers = await db
		.select({
			id: answersTable.AnswerId,
			content: answersTable.AnswerContent,
			createdAt: answersTable.CreatedAt,
		})
		.from(answersTable)
		.where(
			and(
				eq(answersTable.QuestionId, id),
				lte(answersTable.AnswerId, cursor)
			)
		)
		.limit(limit);
	return answers;
});
