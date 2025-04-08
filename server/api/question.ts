// import { usersTable } from '~/server/db/schema/user';
import { questionsTable } from '../db/schema/question';
import { eq } from 'drizzle-orm';

import { H3Event, EventHandlerRequest } from 'h3';

const getHandler = async (event: H3Event<EventHandlerRequest>) => {
	// 获取查询参数
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
	// 查询数据
	const question = await db
		.select({
			QuestionId: questionsTable.QuestionId,
			Title: questionsTable.QuestionTitle,
			Content: questionsTable.QuestionContent,
			CreatedAt: questionsTable.CreatedAt,
		})
		.from(questionsTable)
		.where(eq(questionsTable.QuestionId, id))
		.get();
	return question;
};

const postHandler = async (event: H3Event<EventHandlerRequest>) => {
	try {
		// 获取body参数
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
				QuestionId: questionsTable.QuestionId,
				Title: questionsTable.QuestionTitle,
				Content: questionsTable.QuestionContent,
				CreatedAt: questionsTable.CreatedAt,
			})
			.from(questionsTable)
			.limit(limit)
			.offset(offset)
			.all();
		return questions;
	} catch (error) {
		throw createError({
			statusCode: 500,
			statusMessage: '服务器内部错误',
			message: '获取用户数据时发生错误',
		});
	}
};

const handlers = {
	GET: getHandler,
	POST: postHandler,
};

export default defineEventHandler(async (event) => {
	const handler = handlers[event.node.req.method as keyof typeof handlers];
	if (!handler) {
		setResponseStatus(event, 405); // Method Not Allowed
		return { message: 'Method Not Allowed' };
	}
	const response = await handler(event);
	setResponseHeaders(event, {
		Connection: 'close',
		'Content-Type': 'application/json',
	});
	return response;
});
