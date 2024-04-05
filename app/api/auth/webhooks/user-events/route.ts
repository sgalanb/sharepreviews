import {
  createDbUser,
  deleteDbUser,
  getDbUserById,
  updateDbUser,
} from '@/app/db/operations/users'
import WorkOS from '@workos-inc/node'
import { NextRequest } from 'next/server'

type TypeEventType = 'user.created' | 'user.updated' | 'user.deleted'

export type TypeEventUserData = {
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
    const user = await getDbUserById(eventUserData.id)

    // If the user doesn't exist in the DB and the event is a creation, add the new user to the DB
    if (!user && eventType === 'user.created') {
      await createDbUser(eventUserData)
    }

    // If the user exists in the DB and the event is an update, update the user in the DB
    if (!!user && eventType === 'user.updated') {
      await updateDbUser(eventUserData)
    }

    // If the user exists in the DB and the event is a deletion, delete the user from the DB
    if (!!user && eventType === 'user.deleted') {
      await deleteDbUser(eventUserData.id)
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
