import OverviewDashboard from '@/app/(app)/[project]/dashboard'
import { getProjectByPathname } from '@/app/db/operations/projects'
import { ProjectType } from '@/app/db/schema'
import { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { project: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const selectedProject = await getProjectByPathname(params.project)

  return {
    title: `${selectedProject?.name} | sharepreviews`,
  }
}

export default async function Overview({ params, searchParams }: Props) {
  const selectedProject = (await getProjectByPathname(
    params.project
  )) as ProjectType

  return <OverviewDashboard project={selectedProject} />
}
