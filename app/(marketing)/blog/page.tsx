import {
  TypographyH1,
  TypographyH2,
  TypographyP,
} from '@/app/ui/components/typography'
import dayjs from 'dayjs'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog | sharepreviews',
  description:
    'Learn all about og metatags and how to boost your links engagement with stunning previews. Stay up to date with the latest updates to social media platform previews.',
  alternates: {
    canonical: 'https://sharepreviews.com/blog',
  },
  openGraph: {
    url: 'https://sharepreviews.com/blog',
    type: 'website',
    siteName: 'sharepreviews',
  },
  twitter: {
    site: '@sgalanb',
    creator: '@sgalanb',
    card: 'summary_large_image',
  },
}

export default async function BlogPage() {
  return (
    <div className="flex w-full max-w-7xl flex-col items-center justify-start gap-4 lg:gap-8 lg:pt-8">
      <TypographyH1 className="pt-4 lg:p-0">Blog</TypographyH1>
      <Link
        href="/blog/everything-you-should-know-about-social-metatags"
        className="flex flex-col gap-4 rounded-lg p-4 hover:bg-accent lg:flex-row"
      >
        <div className="order-2 w-full lg:order-1 lg:w-1/3">
          <div className="flex h-full flex-col justify-between gap-4">
            <div className="flex flex-col gap-4">
              <TypographyH2 className="lg:text-balance">
                Everything You Should Know About Social Metatags
              </TypographyH2>
              <TypographyP className="text-muted-foreground lg:text-balance">
                Learn how to use Open Graph and Twitter metatags to control how
                your website is displayed when shared on social media.
              </TypographyP>
            </div>
            <div className="flex items-center justify-start gap-2">
              <Image
                src="/pfp.jpeg"
                alt="author profile picture"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="text-balance font-medium leading-5">
                Santiago Galán
              </span>
              <span className="text-balance font-medium leading-5">·</span>
              <span className="text-muted-foreground">
                {dayjs('02/15/2024').format('MMM D, YYYY')}
              </span>
            </div>
          </div>
        </div>
        <Image
          src="/mvp-thumbnail.webp"
          alt=""
          width={1200}
          height={630}
          className="order-1 w-full rounded-md object-cover lg:order-2 lg:w-2/3"
        />
      </Link>
    </div>
  )
}
