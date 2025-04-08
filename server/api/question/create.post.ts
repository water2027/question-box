import { questionsTable } from '~/server/db/schema/question';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const { question } = body;
	if (!question) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: '缺少参数',
		});
	}
	const { db } = event.context;
	try {
		await db.insert(questionsTable).values({
			QuestionTitle: question.title,
			QuestionContent: question.content,
		});
	} catch (error) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Internal Server Error',
			message: '数据库错误',
		});
	}
	return {
		status: 'success',
	};
});
