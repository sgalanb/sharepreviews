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

  // Rate limit if user is not logged in
  //   const session = await getToken({
  //     req,
  //     secret: process.env.NEXTAUTH_SECRET,
  //   });
  //if (!session?.email) {
  const ip = ipAddress(req) ?? ''
  const { success } = await ratelimit().limit(ip)
  if (!success) {
    return new Response("You've hit the rate limit", { status: 429 })
  }
  //}

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
