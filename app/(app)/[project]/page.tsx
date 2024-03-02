import ProjectOverviewHeader from '@/app/(app)/[project]/header'
import { getProjectById } from '@/app/db/operations/projects'
import { getUser } from '@/app/lib/workos'
import { Separator } from '@/app/ui/components/Separator'

export default async function Overview() {
  const { user } = await getUser()
  const userProjects = await getProjectById(user?.id ?? '')

  return (
    <div
      className={`flex w-full max-w-7xl flex-col items-center justify-center gap-4 p-4 lg:p-12`}
    >
      <ProjectOverviewHeader userProjects={userProjects} />
      <Separator />
      <div>Usage</div>
    </div>
  )
}
