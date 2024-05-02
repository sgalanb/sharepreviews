'use client'

import { logout } from '@/app/actions/actions'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/ui/components/Avatar'
import { Button } from '@/app/ui/components/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/ui/components/DropdownMenu'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/app/ui/components/NavigationMenu'
import { ThemeToggle } from '@/app/ui/theme-toggle'
import { track } from '@vercel/analytics/react'
import { User } from '@workos-inc/node'
import { LayoutGrid, LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function HeaderMarketing({
  isAuthenticated,
  user,
  authorizationUrl,
}: {
  isAuthenticated: boolean
  authorizationUrl: string
  user: User | undefined
}) {
  return (
    <header className="sticky top-0 z-50 hidden h-[4.5rem] w-full max-w-5xl rounded-t-md border-b bg-background transition-colors duration-200 lg:flex">
      <div className="mx-auto flex w-full items-center justify-between p-4">
        <Link
          href="/home"
          className={`${isAuthenticated ? 'w-24' : 'w-[165.75px]'} flex items-center justify-start gap-2`}
        >
          <Image src="/icon.svg" alt="SharePreviews" width={40} height={40} />
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/starter-templates" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Starter Templates
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/card-validator" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Card Validator
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
            <NavigationMenuItem>
              <Link href="/blog" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Blog
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center justify-end gap-4">
          <ThemeToggle ghost />
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.profilePictureUrl ?? ''} alt="" />
                  {user.firstName && user.lastName ? (
                    <AvatarFallback>
                      {user.firstName[0] + user.lastName[0]}
                    </AvatarFallback>
                  ) : (
                    <AvatarFallback>
                      {user.email[0] + user.email[1]}
                    </AvatarFallback>
                  )}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-52 p-2"
                align="end"
                sideOffset={8}
              >
                <DropdownMenuLabel>
                  <div className="full flex flex-col items-start justify-center gap-1">
                    <p className="leading-none">{`${user.firstName} ${user.lastName}`}</p>
                    <p className="line-clamp-1 max-w-full font-normal text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer" asChild>
                    <Link href="/">
                      <LayoutGrid className="mr-2 h-4 w-4" />
                      <span>Go to dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => logout()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link
                href={authorizationUrl}
                onClick={() => track('start_for_free_header')}
                className="cursor-pointer"
              >
                Start for Free
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
