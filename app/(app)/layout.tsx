import { getUserProjects } from '@/app/db/operations/projects'
import { getAuthorizationUrl, getUser } from '@/app/lib/workos'
import { Providers } from '@/app/providers'
import Header from '@/app/ui/header'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'sharepreviews',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, user } = await getUser()
  const authorizationUrl = getAuthorizationUrl()

  const userProjects = await getUserProjects(user?.id ?? '')

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-dvh flex-col justify-between">
            <div className="flex flex-col justify-start lg:grid lg:grid-cols-[256px,1fr] lg:bg-neutral-50 lg:dark:bg-neutral-800">
              <Header
                authorizationUrl={authorizationUrl}
                isApp
                user={user}
                userProjects={userProjects}
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
