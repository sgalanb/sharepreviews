import type { z } from 'zod'

export function getParse<T>(schema: z.Schema<T>) {
  if (process.env.NODE_ENV !== 'production') {
    return schema.parse
  }
  return (val: T) => val
}
