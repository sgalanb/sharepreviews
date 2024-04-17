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

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = await getUser()
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
          <div className="flex h-fit min-h-dvh flex-col items-center justify-start">
            <Header
              authorizationUrl={authorizationUrl}
              isApp={false}
              user={user}
            />
            <main className="mx-auto h-full w-full max-w-7xl">{children}</main>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
