import OverviewDashboard from '@/app/(app)/[project]/dashboard'
import { getUserProjects } from '@/app/db/operations/projects'
import { getUser } from '@/app/lib/workos'

export default async function Overview() {
  const { user } = await getUser()
  const userProjects = await getUserProjects(user?.id ?? '')

  return <OverviewDashboard user={user!} userProjects={userProjects} />
}
