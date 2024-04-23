import { TypeEventUserData } from '@/app/api/auth/webhooks/user-events/route'
import { db } from '@/app/db'
import { users } from '@/app/db/schema'
import { count, eq } from 'drizzle-orm'

export async function getDbUserById(id: string) {
  return await db.query['users'].findFirst({
    where: eq(users.id, id),
  })
}

export async function getAllUsersCount() {
  const usersCount = await db.select({ count: count() }).from(users)
  return usersCount[0].count - 1 // Exclude the local test user
}

export async function createDbUser(eventUserData: TypeEventUserData) {
  return await db.insert(users).values({
    id: eventUserData.id,
    email: eventUserData.email,
    firstName: eventUserData.first_name,
    lastName: eventUserData.last_name,
    emailVerified: eventUserData.email_verified,
    updatedAt: new Date(eventUserData.updated_at),
  })
}

export async function updateDbUser(eventUserData: TypeEventUserData) {
  return await db
    .update(users)
    .set({
      email: eventUserData.email,
      firstName: eventUserData.first_name,
      lastName: eventUserData.last_name,
      emailVerified: eventUserData.email_verified,
      updatedAt: new Date(eventUserData.updated_at),
    })
    .where(eq(users.id, eventUserData.id))
}

export async function deleteDbUser(id: string) {
  return await db.delete(users).where(eq(users.id, id))
}
