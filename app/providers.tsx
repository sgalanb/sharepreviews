'use client'

import { ThemeProvider } from 'next-themes'

export function Providers({
  children,
  ...props
}: {
  children: React.ReactNode
  [key: string]: any
}) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>
}
