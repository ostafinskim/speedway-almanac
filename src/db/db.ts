import * as schema from '@/db/schema';
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	max: 10,
	idleTimeoutMillis: 30000
})

export const db = drizzle(pool, { schema, casing: 'snake_case' })

export async function testDBConnection() {
	try {
		const client = await pool.connect();
		console.log('✅ Database connected successfully');
		client.release();
		return true;
	} catch (error) {
		console.error('❌ Database connection failed:', error);
		return false;
	}
}