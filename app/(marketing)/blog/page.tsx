import Footer from '@/app/(marketing)/footer'
import { getUser } from '@/app/lib/workos'
import { Card } from '@/app/ui/components/Card'
import dayjs from 'dayjs'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog | sharepreviews',
  description:
    'Learn how to generate and manage social card images with sharepreviews. Stay up to date on how social platforms handle Open Graph metatags.',
  alternates: {
    canonical: 'https://sharepreviews.com/blog',
  },
  openGraph: {
    url: 'https://sharepreviews.com/blog',
    type: 'website',
    siteName: 'sharepreviews',
    images: [
      'https://utfs.io/f/aeb5dc22-a68d-4d6b-8c54-b3bd3a6fce38-cqgxy.png',
    ],
  },
  twitter: {
    site: '@sgalanb',
    creator: '@sgalanb',
    card: 'summary_large_image',
    images: [
      'https://utfs.io/f/aeb5dc22-a68d-4d6b-8c54-b3bd3a6fce38-cqgxy.png',
    ],
  },
}

export default async function BlogPage() {
  const { isAuthenticated } = await getUser()

  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-8 pt-16">
      <h1 className="marketing-title pt-4 lg:p-0">Blog</h1>
      <div className="mb-10 flex flex-col items-center justify-center gap-10 p-4 lg:mb-0 lg:flex-row">
        <Card className="max-w-[30rem]">
          <Link
            href="/about"
            className="flex flex-col gap-4 rounded-md p-4 hover:bg-accent lg:flex-row"
          >
            <div className="order-2 w-full lg:order-1">
              <div className="flex h-full flex-col justify-between gap-8">
                <div className="flex flex-col gap-4">
                  <h2 className="marketing-second-title lg:text-balance">
                    A platform to generate and manage social cards
                  </h2>
                  <p className="marketing-subtitle text-muted-foreground lg:text-balance">
                    Why social cards are one of the most undervalued aspects of
                    digital marketing and how sharepreviews want to change that.
                  </p>
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
                    {dayjs('03/29/2024').format('MMM D, YYYY')}
                  </span>
                </div>
              </div>
            </div>
            {/* <Image
          src="/mvp-thumbnail.webp"
          alt=""
          width={1200}
          height={630}
          className="order-1 w-full rounded-md object-cover lg:order-2 lg:w-2/3"
        /> */}
          </Link>
        </Card>
        <Card className="max-w-[30rem]">
          <Link
            href="/blog/everything-you-should-know-about-social-card-metatags"
            className="flex flex-col gap-4 rounded-md p-4 hover:bg-accent lg:flex-row"
          >
            <div className="order-2 w-full lg:order-1">
              <div className="flex h-full flex-col justify-between gap-8">
                <div className="flex flex-col gap-4">
                  <h2 className="marketing-second-title lg:text-balance">
                    Everything you should know about social card metatags
                  </h2>
                  <p className="marketing-subtitle text-muted-foreground lg:text-balance">
                    Learn how to use Open Graph and Twitter metatags to control
                    how your website is displayed when shared on social media.
                  </p>
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
            {/* <Image
          src="/mvp-thumbnail.webp"
          alt=""
          width={1200}
          height={630}
          className="order-1 w-full rounded-md object-cover lg:order-2 lg:w-2/3"
        /> */}
          </Link>
        </Card>
      </div>

      <Footer isAuthenticated={isAuthenticated} />
    </div>
  )
}
