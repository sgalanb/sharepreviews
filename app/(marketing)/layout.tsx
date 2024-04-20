import { getAuthorizationUrl, getUser } from '@/app/lib/workos'
import { Providers } from '@/app/providers'
import HeaderMarketing from '@/app/ui/header-marketing'
import HeaderMobile from '@/app/ui/header-mobile'
import { Analytics } from '@vercel/analytics/react'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'sharepreviews',
}

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, user } = await getUser()
  const authorizationUrl = getAuthorizationUrl()

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers
          attribute="class"
          user={user!}
          defaultTheme="system"
          enableSystem
        >
          <div
            className="flex h-fit min-h-dvh flex-col items-center justify-start lg:bg-neutral-50 lg:p-2 lg:dark:bg-neutral-800"
            style={{
              backgroundImage: 'url(/noise-light.png)',
              backgroundBlendMode: 'overlay',
            }}
          >
            <main className="mx-auto h-full w-full max-w-5xl lg:rounded-md lg:border lg:bg-background lg:shadow-sm dark:lg:shadow-none ">
              <HeaderMobile
                isAuthenticated={isAuthenticated}
                user={user}
                authorizationUrl={authorizationUrl}
                isApp={false}
              />
              <HeaderMarketing
                isAuthenticated={isAuthenticated}
                user={user}
                authorizationUrl={authorizationUrl}
              />
              {children}
            </main>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
