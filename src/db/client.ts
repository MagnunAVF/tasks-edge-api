import { connect } from '@planetscale/database'
import type { Connection } from '@planetscale/database'
import { Context } from 'hono'

export function createConnection(c: Context): Connection {
  const config = {
    host: c.env.DATABASE_HOST,
    username: c.env.DATABASE_USERNAME,
    password: c.env.DATABASE_PASSWORD,
    fetch: (url: any, init: any) => {
      delete init['cache']
      return fetch(url, init)
    },
  }

  return connect(config)
}

export function connectDB(c: Context) {
  const conn = createConnection(c)

  c.set('dbConn', conn)
}
