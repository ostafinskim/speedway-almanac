import { Hono } from 'hono'
import { testDBConnection } from './db/db'

const port = process.env.PORT || 3000

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// test db connection
testDBConnection()

export default {
  port,
  fetch: app.fetch,
}
