import ValidatorLaunchScreen from '@/app/(marketing)/card-validator/launch-screen'
import PreviewValidator from '@/app/(marketing)/card-validator/preview-validator'
import { Metadata } from 'next'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const inputUrl = searchParams?.url as string
  const cleanUrl = inputUrl?.replace(/(^\w+:|^)\/\//, '')

  if (!inputUrl) {
    return {
      title: 'Preview Card Validator | sharepreviews',
      description:
        'Check how your links look when shared on social media with our free validator. Validate you have the correct metatags in place. Free tool for Open Graph and Twitter Cards.',
      alternates: {
        canonical: 'https://sharepreviews.com/validator',
      },
      openGraph: {
        url: 'https://sharepreviews.com/validator',
        type: 'website',
        siteName: 'sharepreviews',
      },
      twitter: {
        site: '@sgalanb',
        creator: '@sgalanb',
      },
    }
  }
  return {
    title: `${cleanUrl} | sharepreviews`,
    description:
      'Check how your links look when shared on social media with our free validator. Validate you have the correct metatags in place. Free tool for Open Graph and Twitter Cards.',
    alternates: {
      canonical: 'https://sharepreviews.com/validator',
    },
    openGraph: {
      url: 'https://sharepreviews.com/validator',
      type: 'website',
      siteName: 'sharepreviews',
    },
    twitter: {
      site: '@sgalanb',
      creator: '@sgalanb',
      card: 'summary_large_image',
    },
  }
}

export default async function Validator({ searchParams }: Props) {
  const inputUrl = searchParams?.url as string

  if (inputUrl) {
    return <PreviewValidator isApp={false} />
  } else {
    return <ValidatorLaunchScreen isApp={false} />
  }
}
