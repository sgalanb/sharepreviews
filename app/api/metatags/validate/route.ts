import { getValidatedMetatags } from '@/app/api/metatags/validate/utils'
import { ratelimit } from '@/app/lib/upstash'
import { isValidUrl } from '@/app/utils'
import { ipAddress } from '@vercel/edge'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')
  if (!url || !isValidUrl(url)) {
    return new Response('Invalid URL', { status: 400 })
  }

  // We'll use the user's IP address to rate limit the requests
  const ip = ipAddress(req) ?? ''
  const { success } = await ratelimit().limit(ip)
  if (!success) {
    return new Response("You've hit the rate limit", { status: 429 })
  }

  // If the URL is valid and the request gets permission from the ratelimit, we'll fetch the metatags and return them
  const validatedMetatags = await getValidatedMetatags(url)
  return new Response(JSON.stringify(validatedMetatags), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
    },
  })
}
