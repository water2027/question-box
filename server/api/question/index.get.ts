import { questionsTable } from '~/server/db/schema/question';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
	let { id } = getQuery(event);
	id = parseInt(id as string, 10);
	if (isNaN(id)) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: '无效的参数',
		});
	}
	const { db } = event.context;

	const question = await db
		.select({
			id: questionsTable.QuestionId,
			title: questionsTable.QuestionTitle,
			content: questionsTable.QuestionContent,
			createdAt: questionsTable.CreatedAt,
		})
		.from(questionsTable)
		.where(eq(questionsTable.QuestionId, id))
		.get();
	if (!question) {
		return {};
	}

	return question;
});
