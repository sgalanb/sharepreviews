import ValidatorLaunchScreen from '@/app/(marketing)/card-validator/launch-screen'
import PreviewValidator from '@/app/(marketing)/card-validator/preview-validator'
import { getProjectByPathname } from '@/app/db/operations/projects'
import { ProjectType } from '@/app/db/schema'

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
