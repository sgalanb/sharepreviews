import { Button } from '@/app/ui/components/Button'
import GitHub from '@/app/ui/svgs/social-icons/GitHub'
import LinkedIn from '@/app/ui/svgs/social-icons/LinkedIn'
import X from '@/app/ui/svgs/social-icons/X'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center justify-between gap-4 border-t pt-4 lg:flex-row">
      {/* Logo */}
      <Link href="/" className="flex items-center justify-center gap-2">
        <Image src="/icon.svg" alt="SharePreviews" width={40} height={40} />
      </Link>

      <p className="text-muted-foreground">
        Built in Buenos Aires by{' '}
        <Link
          href="https://santigalan.com"
          target="_blank"
          className="italic text-foreground underline-offset-2 hover:underline"
        >
          Santiago Galán
        </Link>
      </p>

      {/* Social Profiles */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="aspect-square w-10 cursor-pointer p-0"
          asChild
        >
          <Link
            href="https://github.com/sgalanb/sharepreviews"
            target="_blank"
            aria-label="Go to the project GitHub repository"
          >
            <GitHub className="h-4 w-4" fillClassName="fill-foreground" />
            <span className="sr-only">Go to the project GitHub repository</span>
          </Link>
        </Button>
        <Button
          variant="outline"
          className="aspect-square w-10 cursor-pointer p-0"
          asChild
        >
          <Link
            href="https://twitter.com/sgalanb"
            target="_blank"
            aria-label="Go to the creator twitter profile"
          >
            <X className="h-4 w-4" fillClassName="fill-foreground" />
            <span className="sr-only">Go to the creator Twitter profile</span>
          </Link>
        </Button>
        <Button
          variant="outline"
          className="aspect-square w-10 cursor-pointer p-0"
          asChild
        >
          <Link
            href="https://www.linkedin.com/in/sgalanb/"
            target="_blank"
            aria-label="Go to the creator LinkedIn page"
          >
            <LinkedIn className="h-4 w-4" fillClassName="fill-foreground" />
            <span className="sr-only">Go to the creator LinkedIn page</span>
          </Link>
        </Button>
      </div>
    </footer>
  )
}
