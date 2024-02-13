import ValidatorLaunchScreen from '@/app/validator/launch-screen'
import PreviewValidator from '@/app/validator/preview-validator'
import { Metadata, ResolvingMetadata } from 'next'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const inputUrl = searchParams?.url as string

  return {
    title: `${inputUrl} | sharepreviews`,
  }
}

export default async function Validator({
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
