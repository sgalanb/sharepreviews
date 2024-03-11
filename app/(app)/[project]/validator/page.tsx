import ValidatorLaunchScreen from '@/app/(marketing)/card-validator/launch-screen'
import PreviewValidator from '@/app/(marketing)/card-validator/preview-validator'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function AppValidator({ searchParams }: Props) {
  const inputUrl = searchParams?.url as string

  if (inputUrl) {
    return <PreviewValidator isApp />
  } else {
    return <ValidatorLaunchScreen isApp />
  }
}
