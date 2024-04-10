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
      title: `Card Validator - ${selectedProject?.name} | sharepreviews`,
      description:
        'Check how your links look when shared. Validate that you have the right metatags in place so your cards are displayed correctly. Free tool for Open Graph and Twitter Cards.',
      alternates: {
        canonical: 'https://sharepreviews.com/validator',
      },
      openGraph: {
        url: 'https://sharepreviews.com/validator',
        type: 'website',
        siteName: 'sharepreviews',
        images: [
          'https://utfs.io/f/5d8571c9-012b-4069-8c80-ce3ca11926a2-nrodn.png',
        ],
      },
      twitter: {
        site: '@sgalanb',
        creator: '@sgalanb',
        card: 'summary_large_image',
        images: [
          'https://utfs.io/f/5d8571c9-012b-4069-8c80-ce3ca11926a2-nrodn.png',
        ],
      },
    }
  }
  return {
    title: `${cleanUrl} - ${selectedProject?.name} | sharepreviews`,
    description:
      'Check how your links look when shared. Validate that you have the right metatags in place so your cards are displayed correctly. Free tool for Open Graph and Twitter Cards.',
    alternates: {
      canonical: 'https://sharepreviews.com/validator',
    },
    openGraph: {
      url: 'https://sharepreviews.com/validator',
      type: 'website',
      siteName: 'sharepreviews',
      images: [
        'https://utfs.io/f/5d8571c9-012b-4069-8c80-ce3ca11926a2-nrodn.png',
      ],
    },
    twitter: {
      site: '@sgalanb',
      creator: '@sgalanb',
      card: 'summary_large_image',
      images: [
        'https://utfs.io/f/5d8571c9-012b-4069-8c80-ce3ca11926a2-nrodn.png',
      ],
    },
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
