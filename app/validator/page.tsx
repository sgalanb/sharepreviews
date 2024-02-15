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

  if (!inputUrl) {
    return {
      title: 'Preview Validator | sharepreviews',
      description:
        'Check how your links look when shared on social media with our free validator. Validate you have the correct metatags in place. Both Open Graph and Twitter Cards.',
      alternates: {
        canonical: 'https://sharepreviews.com/validator',
      },
    }
  }
  return {
    title: `${inputUrl} | sharepreviews`,
    description:
      'Check how your links look when shared on social media with our free validator. Validate you have the correct metatags in place. Both Open Graph and Twitter Cards.',
    alternates: {
      canonical: 'https://sharepreviews.com/validator',
    },
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
