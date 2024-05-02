'use client'

import { Button } from '@/app/ui/components/Button'
import { track } from '@vercel/analytics/react'
import Link from 'next/link'

export default function StartForFreeButton({
  isAuthenticated,
  authorizationUrl,
}: {
  isAuthenticated: boolean
  authorizationUrl: string
}) {
  return (
    <Button variant="outline" className="w-full cursor-pointer" asChild>
      <Link
        href={isAuthenticated ? '/' : authorizationUrl}
        onClick={() => track('start_for_free_pricing')}
      >
        {isAuthenticated ? 'Go to dashboard' : 'Start for Free'}
      </Link>
    </Button>
  )
}
