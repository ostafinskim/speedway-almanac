import { testDBConnection } from '@/db/db'
import { auth } from '@/lib/auth'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

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

app
  .on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw))
  .get('/', (c) => {
    return c.text('Hello Hono!')
  })

// test db connection
testDBConnection()

export default {
  port,
  fetch: app.fetch,
}
