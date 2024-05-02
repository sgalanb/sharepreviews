'use client'

import { logout } from '@/app/actions/actions'
import { goToLemonSubscriptionPortalAction } from '@/app/actions/lemonActions'
import { ProjectType } from '@/app/db/schema'
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '@/app/ui/components/Select'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/app/ui/components/Sheet'
import Spinner from '@/app/ui/components/Spinner'
import { ThemeToggle } from '@/app/ui/theme-toggle'
import { track } from '@vercel/analytics/react'
import { User } from '@workos-inc/node'
import {
  CreditCard,
  LayoutGrid,
  LogOut,
  MenuIcon,
  SquareArrowOutUpRight,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function HeaderMobile({
  isAuthenticated,
  user,
  authorizationUrl,
  userProjects,
  isApp,
  reservedNames,
}: {
  isAuthenticated: boolean
  user: User | undefined
  authorizationUrl: string
  userProjects?: ProjectType[]
  isApp: boolean
  reservedNames?: string[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const projectPathname = pathname.split('/')[1]

  const [isLoadingBillingRedirect, setIsLoadingBillingRedirect] =
    useState<boolean>(false)

  // check if at least one project has a subscription
  const hasProjectWithSubscription =
    userProjects?.some((project) => project.plan !== 'free') ?? false

  const selectedProjectSubscriptionId =
    userProjects?.find((project) => project.pathname === projectPathname)
      ?.suscriptionId ?? undefined

  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false)

  // Project Selector
  const [openProjectsCombobox, setOpenProjectsCombobox] =
    useState<boolean>(false)
  const [projectsComboboxValue, setProjectsComboboxValue] =
    useState<string>(projectPathname)

  const projectsList = userProjects
    ?.sort((a, b) => a.name.localeCompare(b.name))
    ?.map((project) => ({
      value: project.pathname,
      label: project.name,
    }))

  useEffect(() => {
    setProjectsComboboxValue(projectPathname)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background transition-colors duration-200 lg:hidden">
      <nav className="w-fulls flex items-center justify-between p-2">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger aria-label="Open navigation">
            <div className={isAuthenticated ? 'w-24' : ''}>
              <MenuIcon className="m-2 h-6 w-6" />
            </div>
          </SheetTrigger>
          <SheetContent side="left" className="pt-12">
            <div className="flex flex-col items-start justify-start gap-1">
              {isApp ? (
                <>
                  {/* Project selector */}
                  <Select
                    onValueChange={(newValue) => {
                      setProjectsComboboxValue(newValue)
                      if (newValue !== projectsComboboxValue) {
                        // replace projectPathname with new value but keep the rest of the path
                        router.push(pathname.replace(projectPathname, newValue))
                      }
                      setIsSheetOpen(false)
                    }}
                    open={openProjectsCombobox}
                    onOpenChange={(isOpen) => setOpenProjectsCombobox(isOpen)}
                    value={projectsComboboxValue}
                  >
                    <SelectTrigger className="mb-5">
                      <span className="line-clamp-1 w-full text-left">
                        {projectsComboboxValue
                          ? projectsList?.find(
                              (project) =>
                                project.value === projectsComboboxValue
                            )?.label
                          : 'Select project...'}
                      </span>
                    </SelectTrigger>
                    <SelectContent
                      className="w-full p-0"
                      align="end"
                      sideOffset={8}
                    >
                      <SelectGroup>
                        {projectsList?.map((project) => (
                          <SelectItem key={project.value} value={project.value}>
                            {project.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <SheetClose asChild>
                    <Button variant="ghost" asChild>
                      <Link
                        href="/"
                        className={`${
                          pathname == `/${projectPathname}`
                            ? 'bg-accent text-accent-foreground'
                            : ''
                        } w-full !justify-start`}
                      >
                        Overview
                      </Link>
                    </Button>
                  </SheetClose>

                  <SheetClose asChild>
                    <Button variant="ghost" asChild>
                      <Link
                        href={`/${projectPathname}/templates`}
                        className={`${
                          pathname.startsWith(`/${projectPathname}/templates`)
                            ? 'bg-accent text-accent-foreground'
                            : ''
                        } w-full !justify-start`}
                      >
                        Templates
                      </Link>
                    </Button>
                  </SheetClose>

                  <SheetClose asChild>
                    <Button variant="ghost" asChild>
                      <Link
                        href={`/${projectPathname}/validator`}
                        className={`${
                          pathname.startsWith(`/${projectPathname}/validator`)
                            ? 'bg-accent text-accent-foreground'
                            : ''
                        } w-full !justify-start`}
                      >
                        Card Validator
                      </Link>
                    </Button>
                  </SheetClose>
                </>
              ) : (
                <>
                  <SheetClose asChild>
                    <Button variant="ghost" asChild>
                      <Link
                        href="/home"
                        className={`${
                          pathname == '/' || pathname == '/home'
                            ? 'bg-accent text-accent-foreground'
                            : ''
                        } w-full !justify-start`}
                      >
                        Home
                      </Link>
                    </Button>
                  </SheetClose>

                  <SheetClose asChild>
                    <Button variant="ghost" asChild>
                      <Link
                        href="/starter-templates"
                        className={`${
                          pathname.startsWith('/starter-templates')
                            ? 'bg-accent text-accent-foreground'
                            : ''
                        } w-full !justify-start`}
                      >
                        Starter Templates
                      </Link>
                    </Button>
                  </SheetClose>

                  <SheetClose asChild>
                    <Button variant="ghost" asChild>
                      <Link
                        href="/card-validator"
                        className={`${
                          pathname.startsWith('/card-validator')
                            ? 'bg-accent text-accent-foreground'
                            : ''
                        } w-full !justify-start`}
                      >
                        Card Validator
                      </Link>
                    </Button>
                  </SheetClose>

                  <SheetClose asChild>
                    <Button variant="ghost" asChild>
                      <Link
                        href="/pricing"
                        className={`${
                          pathname.startsWith('/pricing')
                            ? 'bg-accent text-accent-foreground'
                            : ''
                        } w-full !justify-start`}
                      >
                        Pricing
                      </Link>
                    </Button>
                  </SheetClose>

                  <SheetClose asChild>
                    <Button variant="ghost" asChild>
                      <Link
                        href="/blog"
                        className={`${
                          pathname.startsWith('/blog')
                            ? 'bg-accent text-accent-foreground'
                            : ''
                        } w-full !justify-start`}
                      >
                        Blog
                      </Link>
                    </Button>
                  </SheetClose>

                  {!isAuthenticated && (
                    <SheetClose asChild>
                      <Button asChild>
                        <Link
                          href={authorizationUrl}
                          className="mt-4 w-full"
                          onClick={() => track('start_for_free_header')}
                        >
                          Start for Free
                        </Link>
                      </Button>
                    </SheetClose>
                  )}
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
        <Link
          href={isApp ? `/${projectPathname}` : '/home'}
          className="flex items-center justify-center gap-2"
        >
          <Image src="/icon.svg" alt="SharePreviews" width={40} height={40} />
        </Link>
        <div className="flex gap-2">
          <ThemeToggle ghost />
          {isAuthenticated && user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="mr-2">
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
                onEscapeKeyDown={(e) => {
                  isLoadingBillingRedirect && e.preventDefault()
                }}
                onPointerDownOutside={(e) => {
                  isLoadingBillingRedirect && e.preventDefault()
                }}
                onFocusOutside={(e) => {
                  isLoadingBillingRedirect && e.preventDefault()
                }}
                onInteractOutside={(e) => {
                  isLoadingBillingRedirect && e.preventDefault()
                }}
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
                  {isApp ? (
                    <DropdownMenuItem
                      disabled={isLoadingBillingRedirect}
                      asChild
                    >
                      <Link href="/home" target="_blank">
                        <SquareArrowOutUpRight className="mr-2 h-4 w-4" />
                        <span>Go to homepage</span>
                      </Link>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      disabled={isLoadingBillingRedirect}
                      asChild
                    >
                      <Link href="/">
                        <LayoutGrid className="mr-2 h-4 w-4" />
                        <span>Go to dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {hasProjectWithSubscription &&
                    selectedProjectSubscriptionId && (
                      <DropdownMenuItem
                        onSelect={(event) => event.preventDefault()}
                        asChild
                      >
                        <button
                          className={`${isLoadingBillingRedirect ? 'bg-accent' : ''} flex w-full items-center justify-between`}
                          onClick={async () => {
                            if (!isLoadingBillingRedirect) {
                              setIsLoadingBillingRedirect(true)
                              await goToLemonSubscriptionPortalAction(
                                selectedProjectSubscriptionId
                              )
                            }
                          }}
                        >
                          <div className="flex items-center justify-center">
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span>Billing</span>
                          </div>
                          {isLoadingBillingRedirect && (
                            <Spinner className="h-4 w-4 fill-foreground text-foreground/25" />
                          )}
                        </button>
                      </DropdownMenuItem>
                    )}
                  <DropdownMenuItem
                    disabled={isLoadingBillingRedirect}
                    onClick={() => logout()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </header>
  )
}
