import { getAuthorizationUrl, getUser } from '@/app/lib/workos'
import { Providers } from '@/app/providers'
import Header from '@/app/ui/header'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'sharepreviews',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authorizationUrl = getAuthorizationUrl()
  const { isAuthenticated, user } = await getUser()

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-dvh flex-col justify-between">
            <div
              className={`${
                isAuthenticated
                  ? 'lg:grid lg:grid-cols-[256px,1fr] lg:bg-neutral-50 lg:dark:bg-neutral-800'
                  : ''
              } flex flex-col justify-start`}
            >
              <Header
                authorizationUrl={authorizationUrl}
                isAuthenticated={isAuthenticated}
                user={user}
              />
              {isAuthenticated ? (
                <main className="mx-auto w-full max-w-7xl">{children}</main>
              ) : (
                <main className="mx-auto w-full rounded-lg lg:pb-2 lg:pr-2 lg:pt-2">
                  <div className="mx-auto w-full rounded-lg lg:flex lg:min-h-full lg:justify-center lg:border lg:bg-background lg:shadow-sm dark:lg:shadow-none">
                    {children}
                  </div>
                </main>
              )}
            </div>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
