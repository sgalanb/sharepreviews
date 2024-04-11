'use client'

import { Button } from '@/app/ui/components/Button'
import { track } from '@vercel/analytics/react'
import Link from 'next/link'

export default function StartWithProButton({
  authorizationUrl,
}: {
  authorizationUrl: string
}) {
  return (
    <Button className="w-full" asChild>
      <Link
        href={authorizationUrl}
        onClick={() => track('start_with_pro_pricing')}
      >
        Start with Pro
      </Link>
    </Button>
  )
}
