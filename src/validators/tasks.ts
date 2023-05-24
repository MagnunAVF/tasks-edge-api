import { z } from 'zod'

export const taskSchema = z.object({
  title: z.string(),
  description: z.string(),
  priority: z.number(),
  done: z.boolean(),
})

export const updateTaskStatusSchema = z.object({
  done: z.boolean(),
})
