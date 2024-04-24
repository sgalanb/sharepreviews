'use client'

import UpgradeProjectComboBox from '@/app/(marketing)/pricing/UpgradeProjectComboBox'
import { ProjectType } from '@/app/db/schema'
import { Button } from '@/app/ui/components/Button'
import { track } from '@vercel/analytics/react'
import { User } from '@workos-inc/node'
import Link from 'next/link'

export default function StartWithProButton({
  isAuthenticated,
  authorizationUrl,
  user,
  userProjects,
}: {
  isAuthenticated: boolean
  authorizationUrl: string
  user?: User
  userProjects?: ProjectType[]
}) {
  return (
    <>
      {isAuthenticated ? (
        <UpgradeProjectComboBox user={user!} userProjects={userProjects!} />
      ) : (
        <Button className="w-full" asChild>
          <Link
            href={authorizationUrl}
            onClick={() => track('start_with_pro_pricing')}
          >
            Start with Pro
          </Link>
        </Button>
      )}
    </>
  )
}
