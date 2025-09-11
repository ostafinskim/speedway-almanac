import cors from 'cors'
import express, { type Request, type Response } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { env, isDev, isTestEnv } from '../env.ts'

const app = express()

app.use(helmet())
app.use(
	cors({
		origin: env.CORS_ORIGIN,
		credentials: true,
	})
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev', { skip: () => isTestEnv() }))

app.get('/health', (req: Request, res: Response) => {
	res.status(200).json({
		status: 'OK',
		timestamp: new Date().toISOString(),
		service: 'Speedway Almanac API',
	})
})

export { app }
export default app