import { getAuthorizationUrl, getUser } from '@/app/lib/workos'
import { Providers } from '@/app/providers'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { redirect } from 'next/navigation'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  robots: {
    index: false,
  },
}

export default async function EditorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, user } = await getUser()
  const authorizationUrl = getAuthorizationUrl()

  if (!isAuthenticated) {
    redirect(authorizationUrl)
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers
          attribute="class"
          user={user!}
          defaultTheme="system"
          enableSystem
        >
          <div className="flex min-h-dvh flex-col justify-start p-2 lg:bg-neutral-50 lg:dark:bg-neutral-800">
            <main className="mx-auto flex h-[calc(100dvh-16px)] w-full justify-center rounded-lg border bg-background shadow-sm dark:shadow-none">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
