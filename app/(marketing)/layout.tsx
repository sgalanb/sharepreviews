import { Providers } from '@/app/providers'
import HeaderMobile from '@/app/ui/header-mobile'
import { Analytics } from '@vercel/analytics/react'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SharePreviews',
}

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <div
            className="flex h-fit min-h-dvh flex-col items-center justify-start lg:bg-neutral-50 lg:bg-noise lg:p-2 lg:dark:bg-neutral-800"
            style={{
              backgroundBlendMode: 'overlay',
            }}
          >
            <main className="mx-auto h-full w-full max-w-5xl lg:rounded-md lg:border lg:bg-background lg:shadow-sm dark:lg:shadow-none ">
              <HeaderMobile />
              {children}
            </main>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
