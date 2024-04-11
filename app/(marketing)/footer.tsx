import { Button } from '@/app/ui/components/Button'
import { Separator } from '@/app/ui/components/Separator'
import GitHub from '@/app/ui/svgs/social-icons/GitHub'
import LinkedIn from '@/app/ui/svgs/social-icons/LinkedIn'
import X from '@/app/ui/svgs/social-icons/X'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer({
  isAuthenticated,
}: {
  isAuthenticated: boolean
}) {
  return (
    <footer className="flex w-full flex-col items-center justify-between border-t lg:h-80 lg:flex-row lg:rounded-t-md lg:border-x">
      <div className="flex h-full w-full flex-col items-center justify-between gap-8 p-4 py-8 lg:aspect-square lg:w-auto lg:items-start lg:gap-0 lg:p-8">
        {/* Logo */}
        <div className=" flex flex-col items-center justify-start gap-4 lg:items-start">
          <Link
            href={isAuthenticated ? '/home' : '/'}
            className="flex items-center justify-center gap-2"
          >
            <Image src="/icon.svg" alt="SharePreviews" width={48} height={48} />
          </Link>
          <p className="text-muted-foreground">Built in Buenos Aires 🇦🇷</p>
        </div>
        {/* Social Profiles */}
        <div className="flex gap-2">
          <Button variant="outline" className="aspect-square w-10 p-0 " asChild>
            <Link
              href="https://twitter.com/sharepreviews"
              target="_blank"
              aria-label="Go to the project Twitter profile"
            >
              <X className="h-4 w-4" fillClassName="fill-foreground" />
              <span className="sr-only">Go to the project Twitter profile</span>
            </Link>
          </Button>
          <Button variant="outline" className="aspect-square w-10 p-0 " asChild>
            <Link
              href="https://github.com/sgalanb/sharepreviews"
              target="_blank"
              aria-label="Go to the project GitHub repository"
            >
              <GitHub className="h-4 w-4" fillClassName="fill-foreground" />
              <span className="sr-only">
                Go to the project GitHub repository
              </span>
            </Link>
          </Button>
          <Button variant="outline" className="aspect-square w-10 p-0" asChild>
            <Link
              href="https://www.linkedin.com/company/sharepreviews"
              target="_blank"
              aria-label="Go to the project LinkedIn page"
            >
              <LinkedIn className="h-4 w-4" fillClassName="fill-foreground" />
              <span className="sr-only">Go to the project LinkedIn page</span>
            </Link>
          </Button>
          {/* <Button variant="outline" className="aspect-square w-10 p-0" asChild>
            <Link
              href="https://github.com/sgalanb/sharepreviews"
              target="_blank"
            >
              <YouTube className="h-5 w-5" fillClassName="fill-foreground" />
            </Link>
          </Button> */}
        </div>
      </div>
      <Separator orientation="vertical" className="hidden h-full lg:block" />
      <div className="grid h-full w-full grid-cols-2 items-start justify-between gap-8 px-4 py-8 lg:flex lg:gap-0 lg:p-8">
        {/* Product */}
        <div className="flex flex-col items-start justify-start gap-3">
          <h3 className="font-semibold">Product</h3>
          <Link
            href="/about"
            className="text-muted-foreground hover:text-foreground"
          >
            About
          </Link>
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-foreground"
          >
            Blog
          </Link>
          <Link
            href="/starter-templates"
            className="text-muted-foreground hover:text-foreground"
          >
            Starter Templates
          </Link>
          <Link
            href="/pricing"
            className="text-muted-foreground hover:text-foreground"
          >
            Pricing
          </Link>
        </div>
        {/* Use cases */}
        <div className="flex flex-col items-start justify-start gap-3">
          <h3 className="font-semibold">Use cases</h3>
          <Link
            href="/starter-templates"
            className="text-muted-foreground hover:text-foreground"
          >
            eCommerce
          </Link>
          <Link
            href="/starter-templates"
            className="text-muted-foreground hover:text-foreground"
          >
            Blogs & News
          </Link>
          <Link
            href="/starter-templates"
            className="text-muted-foreground hover:text-foreground"
          >
            Social Profiles
          </Link>
          <Link
            href="/starter-templates"
            className="text-muted-foreground hover:text-foreground"
          >
            Fintech
          </Link>
          <Link
            href="/starter-templates"
            className="text-muted-foreground hover:text-foreground"
          >
            Dev Tools Docs
          </Link>
          <Link
            href="/starter-templates"
            className="text-muted-foreground hover:text-foreground"
          >
            Recruitment
          </Link>
          <Link
            href="/starter-templates"
            className="text-muted-foreground hover:text-foreground"
          >
            Events
          </Link>
        </div>
        {/* Free Tools */}
        <div className="flex flex-col items-start justify-start gap-3">
          <h3 className="font-semibold">Free tools</h3>
          <Link
            href="/card-validator"
            className="text-muted-foreground hover:text-foreground"
          >
            Card Validator
          </Link>
        </div>
        {/* Legal */}
        <div className="flex flex-col items-start justify-start gap-3">
          <h3 className="font-semibold">Legal</h3>
          <Link
            href="/privacy"
            className="text-muted-foreground hover:text-foreground"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-muted-foreground hover:text-foreground"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  )
}
