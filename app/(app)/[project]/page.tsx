import ProjectOverviewHeader from '@/app/(app)/[project]/header'
import { getUserProjects } from '@/app/db/operations/projects'
import { getUser } from '@/app/lib/workos'

export default async function Overview() {
  const { user } = await getUser()
  const userProjects = await getUserProjects(user?.id ?? '')

  return (
    <div
      className={`flex w-full max-w-7xl flex-col items-center justify-center gap-4 p-4 lg:p-12`}
    >
      <ProjectOverviewHeader userProjects={userProjects} />
    </div>
  )
}
