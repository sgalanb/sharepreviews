import {
  boolean,
  datetime,
  mysqlTable,
  text,
  varchar,
} from 'drizzle-orm/mysql-core'

export const users = mysqlTable('users', {
  id: varchar('id', { length: 31 }).primaryKey(),
  email: varchar('email', { length: 255 }),
  firstName: text('first_name'),
  lastName: text('last_name'),
  emailVerified: boolean('email_verified'),
  createdAt: datetime('created_at', { mode: 'date' }),
  updatedAt: datetime('updated_at', { mode: 'date' }),
})
