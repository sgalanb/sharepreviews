'use client'

import { Button } from '@/app/ui/components/Button'
import { track } from '@vercel/analytics/react'
import Link from 'next/link'

export default function StartForFreeButton({
  authorizationUrl,
}: {
  authorizationUrl: string
}) {
  return (
    <Button variant="outline" className="w-full" asChild>
      <Link
        href={authorizationUrl}
        onClick={() => track('start_for_free_pricing')}
      >
        Start for Free
      </Link>
    </Button>
  )
}
