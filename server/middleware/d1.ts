import { drizzle, DrizzleD1Database } from 'drizzle-orm/d1';
import { questionsTable } from '../db/schema/question';
import { answersTable } from '~/server/db/schema/answer';

const schema = {
	questionsTable,
	answersTable,
};

declare module 'h3' {
	interface H3EventContext {
		db: DrizzleD1Database<typeof schema>;
	}
}

let cloudflare: DrizzleD1Database<typeof schema> | undefined;

export default defineEventHandler(async ({ context }) => {
	cloudflare = context.cloudflare || cloudflare;
	// 这里之所以是 DB 是因为我们在 `wrangler.toml` 里把 binding 设置为了 "DB"
	const { DB } = (context.cloudflare || cloudflare).env;
	context.db = drizzle(DB, { schema });
});
