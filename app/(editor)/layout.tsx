import { getUser } from '@/app/lib/workos'
import { Providers } from '@/app/providers'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, user } = await getUser()

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-dvh flex-col justify-start p-2 lg:bg-neutral-50 lg:dark:bg-neutral-800">
            <main className="mx-auto flex min-h-[calc(100dvh-16px)] w-full justify-center rounded-lg border bg-background shadow-sm dark:shadow-none">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
