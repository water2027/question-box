import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	out: './drizzle',
	schema: './server/db/schema',
	dialect: 'sqlite',
});
