import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
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
import { taskSchema } from './validators/tasks'

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
app.delete('/tasks/:id', deleteTaskById)
app.post('/tasks', zValidator('json', taskSchema), createTask)
app.put('/tasks/:id', zValidator('json', taskSchema), updateTaskById)
app.put('/tasks/:id/change-status', changeTaskStatus)

export default app
