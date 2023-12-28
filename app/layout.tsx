import { Providers } from '@/app/providers'
import Header from '@/app/ui/header'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SharePreviews',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col justify-between bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
            <div className="flex flex-col justify-start">
              <Header />
              <main className="mx-auto w-full max-w-7xl">{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
