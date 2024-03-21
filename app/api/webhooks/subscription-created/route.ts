import { updateProjectSubscription } from '@/app/db/operations/projects'
import { updateProjectSubscriptionRedis } from '@/app/lib/upstash'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const body = await req.json()
  try {
    const projectId = body.meta?.custom_data?.projectId
    const productId = body.data.attributes.product_id
    const variantId = body.data.attributes.variant_id
    const suscriptionId = body.data.id
    const suscriptionItemId = body.data.attributes.first_subscription_item.id

    await updateProjectSubscription({
      projectId,
      plan: 'pro', // Use productId to select plan if more than one
      productId,
      variantId,
      suscriptionId,
      suscriptionItemId,
    })
    await updateProjectSubscriptionRedis({
      projectId,
      plan: 'pro', // Use productId to select plan if more than one
      productId,
      variantId,
      suscriptionId,
      suscriptionItemId,
    })

    return new Response('OK', { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
