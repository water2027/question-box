import { eq } from 'drizzle-orm';
import { answersTable } from '~/server/db/schema/answer';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    let id = -1; // 问题id
    if (body) {
        id = body.id || -1;
    }
    if (id === -1) {
        return {}
    }

    const { db } = event.context;
    
    // Delete the answer with the specified ID
    const result = await db.delete(answersTable)
        .where(eq(answersTable.AnswerId, id))
        .returning();
    
    return { success: true, deleted: result };
});