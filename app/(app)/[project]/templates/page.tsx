import TemplatesDashboard from '@/app/(app)/[project]/templates/dashboard'
import { getProjectByPathname } from '@/app/db/operations/projects'
import { ProjectType } from '@/app/db/schema'

type Props = {
  params: { project: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function TemplatesPage({ params, searchParams }: Props) {
  const selectedProject = (await getProjectByPathname(
    params.project
  )) as ProjectType

  return <TemplatesDashboard project={selectedProject} />
}
