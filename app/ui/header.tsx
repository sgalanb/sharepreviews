'use client'

import { Button } from '@/app/ui/components/Button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/app/ui/components/NavigationMenu'
import { MenuToggle } from '@/app/ui/menu-toggle'
import PictorialMark from '@/app/ui/svgs/PictorialMark'
import { ThemeToggle } from '@/app/ui/theme-toggle'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Header() {
  const [isOpenMobileHeader, setIsOpenMobileHeader] = useState<boolean>(false)
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
      className={`sticky top-0 z-50 border-b ${
        isScrolled || isOpenMobileHeader
          ? 'border-gray-500/10 bg-neutral-100 dark:border-zinc-800'
          : 'border-transparent bg-neutral-100'
      } transition-colors duration-200 dark:bg-neutral-900`}
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Mobile */}
        <nav className="flex h-fit items-center justify-between py-4 pl-4 pr-0 md:hidden">
          <div className="flex w-full flex-col items-start justify-between">
            <Link href="/">
              <p className="text-2xl font-bold tracking-tighter">
                SharePreviews
              </p>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-1">
            <ThemeToggle />
            <MenuToggle
              toggle={() => setIsOpenMobileHeader(!isOpenMobileHeader)}
              isOpen={isOpenMobileHeader}
            />
          </div>
        </nav>
        {isOpenMobileHeader && (
          <div className="absolute left-0 top-20 z-50 w-full flex-col bg-white p-4 lg:hidden dark:bg-neutral-900">
            <Link href="/" className="w-full">
              <div
                className="border-b border-gray-200 py-4 text-sm font-medium"
                onClick={() => setIsOpenMobileHeader(false)}
              >
                Inicio
              </div>
            </Link>
          </div>
        )}

        {/* Desktop */}
        <div className="hidden h-20 w-full items-center justify-between p-3 lg:flex">
          <Link href="/" className="flex items-center justify-center gap-2">
            <PictorialMark className="w-12 fill-primary" />
            <span className="font-bold">sharepreviews</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Validator
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/pricing" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex w-[10.70875rem] items-center justify-end gap-4">
            <Button variant="outline">Sign In</Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
