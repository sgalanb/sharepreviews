import { loadEnvConfig } from '@next/env'
import type { Config } from 'drizzle-kit'
import { cwd } from 'node:process'

loadEnvConfig(cwd())

export default {
  schema: './app/db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.NEON_POSTGRES_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config
