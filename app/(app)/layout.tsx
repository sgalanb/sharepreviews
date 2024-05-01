import { getUserProjects } from '@/app/db/operations/projects'
import { getAuthorizationUrl, getUser } from '@/app/lib/workos'
import { Providers } from '@/app/providers'
import HeaderApp from '@/app/ui/header-app'
import HeaderMobile from '@/app/ui/header-mobile'
import { get } from '@vercel/edge-config'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { redirect } from 'next/navigation'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SharePreviews',
  robots: {
    index: false,
  },
}

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, user } = await getUser()
  const authorizationUrl = getAuthorizationUrl({ screenHint: 'sign-up' })

  if (!isAuthenticated) {
    redirect(authorizationUrl)
  }

  const reservedNames = (await get('reserved-project-names')) as string[]

  const userProjects = await getUserProjects(user?.id ?? '')

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers
          attribute="class"
          user={user!}
          defaultTheme="system"
          enableSystem
        >
          <div className="flex min-h-dvh flex-col justify-between">
            <div
              className="flex flex-col justify-start lg:grid lg:grid-cols-[256px,1fr] lg:bg-neutral-50 lg:bg-noise lg:dark:bg-neutral-800"
              style={{
                backgroundBlendMode: 'overlay',
              }}
            >
              <HeaderMobile
                isAuthenticated={isAuthenticated}
                authorizationUrl={authorizationUrl}
                user={user}
                userProjects={userProjects}
                isApp={true}
                reservedNames={reservedNames}
              />
              <HeaderApp
                isAuthenticated={isAuthenticated}
                user={user}
                userProjects={userProjects}
                reservedNames={reservedNames}
              />
              <main className="mx-auto w-full rounded-md lg:pb-2 lg:pr-2 lg:pt-2">
                <div className="mx-auto w-full rounded-md lg:flex lg:min-h-full lg:justify-center lg:border lg:bg-background lg:shadow-sm dark:lg:shadow-none">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
