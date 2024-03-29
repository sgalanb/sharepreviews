import ValidatorLaunchScreen from '@/app/(marketing)/card-validator/launch-screen'
import PreviewValidator from '@/app/(marketing)/card-validator/preview-validator'
import Footer from '@/app/(marketing)/footer'
import { getProjectByPathname } from '@/app/db/operations/projects'
import { ProjectType } from '@/app/db/schema'
import { Metadata } from 'next'

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const inputUrl = searchParams?.url as string
  const cleanUrl = inputUrl?.replace(/(^\w+:|^)\/\//, '')

  if (!inputUrl) {
    return {
      title: 'Card Validator | sharepreviews',
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

type Props = {
  params: { project: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Validator({ params, searchParams }: Props) {
  const inputUrl = searchParams?.url as string
  const selectedProject = (await getProjectByPathname(
    params.project
  )) as ProjectType

  return (
    <div
      className={`${inputUrl ? 'gap-20 p-4' : 'px-4'} flex flex-col justify-between lg:min-h-[calc(100dvh-72px)]`}
    >
      {inputUrl ? (
        <PreviewValidator
          isApp={false}
          projectPathname={selectedProject?.pathname}
        />
      ) : (
        <ValidatorLaunchScreen
          isApp={false}
          projectPathname={selectedProject?.pathname}
        />
      )}
      <Footer />
    </div>
  )
}
