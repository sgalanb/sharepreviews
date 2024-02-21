import { db } from '@/app/db'
import { users } from '@/app/db/schema'
import WorkOS from '@workos-inc/node'
import { eq } from 'drizzle-orm'
import { NextRequest } from 'next/server'

type TypeEventType = 'user.created' | 'user.updated' | 'user.deleted'

type TypeEventUserData = {
  id: string
  email: string
  first_name: string
  last_name: string
  email_verified: boolean
  created_at: string
  updated_at: string
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const eventType = body.event as TypeEventType
  const eventUserData = body.data as TypeEventUserData
  const workos = new WorkOS(process.env.WORKOS_API_KEY)
  const sigHeader = req.headers.get('WorkOS-Signature') || ''

  const webhook = workos.webhooks.verifyHeader({
    payload: body,
    sigHeader: sigHeader,
    secret: process.env.WORKOS_USER_EVENTS_WEBHOOK_SECRET!,
  })

  if (!webhook) return new Response('Unauthorized', { status: 401 })

  try {
    // Check if a user with this ID exists in the DB
    const user = await db.query['users'].findFirst({
      where: eq(users.id, eventUserData.id),
    })

    // If the user doesn't exist in the DB and the event is a creation, add the new user to the DB
    if (!user && eventType === 'user.created') {
      await db.insert(users).values({
        id: eventUserData.id,
        email: eventUserData.email,
        firstName: eventUserData.first_name,
        lastName: eventUserData.last_name,
        emailVerified: eventUserData.email_verified,
        updatedAt: new Date(eventUserData.updated_at),
      })
    }

    // If the user exists in the DB and the event is an update, update the user in the DB
    if (!!user && eventType === 'user.updated') {
      const test = await db
        .update(users)
        .set({
          email: eventUserData.email,
          firstName: eventUserData.first_name,
          lastName: eventUserData.last_name,
          emailVerified: eventUserData.email_verified,
          updatedAt: new Date(eventUserData.updated_at),
        })
        .where(eq(users.id, eventUserData.id))
      console.log(test)
    }

    // If the user exists in the DB and the event is a deletion, delete the user from the DB
    if (!!user && eventType === 'user.deleted') {
      await db.delete(users).where(eq(users.id, eventUserData.id))
    }

    // If the user doesn't exist in the DB and the event is an update or deletion (which shouldn't happen), return an error response so the webhook fails and WorkOS notifies us
    if (!user && eventType !== 'user.created') {
      return new Response('User not found', { status: 404 })
    }
    if (!user && eventType === 'user.deleted') {
      return new Response('User not found', { status: 404 })
    }

    return new Response('OK', { status: 200 })
  } catch (e) {
    console.log(e)
    return new Response('Endpoint error', { status: 500 })
  }
}
