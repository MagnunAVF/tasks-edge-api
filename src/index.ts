import { Hono } from 'hono'
import type { Connection } from '@planetscale/database'

import { checkHealth } from './handlers/health'
import {
  changeTaskStatus,
  createTask,
  deleteTaskById,
  getTaskById,
  getTasks,
  updateTaskById,
} from './handlers/tasks'
import { connectDB } from './db/client'

// Env vars
type Variables = {
  DATABASE_HOST: string
  DATABASE_USERNAME: string
  DATABASE_PASSWORD: string
  dbConn: Connection
}

const app = new Hono<{ Variables: Variables }>()

// Middleware
app.use('*', async (c, next) => {
  // before handler
  connectDB(c)

  await next()

  // after handler
})

// Routes
app.get('/', checkHealth)

app.get('/tasks', getTasks)
app.get('/tasks/:id', getTaskById)
app.post('/tasks', createTask)
app.put('/tasks/:id', updateTaskById)
app.delete('/tasks/:id', deleteTaskById)
app.put('/tasks/:id/change-status', changeTaskStatus)

export default app
