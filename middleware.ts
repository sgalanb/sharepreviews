import { getAuthorizationUrl, getUser } from '@/app/lib/workos'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { isAuthenticated, user } = await getUser()
  const authorizationUrl = getAuthorizationUrl(request.nextUrl.pathname)

  console.log(isAuthenticated)
  // If the user is not authenticated, redirect to login
  if (request.nextUrl.pathname !== '/' && !isAuthenticated) {
    return NextResponse.redirect(authorizationUrl)
  }
  if (request.nextUrl.pathname === '/' && isAuthenticated) {
    return NextResponse.redirect(new URL('/overview', request.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  // Match all app paths
  matcher: [
    '/',
    '/overview',
    '/validator',
    '/validator/:path*',
    '/generator',
    '/generator/:path*',
  ],
}
