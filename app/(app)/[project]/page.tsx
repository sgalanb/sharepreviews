import OverviewDashboard from '@/app/(app)/[project]/dashboard'
import { getCurrentLemonUsageAction } from '@/app/actions/lemonActions'
import { getProjectByPathname } from '@/app/db/operations/projects'
import { ProjectType } from '@/app/db/schema'
import { getProjectUsageQueue, getUserUsage } from '@/app/lib/upstash'
import { getUser } from '@/app/lib/workos'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const selectedProject = await getProjectByPathname(params.project)

  return {
    title: `${selectedProject?.name} | SharePreviews`,
  }
}

type Props = {
  params: { project: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Overview({ params, searchParams }: Props) {
  const { user } = await getUser()

  const selectedProject = (await getProjectByPathname(params.project)) as
    | ProjectType
    | undefined

  if (!selectedProject || selectedProject.userId !== user?.id) {
    redirect('/')
  }

  const userUsage = await getUserUsage(user?.id ?? '')

  const projectUsageLemonData = await getCurrentLemonUsageAction(
    selectedProject.suscriptionItemId ?? ''
  )

  const projectUsageQueue = await getProjectUsageQueue(selectedProject.id ?? '')

  const projectUsage =
    selectedProject?.plan === 'pro'
      ? projectUsageLemonData?.meta?.quantity + projectUsageQueue
      : 0
  const projectUsagePeriodStart = projectUsageLemonData?.meta?.period_start
  const projectUsagePeriodEnd = projectUsageLemonData?.meta?.period_end

  return (
    <OverviewDashboard
      project={selectedProject}
      user={user!}
      userUsage={userUsage ?? 0}
      projectUsage={projectUsage ?? 0}
      projectUsagePeriodStart={projectUsagePeriodStart}
      projectUsagePeriodEnd={projectUsagePeriodEnd}
    />
  )
}
