import express, { Request, Response } from 'express';
import { rider } from './routes/rider';

const app = express();

app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ msg: 'Hello World' });
})

app.use('/api/v1/rider', rider)

export default app;