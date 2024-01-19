'use client'

import { Badge } from '@/app/ui/components/Badge'
import { Button } from '@/app/ui/components/Button'
import { Separator } from '@/app/ui/components/Separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/app/ui/components/Sheet'
import PictorialMark from '@/app/ui/svgs/PictorialMark'
import { ThemeToggle } from '@/app/ui/theme-toggle'
import { BookText, Globe, MenuIcon, MonitorCheck, Zap } from 'lucide-react'
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
      } sticky top-0 z-50 col-span-1 w-full border-b bg-background transition-colors duration-200 lg:flex lg:h-screen lg:w-64 lg:border-none lg:bg-white lg:p-2 lg:dark:bg-neutral-800`}
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
        <div className="flex w-full flex-col items-start justify-start gap-4">
          <div className="w-full pt-4">
            <Button variant="ghost" asChild>
              <Link
                href="/"
                className="flex !h-fit w-full items-center gap-2 hover:bg-accent"
              >
                <PictorialMark className="w-12 fill-primary" />
                <span className="text-base font-bold tracking-wide text-foreground">
                  sharepreviews
                </span>
              </Link>
            </Button>
          </div>

          <Separator />

          <div className="flex w-full flex-col items-start justify-start gap-2">
            <Button variant="ghost" asChild>
              <Link
                href="/validator"
                className={`${
                  pathname == '/validator'
                    ? 'bg-foreground text-background hover:bg-foreground/90 hover:text-background dark:bg-background dark:text-foreground dark:hover:bg-background/90 dark:hover:text-foreground'
                    : 'text-foreground hover:bg-accent'
                } flex w-full !justify-start gap-2`}
              >
                <MonitorCheck className="h-4 w-4" />
                Validator
              </Link>
            </Button>

            {/* <Button variant="ghost" asChild>
              <Link
                href="/manager"
                className={`${
                  pathname == '/manager'
                     ? 'bg-foreground text-background hover:bg-foreground/90 hover:text-background dark:bg-background dark:text-foreground dark:hover:bg-background/90 dark:hover:text-foreground'
                    : 'text-foreground hover:bg-accent'
                } flex w-full !justify-start gap-2`}
              >
                <Globe className="h-4 w-4" />
                Manager
              </Link>
            </Button> */}

            {/* <Button variant="ghost" asChild>
              <Link
                href="/generator"
                className={`${
                  pathname == '/generator'
                  ? 'bg-foreground text-background hover:bg-foreground/90 hover:text-background dark:bg-background dark:text-foreground dark:hover:bg-background/90 dark:hover:text-foreground'
                    : 'text-foreground hover:bg-accent'
                } flex w-full !justify-start gap-2`}
              >
                     <Zap className="h-4 w-4" />
                Generator
              </Link>
            </Button> */}

            <Button
              variant="ghost"
              className={`${
                pathname == '/generator'
                  ? 'bg-foreground text-background hover:bg-foreground/90 hover:text-background'
                  : ''
              } flex w-full items-center !justify-between gap-2 text-foreground opacity-50 hover:bg-accent`}
            >
              <div className="flex items-center justify-start gap-2">
                <Globe className="h-4 w-4" />
                Manager
              </div>
              <Badge variant="secondary">Coming Soon</Badge>
            </Button>

            <Button
              variant="ghost"
              className={`${
                pathname == '/generator'
                  ? 'bg-foreground text-background hover:bg-foreground/90 hover:text-background'
                  : ''
              } flex w-full items-center !justify-between gap-2 text-foreground opacity-50 hover:bg-accent`}
            >
              <div className="flex items-center justify-start gap-2">
                <Zap className="h-4 w-4" />
                Generator
              </div>
              <Badge variant="secondary">Coming Soon</Badge>
            </Button>
          </div>

          <Separator />

          <div className="flex w-full flex-col items-start justify-start gap-2">
            <Button variant="ghost" asChild>
              <Link
                href="/blog"
                className={`${
                  pathname == '/blog'
                    ? 'bg-foreground text-background hover:bg-foreground/90 hover:text-background dark:bg-background dark:text-foreground dark:hover:bg-background/90 dark:hover:text-foreground'
                    : 'text-foreground hover:bg-accent'
                } flex w-full !justify-start gap-2`}
              >
                <BookText className="h-4 w-4" />
                Blog
              </Link>
            </Button>

            {/* <Button variant="ghost" asChild>
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
            </Button> */}
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
