import ValidatorLaunchScreen from '@/app/(marketing)/card-validator/launch-screen'
import PreviewValidator from '@/app/(marketing)/card-validator/preview-validator'
import Footer from '@/app/(marketing)/footer'
import { Metadata } from 'next'

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const inputUrl = searchParams?.url as string
  const cleanUrl = inputUrl?.replace(/(^\w+:|^)\/\//, '')

  if (!inputUrl) {
    return {
      title: 'Card Validator | SharePreviews',
      description:
        'Check how your links look when shared. Validate that you have the right metatags in place so your cards are displayed correctly. Free tool for Open Graph and Twitter Cards.',
      alternates: {
        canonical: 'https://sharepreviews.com/card-validator',
      },
      openGraph: {
        url: 'https://sharepreviews.com/card-validator',
        type: 'website',
        siteName: 'SharePreviews',
        images: [
          'https://utfs.io/f/5d0c1c4a-2d8c-433b-b140-aabcfc3f97ba-67kr6v.png',
        ],
      },
      twitter: {
        site: '@sgalanb',
        creator: '@sgalanb',
        card: 'summary_large_image',
        images: [
          'https://utfs.io/f/5d0c1c4a-2d8c-433b-b140-aabcfc3f97ba-67kr6v.png',
        ],
      },
    }
  } else {
    //const metatags = await fetch(`/api/metatags/validate?url=${cleanUrl}`)

    // TODO

    return {
      title: `${cleanUrl} | SharePreviews`,
      description:
        'Check how your links look when shared. Validate that you have the right metatags in place so your cards are displayed correctly. Free tool for Open Graph and Twitter Cards.',
      alternates: {
        canonical: 'https://sharepreviews.com/card-validator',
      },
      openGraph: {
        url: 'https://sharepreviews.com/card-validator',
        type: 'website',
        siteName: 'SharePreviews',
        images: [
          'https://utfs.io/f/5d0c1c4a-2d8c-433b-b140-aabcfc3f97ba-67kr6v.png',
        ],
      },
      twitter: {
        site: '@sgalanb',
        creator: '@sgalanb',
        card: 'summary_large_image',
        images: [
          'https://utfs.io/f/5d0c1c4a-2d8c-433b-b140-aabcfc3f97ba-67kr6v.png',
        ],
      },
    }
  }
}

type Props = {
  params: { project: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Validator({ params, searchParams }: Props) {
  const inputUrl = searchParams?.url as string

  return (
    <div
      className={`${inputUrl ? 'gap-20' : ''} flex flex-col justify-between lg:min-h-[calc(100dvh-72px)]`}
    >
      {inputUrl ? <PreviewValidator /> : <ValidatorLaunchScreen />}
      <Footer />
    </div>
  )
}
