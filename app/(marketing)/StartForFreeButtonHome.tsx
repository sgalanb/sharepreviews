'use client'

import { Button } from '@/app/ui/components/Button'
import { track } from '@vercel/analytics/react'
import Link from 'next/link'

export default function StartForFreeButtonHome({
  isAuthenticated,
  authorizationUrl,
}: {
  isAuthenticated: boolean
  authorizationUrl: string
}) {
  return (
    <Button size="lg" className="my-1 cursor-pointer text-base" asChild>
      <Link
        href={isAuthenticated ? '/' : authorizationUrl}
        onClick={() => {
          track('start_for_free_home')
        }}
      >
        Get Started
      </Link>
    </Button>
  )
}
