import { eq } from "drizzle-orm";
import { usersTable } from "~/server/db/schema/user";

export default defineEventHandler(async (event) => {
    const { db } = event.context;
    const user = await db.select().from(usersTable).all();
    console.log(user);
    return user;
});