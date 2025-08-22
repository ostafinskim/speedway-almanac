import env from '../env.ts';
import { app } from './server.ts';

async function main() {
	try {
		app.listen(env.PORT, () => {
			console.log(`http://localhost:${env.PORT}`)
			console.log('NODE_ENV:', process.env.NODE_ENV);
			console.log('APP_STAGE:', process.env.APP_STAGE);
		})
	} catch (error) {
		console.error(error.message)
		process.exit(1)
	}
}

main();