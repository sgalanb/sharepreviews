import VisualEditor from '@/app/(editor)/[project]/templates/[templateId]/edit/visual-editor'
import { getUserProjects } from '@/app/db/operations/projects'
import { getUser } from '@/app/lib/workos'

export default async function EditTemplate() {
  const { user } = await getUser()
  const userProjects = await getUserProjects(user?.id!)

  return (
    <div className="h-full w-full">
      <VisualEditor userProjects={userProjects} />
    </div>
  )
}
