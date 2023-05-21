import { Hono } from 'hono'

import { checkHealth } from './handlers/health'

const app = new Hono()

app.get('/', checkHealth)

export default app
