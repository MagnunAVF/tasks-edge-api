import { Context } from 'hono'

export function checkHealth(c: Context) {
  return c.json({ status: 'OK' })
}
