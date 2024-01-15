import { WorkOS } from '@workos-inc/node'
import { jwtVerify } from 'jose'

const workos = new WorkOS(process.env.WORKOS_API_KEY)
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

/* 
  Because RSC allows running code on the server, you can
  call `getAuthorizationUrl()` directly within a server component:

  function SignInButton() {
    const authorizationUrl = getAuthorizationUrl();
    return <a href={authorizationUrl}>Sign In</a>;
  }
*/

export async function getUser(cookies: any) {
  const token = cookies().get('token').value

  // Verify the JWT signature
  let verifiedToken
  try {
    verifiedToken = await jwtVerify(token, secret)
  } catch {
    return { isAuthenticated: false }
  }

  // Return the User object if the token is valid
  return {
    isAuthenticated: true,
    user: verifiedToken.payload.user,
  }
}

/* 
  Because RSC allows running code on the server, you can
  call `getUser()` directly within a server component:

  function SignInButton() {
    const { isAuthenticated } = getUser();
    return <button>{isAuthenticated ? "Sign Out" : "Sign In"}</button>;
  }
*/
