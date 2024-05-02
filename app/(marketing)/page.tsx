import StarOnGithubButton from '@/app/(marketing)/StarOnGithubButton'
import StartForFreeButtonHome from '@/app/(marketing)/StartForFreeButtonHome'
import UrlExample from '@/app/(marketing)/UrlExample'
import Footer from '@/app/(marketing)/footer'
import { getAllUsersCount } from '@/app/db/operations/users'
import { getAuthorizationUrl, getUser } from '@/app/lib/workos'
import { Button } from '@/app/ui/components/Button'
import { Separator } from '@/app/ui/components/Separator'
import TestimonialsBadge from '@/app/ui/testimonial-badge'
import TestimonialsWOL from '@/app/ui/testimonials-WOL'
import ValidatorInput from '@/app/ui/validator-input'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title:
    'SharePreviews: Dynamic Open Graph images Generator. No-code & Open-source.',
  description:
    'Increase click-through rates using a Figma-like editor to design your dynamic OG images.',

  alternates: {
    canonical: 'https://sharepreviews.com',
  },
  openGraph: {
    url: 'https://sharepreviews.com',
    type: 'website',
    siteName: 'SharePreviews',
    images: [
      'https://utfs.io/f/23b3b4dd-700f-45de-bb17-81ad985db1ed-k3d9cr.png',
    ],
  },
  twitter: {
    site: '@sgalanb',
    creator: '@sgalanb',
    card: 'summary_large_image',
    images: [
      'https://utfs.io/f/23b3b4dd-700f-45de-bb17-81ad985db1ed-k3d9cr.png',
    ],
  },
}

export default async function Home() {
  const { isAuthenticated } = await getUser()
  const authorizationUrl = getAuthorizationUrl({ screenHint: 'sign-up' })

  const usersCount = await getAllUsersCount()

  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-10">
      {/* Main */}
      <div className="mt-10 flex min-w-full flex-col items-center gap-20 p-4 lg:mt-0 lg:gap-16 lg:p-16">
        {/* Text */}
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <h1 className="marketing-title text-balance text-center">
            Create Dynamic Open Graph Images
          </h1>
          <p className="marketing-subtitle text-balance text-center text-muted-foreground lg:px-40">
            Boost your links engagement with SharePreviews, the no-code dynamic
            Open Graph images generator.
          </p>
          <div className="flex items-center justify-center gap-2">
            <StartForFreeButtonHome
              isAuthenticated={isAuthenticated}
              authorizationUrl={authorizationUrl}
            />
            <StarOnGithubButton variant="short" />
          </div>
          <div className="h-10">
            <TestimonialsBadge />
          </div>
        </div>
        <Image
          src="/marketing/hardcoded-header-image.png"
          alt="Picture of 4 different social card examples"
          width={800}
          height={400}
          priority
        />
      </div>

      <Separator />

      {/* Design template*/}
      <div className="flex w-full flex-col items-center justify-center gap-2 p-4 lg:px-8">
        <h2 className="marketing-second-title text-balance text-center">
          Design your custom template
        </h2>
        <p className="marketing-subtitle text-balance text-center text-muted-foreground">
          Easily craft beautiful templates with a no-code Figma-like editor.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-1.5 lg:w-[90%] lg:gap-2">
          <div className="rotate-y-10 relative flex w-[88%] flex-col items-center rounded-sm rounded-b-sm border !border-opacity-5 bg-black !bg-opacity-5 p-1 dark:border-white dark:bg-white dark:shadow-2xl lg:rounded-xl lg:rounded-b-xl lg:border-2 lg:p-3">
            <Image
              src="/marketing/editor-screenshot.png"
              alt="picture of the tempalte editor"
              width={851}
              height={483}
              className="w-full rounded-[4px]"
            />
          </div>
          <div className="relative flex h-5 w-full flex-col items-center rounded-[4px] rounded-b-xl border !border-opacity-5 bg-black !bg-opacity-5 dark:border-white dark:bg-white dark:shadow-2xl lg:h-10 lg:rounded-md lg:rounded-b-3xl lg:border-2 ">
            <div className="absolute top-0 h-1.5 w-[17%] rounded-b-full bg-black bg-opacity-5 shadow-inner dark:bg-white dark:!bg-opacity-5 lg:h-3" />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-20">
        {/* Choose a template */}
        <div className="flex w-full flex-col items-center justify-center gap-2 p-4 lg:px-8">
          <h2 className="marketing-second-title text-balance text-center">
            Or choose a template that fits your use case
          </h2>
          <p className="marketing-subtitle text-balance text-center text-muted-foreground">
            Select from a wide range of pre-designed templates.
          </p>
          <div className="mt-8 grid grid-cols-1 items-center justify-center gap-10 lg:grid-cols-2">
            {/* eCommerce */}
            <Link
              href="/starter-templates/f20c60c8-0e4e-43cb-85d7-1ec2357530ae"
              className="flex w-full max-w-[27.5rem] flex-col rounded-md border duration-200 hover:opacity-90 hover:shadow-lg dark:shadow-white/10"
            >
              <Image
                src="/og/f20c60c8-0e4e-43cb-85d7-1ec2357530ae"
                alt=""
                width={440}
                height={228}
                className="aspect-[1.91/1] w-full max-w-[27.5rem] rounded-t-md"
              />
              <div className="flex w-full flex-col items-start justify-center gap-2 border-t p-4">
                <h3 className="marketing-third-title text-balance text-left">
                  eCommerce Product
                </h3>
              </div>
            </Link>
            {/* Social Profile */}
            <Link
              href="/starter-templates/27c80424-6b31-455e-88e1-6b36f0e75cf9"
              className="flex w-full max-w-[27.5rem] flex-col rounded-md border duration-200 hover:opacity-90 hover:shadow-lg dark:shadow-white/10"
            >
              <Image
                src="/og/27c80424-6b31-455e-88e1-6b36f0e75cf9"
                alt=""
                width={440}
                height={228}
                className="aspect-[1.91/1] w-full max-w-[27.5rem] rounded-t-md"
              />
              <div className="flex w-full flex-col items-start justify-center gap-2 border-t p-4">
                <h3 className="marketing-third-title text-balance text-left">
                  Social Profile Statistics
                </h3>
              </div>
            </Link>
            {/* Blogs */}
            <Link
              href="/starter-templates/6446c4ba-ebbc-4688-be9d-9d0aa268627a"
              className="flex w-full max-w-[27.5rem] flex-col rounded-md border duration-200 hover:opacity-90 hover:shadow-lg dark:shadow-white/10"
            >
              <Image
                src="/og/6446c4ba-ebbc-4688-be9d-9d0aa268627a"
                alt=""
                width={440}
                height={228}
                className="aspect-[1.91/1] w-full max-w-[27.5rem] rounded-t-md"
              />
              <div className="flex w-full flex-col items-start justify-center gap-2 border-t p-4">
                <h3 className="marketing-third-title text-balance text-left">
                  Blog Article With Author
                </h3>
              </div>
            </Link>
            {/* Documentation */}
            <Link
              href="/starter-templates/08f36805-dea2-4575-b047-a96c9466d1f4"
              className="flex w-full max-w-[27.5rem] flex-col rounded-md border duration-200 hover:opacity-90 hover:shadow-lg dark:shadow-white/10"
            >
              <Image
                src="/og/08f36805-dea2-4575-b047-a96c9466d1f4"
                alt=""
                width={440}
                height={228}
                className="aspect-[1.91/1] w-full max-w-[27.5rem] rounded-t-md"
              />
              <div className="flex w-full flex-col items-start justify-center gap-2 border-t p-4">
                <h3 className="marketing-third-title text-balance text-left">
                  Documentation Introduction
                </h3>
              </div>
            </Link>
          </div>
          <Button className="mt-8 cursor-pointer" variant="outline" asChild>
            <Link href="/starter-templates">View all templates</Link>
          </Button>
        </div>

        <Separator />

        {/* Implement in minutes */}
        <div className="flex w-full flex-col items-center justify-center gap-2 p-4 lg:px-8">
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

        <Separator />

        {/* Testimonials */}
        <div className="flex w-full flex-col items-center justify-center gap-2 p-4 lg:px-8">
          <h2 className="marketing-second-title text-balance text-center">
            Users testimonials
          </h2>
          <p className="marketing-subtitle text-balance text-center text-muted-foreground">
            Join {usersCount} users who create dynamic Open Graph images with
            SharePreviews.
          </p>
          <TestimonialsWOL />
        </div>

        <Separator />

        {/* Validator */}
        <div className="flex w-full flex-col items-center justify-center gap-2 p-4 px-8">
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

        <Separator />

        {/* Open Source */}
        <div className="flex w-full flex-col items-center justify-center gap-2 p-4 px-8">
          <h2 className="marketing-second-title text-balance text-center">
            Proudly open-source
          </h2>
          <p className="marketing-subtitle text-balance text-center text-muted-foreground">
            Source code is available on GitHub. <br />
            Feel free to read, review, or contribute to it however you want!
          </p>
          <StarOnGithubButton variant="long" />
        </div>

        <Footer isAuthenticated={isAuthenticated} />
      </div>
    </div>
  )
}
