import UrlExample from '@/app/(marketing)/UrlExample'
import Footer from '@/app/(marketing)/footer'
import { getAuthorizationUrl, getUser } from '@/app/lib/workos'
import { Button } from '@/app/ui/components/Button'
import GitHub from '@/app/ui/svgs/social-icons/GitHub'
import ValidatorInput from '@/app/ui/validator-input'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title:
    'sharepreviews: Boost your links engagement with stunning social cards',
  description:
    'Auto generate social images for your website with sharepreviews, the no-code Open Graph image generator.',
  alternates: {
    canonical: 'https://sharepreviews.com',
  },
  openGraph: {
    url: 'https://sharepreviews.com',
    type: 'website',
    siteName: 'sharepreviews',
    images: [
      'https://utfs.io/f/2f29afb3-51b2-4fc3-9e81-6673d9c79603-vc99r1.png',
    ],
  },
  twitter: {
    site: '@sgalanb',
    creator: '@sgalanb',
    card: 'summary_large_image',
    images: [
      'https://utfs.io/f/2f29afb3-51b2-4fc3-9e81-6673d9c79603-vc99r1.png',
    ],
  },
}

export default async function Home() {
  const { isAuthenticated } = await getUser()
  const authorizationUrl = getAuthorizationUrl()

  return (
    <div className="flex h-full w-full max-w-7xl flex-col items-center justify-start gap-40 px-4">
      {/* Main */}
      <div className="center mt-10 flex min-w-full flex-col items-center gap-4 lg:mt-20 lg:flex-row lg:gap-0">
        {/* Text */}
        <div className="flex w-full flex-col items-center justify-center gap-4 lg:order-1 lg:p-20">
          <h1 className="marketing-title text-balance text-center">
            Dynamic Social Card Images Generator
          </h1>
          <p className="marketing-subtitle text-balance text-center text-muted-foreground xl:px-64">
            Boost your links engagement with sharepreviews, the no-code Open
            Graph (OG) & Twitter Cards dynamic image generator.
          </p>
          <Button className="my-1.5" asChild>
            <Link href={isAuthenticated ? '/' : authorizationUrl}>
              Start for Free
            </Link>
          </Button>
        </div>
      </div>
      {/* Design template*/}
      <div className="mt-12 flex w-full flex-col items-center justify-center gap-2">
        <h2 className="marketing-second-title text-balance text-center">
          Design your custom template
        </h2>
        <p className="marketing-subtitle text-balance text-center text-muted-foreground">
          Easily craft beautiful templates with a no-code Figma-like editor.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-1.5 lg:w-[80%] lg:gap-2">
          <div className="rotate-y-10 relative flex w-[88%] flex-col items-center rounded-xl rounded-b-sm border !border-opacity-5 bg-black !bg-opacity-5 p-1 dark:border-white dark:bg-white dark:shadow-2xl lg:rounded-3xl lg:rounded-b-xl lg:border-2 lg:p-3">
            <Image
              src="/marketing/editor-screenshot.png"
              alt=""
              width={851}
              height={483}
              className="w-full rounded-sm lg:rounded-md"
            />
          </div>
          <div className="relative flex h-5 w-full flex-col items-center rounded-[4px] rounded-b-xl border !border-opacity-5 bg-black !bg-opacity-5 dark:border-white dark:bg-white dark:shadow-2xl lg:h-10 lg:rounded-md lg:rounded-b-3xl lg:border-2 ">
            <div className="absolute top-0 h-1.5 w-[17%] rounded-b-full bg-black bg-opacity-5 shadow-inner dark:bg-white dark:!bg-opacity-5 lg:h-3" />
          </div>
        </div>
      </div>
      {/* Choose a template */}
      <div className="mt-20 flex w-full flex-col items-center justify-center gap-2">
        <h2 className="marketing-second-title text-balance text-center">
          Or choose a template that fits your use case
        </h2>
        <p className="marketing-subtitle text-balance text-center text-muted-foreground">
          Select from a wide range of pre-designed templates.
        </p>
        <div className="mt-8 grid grid-cols-2 items-center justify-center gap-10">
          {/* Blogs */}
          <Link
            href="/starter-templates"
            className="flex flex-col rounded-md border"
          >
            <Image
              src="/og/fa581311-cb8c-41ce-8d6b-2dc66d4c2589?date_value=10 December&blue_price_value=123&blue_bid_value=456&blue_diff_value=789"
              alt=""
              width={438}
              height={227}
              className="rounded-t-md"
            />
            <div className="flex flex-col items-start justify-center gap-2 border-t p-4">
              <h3 className="marketing-third-title text-balance text-center">
                Blogs
              </h3>
              <p className="text-center text-muted-foreground">
                Perfect for sharing your latest blog post.
              </p>
            </div>
          </Link>
          {/* eCommerce */}
          <Link
            href="/starter-templates"
            className="flex flex-col rounded-md border"
          >
            <Image
              src="/og/fa581311-cb8c-41ce-8d6b-2dc66d4c2589?date_value=10 December&blue_price_value=123&blue_bid_value=456&blue_diff_value=789"
              alt=""
              width={438}
              height={227}
              className="rounded-t-md"
            />
            <div className="flex flex-col items-start justify-center gap-2 border-t p-4">
              <h3 className="marketing-third-title text-balance text-center">
                eCommerce
              </h3>
              <p className="text-center text-muted-foreground">
                Ideal for showcasing your products.
              </p>
            </div>
          </Link>
          {/* Social Profile */}
          <Link
            href="/starter-templates"
            className="flex flex-col rounded-md border"
          >
            <Image
              src="/og/fa581311-cb8c-41ce-8d6b-2dc66d4c2589?date_value=10 December&blue_price_value=123&blue_bid_value=456&blue_diff_value=789"
              alt=""
              width={438}
              height={227}
              className="rounded-t-md"
            />
            <div className="flex flex-col items-start justify-center gap-2 border-t p-4">
              <h3 className="marketing-third-title text-balance text-center">
                Social Profile
              </h3>
              <p className="text-center text-muted-foreground">
                Great for sharing your a profile info.
              </p>
            </div>
          </Link>
          {/* Fintech */}
          <Link
            href="/starter-templates"
            className="flex flex-col rounded-md border"
          >
            <Image
              src="/og/fa581311-cb8c-41ce-8d6b-2dc66d4c2589?date_value=10 December&blue_price_value=123&blue_bid_value=456&blue_diff_value=789"
              alt=""
              width={438}
              height={227}
              className="rounded-t-md"
            />
            <div className="flex flex-col items-start justify-center gap-2 border-t p-4">
              <h3 className="marketing-third-title text-balance text-center">
                Fintech
              </h3>
              <p className="text-center text-muted-foreground">
                Show pay links, stock prices, and more.
              </p>
            </div>
          </Link>
        </div>
        <Button className="mt-8" variant="outline" asChild>
          <Link href="/starter-templates">View all templates</Link>
        </Button>
      </div>
      {/* Implement in minutes */}
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <h2 className="marketing-second-title text-balance text-center">
          Generate new images with just a URL
        </h2>
        <p className="marketing-subtitle text-balance text-center text-muted-foreground">
          Provide a <span className="text-blue-600">template ID</span> and the{' '}
          <span className="text-green-600">dynamic data</span> you want to
          display.
          <br />
          No need to install any SDK or use any API.
        </p>
        <UrlExample />
        {/* TODO: Add example of meta tag implementation with Next.js, Astro, etc. */}
      </div>
      {/* Validator */}
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <h2 className="marketing-second-title text-balance text-center">
          Social Card Validator
        </h2>
        <p className="marketing-subtitle text-balance text-center text-muted-foreground lg:px-40">
          Check how your links look when shared. Validate that you have the
          right metatags in place so your cards are displayed correctly.
        </p>
        <div className="mt-8 flex w-full items-center justify-center">
          <ValidatorInput isApp={false} isHome />
        </div>
      </div>
      {/* Open Source */}
      <div className="mb-20 flex w-full flex-col items-center justify-center gap-2">
        <h2 className="marketing-second-title text-balance text-center">
          Proudly open-source
        </h2>
        <p className="marketing-subtitle text-balance text-center text-muted-foreground">
          Our source code is available on GitHub. <br />
          Feel free to read, review, or contribute to it however you want!
        </p>
        <Link
          href="https://github.com/sgalanb/sharepreviews"
          target="_blank"
          className="mt-8 flex items-center justify-center gap-2 rounded-md bg-[#0E1117] px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-[#0E1117]"
        >
          <GitHub
            className="h-4 w-4"
            fillClassName="fill-white dark:fill-[#0E1117]"
          />
          Star on GitHub
        </Link>
      </div>
      <Footer isAuthenticated={isAuthenticated} />
    </div>
  )
}
