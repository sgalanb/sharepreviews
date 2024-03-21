import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: varchar('id', { length: 31 }).primaryKey().notNull(), // ID format of WorkOS
  email: varchar('email', { length: 255 }).notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  emailVerified: boolean('email_verified'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
})
export type UserType = typeof users.$inferInsert

export const projects = pgTable('projects', {
  id: uuid('uuid').defaultRandom().primaryKey().notNull(),
  name: text('name').notNull(),
  pathname: text('pathname').notNull().unique(),
  plan: text('plan').default('free'), // 'free' or 'pro'
  productId: text('product_id'), // Lemon Squeezy product ID
  variantId: text('variant_id'), // Lemon Squeezy variant ID
  suscriptionId: text('suscription_id'), // Lemon Squeezy subscription ID
  suscriptionItemId: text('suscription_item_id'), // Lemon Squeezy subscription item ID
  imagesCreated: integer('images_created').default(0).notNull(), // Number of images created (historical)
  userId: varchar('user_id', { length: 31 }) // ID of the project owner
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
})
export type ProjectType = typeof projects.$inferInsert

// Templates are also stored on upstash for quick retrieval.
export const templates = pgTable('templates', {
  id: uuid('uuid').defaultRandom().primaryKey().notNull(),
  name: text('name').notNull(),
  projectId: uuid('project_id')
    .references(() => projects.id)
    .notNull(),
  layersData: text('layersData').notNull(), // JSON data
  canvasBackgroundColor: text('canvasBackgroundColor')
    .default('#ffffff')
    .notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
})

export type TemplateType = typeof templates.$inferInsert

export const uploadedImages = pgTable('uploaded_images', {
  id: uuid('uuid').defaultRandom().primaryKey(),
  key: text('key').notNull(),
  url: text('url').notNull(),
  userId: varchar('user_id', { length: 31 })
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
})
