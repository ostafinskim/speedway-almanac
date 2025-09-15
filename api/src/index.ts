import { env } from '../env.ts'
import app from './server.ts'
import { pool } from './db/connection.ts'


async function startServer() {
	let client
	try {
		client = await pool.connect()
		await client.query('SELECT 1')
		console.log('✅ ----------------  DB connection established. Starting server')
		app.listen(env.PORT, () => {
			console.log(`✅ ----------------  Server running on port http://localhost:${env.PORT}`)
			console.log(`✅ ----------------  Environment: ${env.APP_STAGE}`)
		})
	} catch (err) {
		console.error('DB connection or test query failed:', err)
		process.exit(1)
	} finally {
		if (client) client.release()
	}
}

startServer()
