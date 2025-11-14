import * as schema from '@/db/schema';
import { asc, isNull } from 'drizzle-orm';
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

export async function listUsers() {
	return await db.select({
		id: schema.user.id,
		name: schema.user.name,
		email: schema.user.email,
		role: schema.user.role,
		createdAt: schema.user.createdAt,
	}).from(schema.user).orderBy(asc(schema.user.name));
}

export async function updateExistingUsersRole() {
	await db.update(schema.user).set({ role: 'user' }).where(isNull(schema.user.role));
	console.log('Updated existing users with default role "user"');
}