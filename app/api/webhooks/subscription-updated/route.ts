import { updateProjectSubscription } from '@/app/db/operations/projects'
import { updateProjectSubscriptionRedis } from '@/app/lib/upstash'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const body = await req.json()
  try {
    const projectId = body.meta?.custom_data?.projectId
    const subscriptionStatus = body.data.attributes.status

    if (subscriptionStatus === 'expired') {
      await updateProjectSubscription({
        projectId,
        plan: 'free', // Use productId to select plan if more than one
        productId: null,
        variantId: null,
        suscriptionId: null,
        suscriptionItemId: null,
      })
      await updateProjectSubscriptionRedis({
        projectId,
        plan: 'free', // Use productId to select plan if more than one
        productId: undefined,
        variantId: undefined,
        suscriptionId: undefined,
        suscriptionItemId: undefined,
      })
    }

    return new Response('OK', { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
