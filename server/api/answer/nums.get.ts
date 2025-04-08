import { sql } from 'drizzle-orm';
import { eq } from 'drizzle-orm/expressions';
import { answersTable } from '~/server/db/schema/answer';

export default defineEventHandler(async (event) => {
	let { id } = getQuery(event);
	if (!id) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Bad Request',
			data: 'id is required',
		});
	}
	id = parseInt(id as string, 10);
	const { db } = event.context;
	// 返回问题id为id的所有答案中的最大答案id
	const result = await db
		.select({
			maxAnswerId: sql`MAX(${answersTable.AnswerId})`,
		})
		.from(answersTable)
		.where(eq(answersTable.QuestionId, id));

	return result[0].maxAnswerId || 0; // 如果没有答案，返回null
});
