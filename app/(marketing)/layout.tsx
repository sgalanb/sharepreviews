import { getAuthorizationUrl, getUser } from '@/app/lib/workos'
import { Providers } from '@/app/providers'
import Header from '@/app/ui/header'
import { Analytics } from '@vercel/analytics/react'
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

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-dvh flex-col justify-between">
            <div className="flex flex-col justify-start">
              <Header
                authorizationUrl={authorizationUrl}
                isApp={false}
                user={user}
              />
              <main className="mx-auto h-[calc(100vh-72px)] w-full max-w-7xl">
                {children}
              </main>
            </div>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
