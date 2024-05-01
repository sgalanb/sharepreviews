import ValidatorLaunchScreen from '@/app/(marketing)/card-validator/launch-screen'
import PreviewValidator from '@/app/(marketing)/card-validator/preview-validator'
import { getProjectByPathname } from '@/app/db/operations/projects'
import { ProjectType } from '@/app/db/schema'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const inputUrl = searchParams?.url as string
  const cleanUrl = inputUrl?.replace(/(^\w+:|^)\/\//, '')
  const selectedProject = await getProjectByPathname(params.project)

  if (!inputUrl) {
    return {
      title: `Card Validator - ${selectedProject?.name} | SharePreviews`,
    }
  }
  return {
    title: `${cleanUrl} - ${selectedProject?.name} | SharePreviews`,
  }
}

type Props = {
  params: { project: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function AppValidator({ params, searchParams }: Props) {
  const inputUrl = searchParams?.url as string
  const selectedProject = (await getProjectByPathname(
    params.project
  )) as ProjectType

  if (inputUrl) {
    return (
      <PreviewValidator isApp projectPathname={selectedProject?.pathname} />
    )
  } else {
    return (
      <ValidatorLaunchScreen isApp projectPathname={selectedProject.pathname} />
    )
  }
}
