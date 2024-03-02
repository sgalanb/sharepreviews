import {
  boolean,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

export const users = pgTable(
  'users',
  {
    id: varchar('id', { length: 31 }).primaryKey(), // ID format of WorkOS
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

export const projects = pgTable('projects', {
  id: uuid('uuid').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  userId: varchar('user_id', { length: 31 })
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
})
export type ProjectType = typeof projects.$inferInsert
