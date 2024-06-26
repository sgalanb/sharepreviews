import { User, WorkOS } from '@workos-inc/node'
import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const workos = new WorkOS(process.env.WORKOS_API_KEY as string)
const clientId = process.env.WORKOS_CLIENT_ID
const secret = new Uint8Array(
  Buffer.from(process.env.JWT_SECRET_KEY as string, 'base64')
)
const redirectUri = process.env.WORKOS_REDIRECT_URI ?? ''

export function getAuthorizationUrl({
  screenHint,
  redirectPathname,
}: {
  screenHint: 'sign-in' | 'sign-up'
  redirectPathname?: string
}) {
  if (!clientId) {
    throw new Error('WORKOS_CLIENT_ID is not defined')
  }
  const authorizationUrl = workos.userManagement.getAuthorizationUrl({
    // Specify that we'd like AuthKit to handle the authentication flow
    provider: 'authkit',
    // Callback endpoint URL. WorkOS will redirect to this after a user authenticates with them.
    redirectUri,
    clientId,
    screenHint: screenHint ?? 'sign-in',
    state: redirectPathname,
  })

  return authorizationUrl
}

export async function getUser() {
  const token = cookies().get('token')?.value

  // Verify the JWT signature
  let verifiedToken
  try {
    if (!token) {
      return { isAuthenticated: false }
    }
    verifiedToken = await jwtVerify(token, secret)
  } catch {
    return { isAuthenticated: false }
  }

  // Return the User object if the token is valid
  return {
    isAuthenticated: true,
    user: verifiedToken.payload.user as User,
  }
}

export async function logOutUser() {
  cookies().set('token', '', {
    expires: new Date(0),
  })
}
