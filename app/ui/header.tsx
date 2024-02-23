'use client'

import { logout } from '@/app/actions'
import { Badge } from '@/app/ui/components/Badge'
import { Button } from '@/app/ui/components/Button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/app/ui/components/NavigationMenu'
import { Separator } from '@/app/ui/components/Separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/app/ui/components/Sheet'
import PictorialMark from '@/app/ui/svgs/PictorialMark'
import { ThemeToggle } from '@/app/ui/theme-toggle'
import { User } from '@workos-inc/node'
import {
  BookText,
  Github,
  MenuIcon,
  MonitorCheck,
  Twitter,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Header({
  authorizationUrl,
  isAuthenticated,
  user,
}: {
  authorizationUrl: string
  isAuthenticated: boolean
  user: User | undefined
}) {
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
      } ${
        isAuthenticated
          ? 'col-span-1 lg:flex lg:h-screen lg:w-64 lg:border-none lg:bg-neutral-50 lg:p-2 lg:dark:bg-neutral-800'
          : 'lg:h-[4.5rem]'
      } sticky top-0 z-50 w-full border-b bg-background transition-colors duration-200`}
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
                      Card Validator
                    </Link>
                  </Button>
                </SheetClose>

                <SheetClose asChild>
                  {/* <Button variant="ghost" asChild>
                    <Link
                      href="/generator"
                      className={`${
                        pathname == '/generator'
                          ? 'bg-accent text-accent-foreground'
                          : ''
                      } w-full !justify-start`}
                    >
                      Dynamic Image Generator
                    </Link>
                  </Button> */}
                  <Button variant="ghost" asChild>
                    <div className="flex w-full justify-between">
                      <span className={`!justify-start text-muted-foreground`}>
                        Dynamic Image Generator
                      </span>
                      <Badge variant="secondary">Coming Soon</Badge>
                    </div>
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
      {isAuthenticated ? (
        <>
          {/* Desktop App */}
          <div className="hidden h-full w-full flex-col items-start justify-between lg:flex">
            <div className="flex w-full flex-col items-start justify-start gap-4">
              <div className="w-full pt-4">
                <Button variant="ghost" asChild>
                  <Link
                    href="/"
                    className="flex !h-fit w-full items-center gap-2 hover:bg-accent"
                  >
                    <PictorialMark className="w-12 fill-primary" />
                    <span className="text-base font-semibold text-foreground">
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
                    Card Validator
                  </Link>
                </Button>

                <Button variant="ghost" asChild>
                  <Link
                    href="/generator"
                    className={`${
                      pathname == '/generator'
                        ? 'bg-foreground text-background hover:bg-foreground/90 hover:text-background dark:bg-background dark:text-foreground dark:hover:bg-background/90 dark:hover:text-foreground'
                        : 'text-foreground hover:bg-accent'
                    } flex w-full !justify-start gap-2`}
                  >
                    <Zap className="h-4 w-4" />
                    Dynamic Image Generator
                  </Link>
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
            <div className="flex w-full flex-col gap-4">
              {user && (
                <div className="flex flex-col gap-2">
                  <span>{user.email}</span>
                  <form action={logout}>
                    <Button variant="outline">Log Out</Button>
                  </form>
                </div>
              )}
              <Separator />
              <div className="flex gap-2">
                <ThemeToggle />
                <Button variant="outline" asChild>
                  <Link
                    href="https://github.com/sgalanb/sharepreviews"
                    target="_blank"
                    className="w-full"
                  >
                    <Github className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link
                    href="https://x.com/sgalanb"
                    target="_blank"
                    className="w-full"
                  >
                    <Twitter className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Desktop Landing */}
          <div className="mx-auto w-full max-w-7xl">
            <div className="hidden w-full items-center justify-between p-4 lg:flex">
              <Link href="/" className="flex items-center justify-center gap-2">
                <PictorialMark className="w-12 fill-primary" />
                <span className="text-base font-semibold text-foreground">
                  sharepreviews
                </span>
              </Link>

              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/validator" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Card Validator
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/pricing" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Pricing
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/blog" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Blog
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <div className="flex items-center justify-end gap-4">
                <ThemeToggle ghost />
                <Button asChild>
                  <Link href={authorizationUrl}>Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
