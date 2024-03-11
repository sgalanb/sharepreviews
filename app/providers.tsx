'use client'

import { User } from '@workos-inc/node'
import { Crisp } from 'crisp-sdk-web'
import { ThemeProvider } from 'next-themes'
import { useEffect } from 'react'

export function Providers({
  children,
  user,
  ...props
}: {
  children: React.ReactNode
  user: User
  [key: string]: any
}) {
  useEffect(() => {
    if (user.email) {
      Crisp.user.setEmail(user.email)
      Crisp.user.setNickname(`${user.firstName} ${user.lastName}` || user.email)
    }
  }, [user])

  return <ThemeProvider {...props}>{children}</ThemeProvider>
}
