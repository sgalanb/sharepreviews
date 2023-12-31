'use client'

import { Button } from '@/app/ui/components/Button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/app/ui/components/Sheet'
import PictorialMark from '@/app/ui/svgs/PictorialMark'
import { ThemeToggle } from '@/app/ui/theme-toggle'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Clean up the listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={`${
        isScrolled
          ? 'border-gray-500/10 dark:border-zinc-800'
          : 'border-transparent'
      } sticky top-0 z-50 col-span-1 w-full border-b bg-background transition-colors duration-200 lg:flex lg:h-screen lg:w-64 lg:border-none lg:bg-neutral-100 lg:p-2 lg:dark:bg-neutral-800`}
    >
      {/* Mobile */}
      <div className="mx-auto w-full max-w-screen-2xl px-4 lg:hidden">
        <nav className="flex items-center justify-between py-2">
          <Sheet>
            <SheetTrigger>
              <MenuIcon className="m-2 h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="left" className="pt-12">
              <div className="flex flex-col items-start justify-start gap-1">
                <SheetClose asChild>
                  <Button variant="ghost" asChild>
                    <Link
                      href="/validator"
                      className={`${
                        pathname == '/validator'
                          ? 'bg-accent text-accent-foreground'
                          : ''
                      } w-full !justify-start`}
                    >
                      Validator
                    </Link>
                  </Button>
                </SheetClose>

                <SheetClose asChild>
                  <Button variant="ghost" asChild>
                    <Link
                      href="/generator"
                      className={`${
                        pathname == '/generator'
                          ? 'bg-accent text-accent-foreground'
                          : ''
                      } w-full !justify-start`}
                    >
                      Generator
                    </Link>
                  </Button>
                </SheetClose>

                <SheetClose asChild>
                  <Button variant="ghost" asChild>
                    <Link
                      href="/manager"
                      className={`${
                        pathname == '/manager'
                          ? 'bg-accent text-accent-foreground'
                          : ''
                      } w-full !justify-start`}
                    >
                      Manager
                    </Link>
                  </Button>
                </SheetClose>

                <SheetClose asChild>
                  <Button variant="ghost" asChild>
                    <Link
                      href="/blog"
                      className={`${
                        pathname == '/blog'
                          ? 'bg-accent text-accent-foreground'
                          : ''
                      } w-full !justify-start`}
                    >
                      Blog
                    </Link>
                  </Button>
                </SheetClose>

                <SheetClose asChild>
                  <Button variant="ghost" asChild>
                    <Link
                      href="/pricing"
                      className={`${
                        pathname == '/pricing'
                          ? 'bg-accent text-accent-foreground'
                          : ''
                      } w-full !justify-start`}
                    >
                      Pricing
                    </Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center justify-center gap-2">
            <PictorialMark className="w-12 fill-primary" />
            <span className="font-bold">sharepreviews</span>
          </Link>
          <ThemeToggle ghost />
        </nav>
      </div>
      {/* Desktop */}
      <div className="hidden h-full w-full flex-col items-start justify-between lg:flex">
        <div className="flex w-full flex-col items-start justify-start gap-8">
          <div className="w-full pt-4">
            <Button variant="ghost" asChild>
              <Link
                href="/"
                className="flex !h-fit w-full items-center !justify-start gap-2 hover:bg-neutral-200 dark:hover:bg-accent"
              >
                <PictorialMark className="w-12 fill-primary" />
                <span className="text-base font-bold tracking-wide text-foreground">
                  sharepreviews
                </span>
              </Link>
            </Button>
          </div>
          <div className="flex w-full flex-col items-start justify-start gap-1">
            <Button variant="ghost" asChild>
              <Link
                href="/validator"
                className={`${
                  pathname == '/validator'
                    ? 'bg-neutral-200 text-accent-foreground dark:bg-accent'
                    : ''
                } w-full !justify-start hover:bg-neutral-200 dark:hover:bg-accent`}
              >
                ✔️ Validator
              </Link>
            </Button>

            <Button variant="ghost" asChild>
              <Link
                href="/generator"
                className={`${
                  pathname == '/generator'
                    ? 'bg-neutral-200 text-accent-foreground dark:bg-accent'
                    : ''
                } w-full !justify-start hover:bg-neutral-200 dark:hover:bg-accent`}
              >
                ⚙ Generator
              </Link>
            </Button>

            <Button variant="ghost" asChild>
              <Link
                href="/manager"
                className={`${
                  pathname == '/manager'
                    ? 'bg-neutral-200 text-accent-foreground dark:bg-accent'
                    : ''
                } w-full !justify-start hover:bg-neutral-200 dark:hover:bg-accent`}
              >
                🔜 Manager
              </Link>
            </Button>

            <Button variant="ghost" asChild>
              <Link
                href="/blog"
                className={`${
                  pathname == '/blog'
                    ? 'bg-neutral-200 text-accent-foreground dark:bg-accent'
                    : ''
                } mt-6 w-full !justify-start hover:bg-neutral-200 dark:hover:bg-accent`}
              >
                Blog
              </Link>
            </Button>

            <Button variant="ghost" asChild>
              <Link
                href="/pricing"
                className={`${
                  pathname == '/pricing'
                    ? 'bg-neutral-200 text-accent-foreground dark:bg-accent'
                    : ''
                } w-full !justify-start hover:bg-neutral-200 dark:hover:bg-accent`}
              >
                Pricing
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <ThemeToggle />
          <Button variant="outline">Sign In</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </header>
  )
}
