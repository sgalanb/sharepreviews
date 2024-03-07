'use client'

import { ProjectType } from '@/app/db/schema'
import { Button } from '@/app/ui/components/Button'
import { ChevronLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function VisualEditorHeader({
  userProjects,
}: {
  userProjects: ProjectType[]
}) {
  const pathname = usePathname()
  const selectedProject = userProjects.find(
    (project) => project.pathname === pathname.split('/')[1]
  )

  return (
    <div className="col-span-3 flex w-full flex-col items-center justify-start gap-2 rounded-t-lg">
      <div className="flex w-full items-center justify-between border-b px-4 py-2">
        <Link
          href="/generator"
          className="flex items-center justify-center text-muted-foreground"
        >
          <ChevronLeft className="ml-[-4px]" />
          <span className="self-center text-sm font-normal">Exit</span>
        </Link>
        <div className="flex gap-1">
          <span className="text-muted-foreground">{`${selectedProject?.name} /`}</span>
          <span className=""> Blog post</span>
        </div>
        <Button size="sm" className="flex gap-2">
          <Save className="h-5 w-5" />
          Save
        </Button>
      </div>
    </div>
  )
}
