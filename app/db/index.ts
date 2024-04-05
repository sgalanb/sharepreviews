import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

const sql = neon(process.env.NEON_POSTGRES_URL!) as any

export const db = drizzle(sql, { schema })
