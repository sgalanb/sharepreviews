import { loadEnvConfig } from '@next/env'
import type { Config } from 'drizzle-kit'
import { cwd } from 'node:process'

loadEnvConfig(cwd())

export default {
  schema: './app/db/schema.ts',
  out: './drizzle',
  driver: 'mysql2',
  dbCredentials: {
    uri: process.env.DATABASE_URL?.replace(
      '?sslaccept=strict',
      `?ssl={"rejectUnauthorized":true}`
    ) as string,
  },
} satisfies Config
