import env from '../env.ts';
import { app } from './server.ts';

async function main() {
	try {
		app.listen(env.PORT, () => {
			console.log(`Server running on port ${env.PORT}`)
			console.log(`Environment: ${env.APP_STAGE}`)
		})
	} catch (error) {
		console.error(error.message)
		process.exit(1)
	}
}

main();