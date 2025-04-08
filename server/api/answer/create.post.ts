import { answersTable } from '~/server/db/schema/answer';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const { answer } = body;
	if (!answer) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			message: '缺少参数',
		});
	}
	const { db } = event.context;
	try {
		await db.insert(answersTable).values({
			QuestionId: answer.questionId,
			AnswerContent: answer.content,
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
