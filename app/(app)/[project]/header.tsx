'use client'

import { ProjectType } from '@/app/db/schema'
import { usePathname } from 'next/navigation'

export default function ProjectOverviewHeader({
  userProjects,
}: {
  userProjects: ProjectType[]
}) {
  const pathname = usePathname()
  const selectedProject = userProjects.find(
    (project) => project.pathname === pathname.split('/')[1]
  )

  return (
    <div className="flex w-full items-center justify-between">
      <span className="title">{selectedProject?.name}</span>
    </div>
  )
}
