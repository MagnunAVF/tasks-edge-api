import { Context } from 'hono'

export async function getTasks(c: Context) {
  return c.json({ route: 'get tasks' })
}

export async function getTaskById(c: Context) {
  const id = c.req.param('id')

  return c.json({ route: 'get task', id })
}

export async function createTask(c: Context) {
  const body = await c.req.json()

  return c.json({ route: 'create task', body })
}

export async function updateTaskById(c: Context) {
  const id = c.req.param('id')
  const body = await c.req.json()

  return c.json({ route: 'get task', id, body })
}

export async function deleteTaskById(c: Context) {
  const id = c.req.param('id')

  return c.json({ route: 'delete task', id })
}

export async function changeTaskStatus(c: Context) {
  const id = c.req.param('id')
  const body = await c.req.json()

  return c.json({ route: 'change task status', id, body })
}
