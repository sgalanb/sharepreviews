import { db } from '@/app/db'
import { projects } from '@/app/db/schema'
import { getAuthorizationUrl, getUser } from '@/app/lib/workos'
import { eq } from 'drizzle-orm'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { isAuthenticated, user } = await getUser()
  const authorizationUrl = getAuthorizationUrl(request.nextUrl.pathname)

  // If the user is not authenticated, redirect to login
  if (request.nextUrl.pathname !== '/' && !isAuthenticated) {
    return NextResponse.redirect(authorizationUrl)
  }
  if (request.nextUrl.pathname === '/' && isAuthenticated) {
    // Don't use the cached function because it throws an error when used in the middleware.
    // "incrementalCache missing in unstable_cache"
    const userProjects = await db.query['projects'].findMany({
      where: eq(projects.userId, user?.id!),
    })
    const firstProject = userProjects[0]

    return NextResponse.redirect(
      new URL(`/${firstProject.pathname}`, request.url)
    )
  }
}

// See "Matching Paths" below to learn more
export const config = {
  // Match all app paths
  matcher: ['/'],
}
