import TemplatesDashboard from '@/app/(app)/[project]/templates/dashboard'
import { getUserProjects } from '@/app/db/operations/projects'
import { getUser } from '@/app/lib/workos'

export default async function TemplatesPage() {
  const { user } = await getUser()
  const userProjects = await getUserProjects(user?.id!)

  return <TemplatesDashboard user={user!} userProjects={userProjects} />
}
