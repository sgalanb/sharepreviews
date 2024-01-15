import ValidatorLaunchScreen from '@/app/validator/launch-screen'
import PreviewValidator from '@/app/validator/preview-validator'

export default function Validator({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const inputUrl = searchParams?.url as string

  if (inputUrl) {
    return <PreviewValidator />
  } else {
    return <ValidatorLaunchScreen />
  }
}
