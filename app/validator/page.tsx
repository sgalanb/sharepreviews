import { getUser } from '@/app/lib/workos'
import ValidatorLaunchScreen from '@/app/validator/launch-screen'
import PreviewValidator from '@/app/validator/preview-validator'
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

  const { isAuthenticated } = await getUser()

  if (inputUrl) {
    return <PreviewValidator isAuthenticated={isAuthenticated} />
  } else {
    return <ValidatorLaunchScreen isAuthenticated={isAuthenticated} />
  }
}
