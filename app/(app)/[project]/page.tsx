import OverviewDashboard from '@/app/(app)/[project]/dashboard'
import { getProjectByPathname } from '@/app/db/operations/projects'
import { ProjectType } from '@/app/db/schema'
import { getUser } from '@/app/lib/workos'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const selectedProject = await getProjectByPathname(params.project)

  return {
    title: `${selectedProject?.name} | sharepreviews`,
  }
}

type Props = {
  params: { project: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Overview({ params, searchParams }: Props) {
  const { user } = await getUser()

  const selectedProject = (await getProjectByPathname(
    params.project
  )) as ProjectType

  return <OverviewDashboard project={selectedProject} user={user!} />
}
