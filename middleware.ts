import { createStartWithProProject } from '@/app/actions/actions'
import { suscribeToProAction } from '@/app/actions/lemonActions'
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

  if (request.nextUrl.pathname === '/start-with-pro' && isAuthenticated) {
    const { user } = await getUser()

    const checkoutUrl = await createStartWithProProject({
      userId: user?.id!,
    }).then(async (project) => {
      // Redirect to Lemon Squeezy checkout with user data pre-filled
      return await suscribeToProAction({
        projectId: project.id,
        userId: user?.id!,
        email: user?.email!,
        name: `${user?.firstName} ${user?.lastName}`,
        returnInteadOfRedirect: true,
      })
    })

    return NextResponse.redirect(checkoutUrl)
  }
}

export const config = {
  matcher: ['/', '/start-with-pro'], // Only run this middleware on these paths
}
