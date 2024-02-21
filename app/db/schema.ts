import {
  boolean,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core'

export const users = pgTable(
  'users',
  {
    id: varchar('id', { length: 31 }).primaryKey(),
    email: varchar('email', { length: 255 }).notNull(),
    firstName: text('first_name'),
    lastName: text('last_name'),
    emailVerified: boolean('email_verified'),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').notNull(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(users.email),
    }
  }
)

export type UserType = typeof users.$inferInsert
