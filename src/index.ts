import { Hono } from 'hono'

import { checkHealth } from './handlers/health'
import {
  changeTaskStatus,
  createTask,
  deleteTaskById,
  getTaskById,
  getTasks,
  updateTaskById,
} from './handlers/tasks'

const app = new Hono()

app.get('/', checkHealth)

app.get('/tasks', getTasks)
app.get('/tasks/:id', getTaskById)
app.post('/tasks', createTask)
app.put('/tasks/:id', updateTaskById)
app.delete('/tasks/:id', deleteTaskById)
app.put('/tasks/:id/change-status', changeTaskStatus)

export default app
