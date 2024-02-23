import { User, WorkOS } from '@workos-inc/node'
import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const workos = new WorkOS(process.env.WORKOS_API_KEY as string)
const clientId = process.env.WORKOS_CLIENT_ID
const secret = new Uint8Array(
  Buffer.from(process.env.JWT_SECRET_KEY as string, 'base64')
)

export function getAuthorizationUrl() {
  if (!clientId) {
    throw new Error('WORKOS_CLIENT_ID is not defined')
  }
  const authorizationUrl = workos.userManagement.getAuthorizationUrl({
    // Specify that we'd like AuthKit to handle the authentication flow
    provider: 'authkit',
    // The callback endpoint that WorkOS will redirect to after a user authenticates
    redirectUri: 'http://localhost:3000/api/auth/callback',
    clientId,
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
  redirect('/')
}
