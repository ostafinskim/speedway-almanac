import { testDBConnection } from '@/db/db'
import { auth } from '@/lib/auth'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { clubs } from './routes/club-routes'
import { riders } from './routes/rider-routes'

const port = process.env.PORT || 3000

const app = new Hono()

app.use(
  "/api/auth/*", // or replace with "*" to enable cors for all routes
  cors({
    origin: "http://localhost:5555", // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.on(['POST', 'GET'], '/api/auth/*', (c) => auth.handler(c.req.raw))

// Custom routes
app.route('/api/v1/club', clubs)
app.route('/api/v1/rider', riders)

// test db connection
testDBConnection()

export default {
  port,
  fetch: app.fetch,
}
