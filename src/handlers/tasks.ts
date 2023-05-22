import { Context } from 'hono'
import { Task } from '../models/task'

export async function getTasks(c: Context) {
  const data = await c.get('dbConn').execute('SELECT * FROM tasks;')
  let tasks = data.rows

  tasks = tasks.map((task: Task) => {
    const done = task.done === 1

    return { ...task, done }
  })

  return c.json(tasks)
}

export async function getTaskById(c: Context) {
  const id = c.req.param('id')
  const query = `SELECT * FROM tasks WHERE id=${id} LIMIT 1;`
  const data = await c.get('dbConn').execute(query)

  if (data.rows.length === 0) {
    c.status(404)

    return c.json({ error: 'Task not found' })
  } else {
    const task = data.rows[0]
    task.done = task.done === 1

    return c.json(task)
  }
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
