import Footer from '@/app/(marketing)/footer'
import { getUser } from '@/app/lib/workos'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About | sharepreviews',
  description:
    'Why social cards are one of the most undervalued aspects of digital marketing and how sharepreviews want to change that.',
}

export default async function AboutPage() {
  const { isAuthenticated } = await getUser()

  return (
    <div className="flex h-full w-full max-w-7xl flex-col items-center justify-start gap-20 px-4 pt-20">
      <div className="flex w-full max-w-3xl flex-col items-start justify-start gap-4 self-center lg:px-4">
        {/* <span className="self-center text-muted-foreground">
          {dayjs('03/29/2024').format('MMM D, YYYY')}
        </span> */}
        <h1 className="marketing-title text-balance text-center">
          A platform to generate and manage social cards
        </h1>
        <p className="marketing-subtitle w-full text-balance text-center text-muted-foreground">
          Hi, I&apos;m Santiago and I think that social cards are one of the
          most undervalued aspects of digital marketing.
        </p>
      </div>

      <div className="flex w-full max-w-[36rem] flex-col items-start justify-start gap-10">
        <div className="flex flex-col items-start justify-start gap-2">
          <h2 className="marketing-third-title">What are social cards?</h2>
          <p className="w-full text-base text-muted-foreground">
            Also know as OpenGraph cards, they are the{' '}
            <strong className="font-normal text-foreground/80">
              previews diplayed when a URL is shared on a social media
            </strong>{' '}
            post or message.
          </p>
          <p className="w-full text-base text-muted-foreground">
            In most platforms,{' '}
            <strong className="font-normal text-foreground/80">
              they consists of an image, a title and a description
            </strong>
            . What is shown when a page is shared can be customized by website
            owners using HTML metatags.
          </p>
        </div>
        <div className="flex flex-col items-start justify-start gap-2">
          <h2 className="marketing-third-title">
            Why are social cards important?
          </h2>
          <p className="w-full text-base text-muted-foreground">
            Despite their simplicity,{' '}
            <strong className="font-normal text-foreground/80">
              they are the first impression of a website
            </strong>{' '}
            when a link is shared on social media. If done right, they make the
            difference between a user clicking on the link or scrolling past it.
          </p>
          <p className="w-full text-base text-muted-foreground">
            They also are an{' '}
            <strong className="font-normal text-foreground/80">
              extension of the website&apos;s branding
            </strong>{' '}
            and help to create a consistent experience across platforms.
          </p>
        </div>
        <div className="flex flex-col items-start justify-start gap-2">
          <h2 className="marketing-third-title">
            What does <span className="text-primary">sharepreviews</span> do?
          </h2>
          <p className="w-full text-base text-muted-foreground">
            It provides an easy-to-use interface to create templates that can{' '}
            <strong className="font-normal text-foreground/80">
              automatically generate social card images for each page of a
              website based on its content
            </strong>
            .
          </p>
        </div>
        <div className="flex flex-col items-start justify-start gap-2">
          <h2 className="marketing-third-title">Who is it for?</h2>
          <p className="w-full text-base text-muted-foreground">
            Some{' '}
            <strong className="font-normal text-foreground/80">
              proven use cases
            </strong>{' '}
            for dynamic social card images are{' '}
            <strong className="font-normal text-foreground/80">
              blog posts, eCommerce product pages, social media profiles, and
              more
            </strong>
            .
          </p>
          <p className="w-full text-base text-muted-foreground">
            It&apos;s also a no-code solution that don&apos;t require any
            technical knowledge to use, so it&apos; perfect for modern{' '}
            <strong className="font-normal text-foreground/80">
              marketing and product teams
            </strong>
            .
          </p>
        </div>
      </div>
      <Link
        href="https://x.com/sgalanb"
        target="_blank"
        className="flex flex-col gap-4 rounded-lg border bg-card p-4 text-muted-foreground shadow-sm hover:bg-foreground/5"
      >
        <span>Got questions or ideas? Feel free to DM me on X!</span>
        <div className="flex items-center justify-start gap-2 self-center">
          <Image
            src="/pfp.jpeg"
            alt="author profile picture"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="text-balance font-medium leading-5">
            Santiago Galán
          </span>
        </div>
      </Link>
      <Footer isAuthenticated={isAuthenticated} />
    </div>
  )
}
