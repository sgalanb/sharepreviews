import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: varchar('id', { length: 31 }).primaryKey(), // ID format of WorkOS
  email: varchar('email', { length: 255 }).notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  emailVerified: boolean('email_verified'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
})
export type UserType = typeof users.$inferInsert

export const projects = pgTable('projects', {
  id: uuid('uuid').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  pathname: text('pathname').notNull().unique(),
  userId: varchar('user_id', { length: 31 })
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
})
export type ProjectType = typeof projects.$inferInsert
