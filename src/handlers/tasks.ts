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

  const query = `INSERT INTO tasks (title, description, priority, done) VALUES
    ('${body.title}', '${body.description}', ${body.priority}, ${body.done});`
  const data = await c.get('dbConn').execute(query)
  const id = parseInt(data.insertId)
  const task = { ...body, id }

  return c.json(task)
}

export async function updateTaskById(c: Context) {
  const id = c.req.param('id')
  const body = await c.req.json()

  const query = `UPDATE tasks
    SET title = '${body.title}', description = '${body.description}',
    priority = ${body.priority}, done = ${body.done}
    WHERE id = ${id};`
  const data = await c.get('dbConn').execute(query)

  if (data.rowsAffected !== 1) {
    c.status(500)

    return c.json({ error: 'Error in update' })
  } else {
    const task = { ...body, id: parseInt(id) }

    return c.json(task)
  }
}

export async function deleteTaskById(c: Context) {
  const id = c.req.param('id')
  const query = `DELETE FROM tasks WHERE id = ${id};`
  const data = await c.get('dbConn').execute(query)
  if (data.rowsAffected !== 1) {
    c.status(500)

    return c.json({ error: 'Error in delete task' })
  } else {
    return c.json({ success: "OK" })
  }
}

export async function changeTaskStatus(c: Context) {
  const id = c.req.param('id')
  const body = await c.req.json()

  const query = `UPDATE tasks
    SET done = ${body.done} WHERE id = ${id};`
  const data = await c.get('dbConn').execute(query)

  if (data.rowsAffected !== 1) {
    c.status(500)

    return c.json({ error: 'Error in status update' })
  } else {
    return c.json({ success: "OK" })
  }
}
