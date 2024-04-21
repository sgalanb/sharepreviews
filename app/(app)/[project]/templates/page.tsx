import TemplatesDashboard from '@/app/(app)/[project]/templates/dashboard'
import { getProjectByPathname } from '@/app/db/operations/projects'
import { ProjectType } from '@/app/db/schema'
import { getUser } from '@/app/lib/workos'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const selectedProject = await getProjectByPathname(params.project)

  return {
    title: `Templates - ${selectedProject?.name} | sharepreviews`,
  }
}

type Props = {
  params: { project: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function TemplatesPage({ params, searchParams }: Props) {
  const { user } = await getUser()
  const selectedProject = (await getProjectByPathname(
    params.project
  )) as ProjectType

  if (!selectedProject || selectedProject.userId !== user?.id) {
    redirect('/')
  }

  return <TemplatesDashboard project={selectedProject} user={user!} />
}
