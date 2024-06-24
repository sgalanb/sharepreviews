import { db } from '@/app/db'
import { projects } from '@/app/db/schema'
import { getUser } from '@/app/lib/workos'
import { eq } from 'drizzle-orm'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const { isAuthenticated, user } = await getUser()

  if (request.nextUrl.pathname === '/' && isAuthenticated) {
    // Don't use the cached function because it throws an error when used in the middleware.
    // "incrementalCache missing in unstable_cache"
    const userProjects = await db.query['projects'].findMany({
      where: eq(projects.userId, user?.id!),
    })
    const haveProjects = userProjects.length > 0

    if (!haveProjects) {
      return NextResponse.redirect(new URL('/create-project', request.url))
    } else {
      const firstProject = userProjects.sort((a, b) =>
        a.name.localeCompare(b.name)
      )[0]
      return NextResponse.redirect(
        new URL(`/${firstProject.pathname}`, request.url)
      )
    }
  }
}

export const config = {
  matcher: ['/'], // Only run this middleware on these paths
}
