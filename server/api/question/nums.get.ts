import { sql } from 'drizzle-orm';
import { questionsTable } from '~/server/db/schema/question';

export default defineEventHandler(async (event) => {
    const { db } = event.context;
    const maxIdResult = await db
    .select({
      maxId: sql`MAX(${questionsTable.QuestionId})`
    })
    .from(questionsTable);
  
  const maxId = maxIdResult[0].maxId;
  console.log('Max QuestionId:', maxId); // Log the max QuestionId for debugging
  return maxId || 0;
});
