import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema.ts'
import { env, isProd } from '../../env.ts'
import { remember } from '@epic-web/remember'

const createPool = () => {
	const pool = new Pool({
		connectionString: env.DATABASE_URL
	})
	pool.on('connect', () => {
		console.log('✅ Database connected')
	})
	pool.on('error', (err) => {
		console.error('❌ Database connection error:', err)
	})
	return pool
}

let client

if (isProd) {
	client = createPool()
} else {
	client = remember('dbPool', () => createPool())
}

export const db = drizzle({ client, schema })
export default db