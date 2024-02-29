import { WorkOS } from '@workos-inc/node'
import { SignJWT } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

// Get secret
const secret = new Uint8Array(
  Buffer.from(process.env.JWT_SECRET_KEY as string, 'base64')
)

const workos = new WorkOS(process.env.WORKOS_API_KEY)
const clientId = process.env.WORKOS_CLIENT_ID

export async function GET(req: NextRequest) {
  // The authorization code returned by AuthKit
  const code = req.nextUrl.searchParams.get('code')
  const state = req.nextUrl.searchParams.get('state')

  if (!code) {
    return NextResponse.redirect('/')
  }

  if (!clientId) {
    throw new Error('WORKOS_CLIENT_ID is not defined')
  }

  const { user } = await workos.userManagement.authenticateWithCode({
    code,
    clientId,
  })

  // Cleanup params and redirect
  const url = req.nextUrl.clone()
  url.searchParams.delete('code')
  if (state) {
    url.pathname = state
    url.searchParams.delete('state')
  } else {
    url.pathname = '/'
  }

  const response = NextResponse.redirect(url)

  // Create a JWT with the user's information
  const token = await new SignJWT({
    user,
  })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('1y')
    .sign(secret)

  // Store in a cookie
  response.cookies.set({
    name: 'token',
    value: token,
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  })

  return response
}
