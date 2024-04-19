'use client'

import { logout } from '@/app/actions/actions'
import { goToLemonSubscriptionPortalAction } from '@/app/actions/lemonActions'
import { ProjectType } from '@/app/db/schema'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/ui/components/Avatar'
import { Button } from '@/app/ui/components/Button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from '@/app/ui/components/Command'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/app/ui/components/DropdownMenu'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/app/ui/components/NavigationMenu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/ui/components/Popover'
import { Separator } from '@/app/ui/components/Separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/app/ui/components/Sheet'
import Spinner from '@/app/ui/components/Spinner'
import NewProjectDialog from '@/app/ui/dialogs/new-project-dialog'
import { ThemeToggle } from '@/app/ui/theme-toggle'
import { cn } from '@/app/utils'
import { track } from '@vercel/analytics/react'
import { User } from '@workos-inc/node'
import {
  Check,
  ChevronsUpDown,
  CreditCard,
  ImageIcon,
  LayoutGrid,
  LayoutTemplate,
  LogOut,
  MenuIcon,
  MonitorCheck,
  Moon,
  Newspaper,
  Plus,
  SquareArrowOutUpRight,
  Sun,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Header({
  authorizationUrl,
  isApp,
  user,
  userProjects,
  reservedNames,
}: {
  authorizationUrl: string
  isApp: boolean
  user: User | undefined
  userProjects?: ProjectType[]
  reservedNames?: string[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const projectPathname = pathname.split('/')[1]
  const { theme, setTheme } = useTheme()

  // Scroll effect
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

  // App Project Selector
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

  const hasProjectWithSubscription =
    // check if at least one project has a subscription
    userProjects?.some((project) => project.plan !== 'free') ?? false

  const selectedProjectSubscriptionId =
    userProjects?.find((project) => project.pathname === projectsComboboxValue)
      ?.suscriptionId ?? undefined

  const [isLoadingBillingRedirect, setIsLoadingBillingRedirect] =
    useState<boolean>(false)

  return (
    <header
      className={`${
        isScrolled ? 'border-border dark:border-border' : 'border-transparent'
      } ${
        isApp
          ? 'col-span-1 w-full lg:flex lg:h-screen lg:w-64 lg:border-none lg:bg-neutral-50 lg:p-2 lg:dark:bg-neutral-800'
          : 'w-full max-w-7xl lg:h-[4.5rem] lg:w-[calc(100%-32px)] lg:rounded-b-md lg:border-x'
      } sticky top-0 z-50 border-b bg-background transition-colors duration-200`}
    >
      {/* Mobile */}
      <div className="mx-auto w-full max-w-screen-2xl px-2 lg:hidden">
        <nav className="flex items-center justify-between py-2">
          <Sheet>
            <SheetTrigger aria-label="Open navigation">
              <div className={user ? 'w-24' : ''}>
                <MenuIcon className="m-2 h-6 w-6" />
              </div>
            </SheetTrigger>
            <SheetContent side="left" className="pt-12">
              <div className="flex flex-col items-start justify-start gap-1">
                {isApp ? (
                  <>
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
                          href="/about"
                          className={`${
                            pathname.startsWith('/about')
                              ? 'bg-accent text-accent-foreground'
                              : ''
                          } w-full !justify-start`}
                        >
                          About
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

                    {!user && (
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
            href={isApp ? '/' : '/home'}
            className="flex items-center justify-center gap-2"
          >
            <Image src="/icon.svg" alt="SharePreviews" width={40} height={40} />
          </Link>
          <div className="flex gap-2">
            <ThemeToggle ghost />
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="mr-2 cursor-pointer">
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
                        className="cursor-pointer"
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
                        className="cursor-pointer"
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
                          className="cursor-pointer"
                          onSelect={(event) => event.preventDefault()}
                          asChild
                        >
                          <button
                            className={`${isLoadingBillingRedirect ? 'bg-accent' : ''} flex w-full cursor-pointer items-center justify-between`}
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
                      className="cursor-pointer"
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
      </div>
      {isApp ? (
        <>
          {/* Desktop App */}
          <div className="hidden h-full w-full flex-col items-start justify-between lg:flex">
            <div className="flex w-full flex-col items-start justify-start gap-2">
              <Button variant="ghost" asChild>
                <Link href="/" className="mb-2 mt-4">
                  <Image
                    src="/icon.svg"
                    alt="SharePreviews"
                    width={24}
                    height={24}
                    className="pointer-events-none"
                  />
                </Link>
              </Button>

              <div className="flex w-full flex-col items-start justify-start gap-2">
                <Button variant="ghost" asChild>
                  <Link
                    href={`/${projectPathname}`}
                    className={`${
                      pathname == `/${projectPathname}`
                        ? 'bg-foreground text-background hover:bg-foreground/90 hover:text-background dark:bg-background dark:text-foreground dark:hover:bg-background/90 dark:hover:text-foreground'
                        : 'text-foreground hover:bg-accent'
                    } flex w-full !justify-start gap-2`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                    Overview
                  </Link>
                </Button>

                <Button variant="ghost" asChild>
                  <Link
                    href={`/${projectPathname}/templates`}
                    className={`${
                      pathname == `/${projectPathname}/templates`
                        ? 'bg-foreground text-background hover:bg-foreground/90 hover:text-background dark:bg-background dark:text-foreground dark:hover:bg-background/90 dark:hover:text-foreground'
                        : 'text-foreground hover:bg-accent'
                    } flex w-full !justify-start gap-2`}
                  >
                    <ImageIcon className="h-4 w-4" />
                    Templates
                  </Link>
                </Button>
              </div>
              <Button variant="ghost" asChild>
                <Link
                  href={`/${projectPathname}/validator`}
                  className={`${
                    pathname == `/${projectPathname}/validator`
                      ? 'bg-foreground text-background hover:bg-foreground/90 hover:text-background dark:bg-background dark:text-foreground dark:hover:bg-background/90 dark:hover:text-foreground'
                      : 'text-foreground hover:bg-accent'
                  } flex w-full !justify-start gap-2`}
                >
                  <MonitorCheck className="h-4 w-4" />
                  Card Validator
                </Link>
              </Button>
            </div>
            <div className="flex w-full flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Button variant="outline" asChild>
                  <Link
                    href="/starter-templates"
                    className="flex w-full !justify-start gap-2 text-foreground hover:bg-accent"
                    target="_blank"
                  >
                    <LayoutTemplate className="h-4 w-4" />
                    Starter Templates
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link
                    href="/blog"
                    className="flex w-full !justify-start gap-2 text-foreground hover:bg-accent"
                    target="_blank"
                  >
                    <Newspaper className="h-4 w-4" />
                    Blog
                  </Link>
                </Button>
              </div>
              <Separator />
              {user && (
                <div className="grid grid-cols-3 gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="col-span-1">
                        <Avatar className="h-7 w-7">
                          <AvatarImage
                            src={user.profilePictureUrl ?? ''}
                            alt=""
                          />
                          {user.firstName && user.lastName ? (
                            <AvatarFallback className="text-xs">
                              {user.firstName[0] + user.lastName[0]}
                            </AvatarFallback>
                          ) : (
                            <AvatarFallback className="text-xs">
                              {user.email[0] + user.email[1]}
                            </AvatarFallback>
                          )}
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-60 p-2"
                      align="start"
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
                        {/* Theme toggle */}
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger
                            className="flex items-center justify-start gap-2"
                            disabled={isLoadingBillingRedirect}
                          >
                            <Sun
                              className={`${isLoadingBillingRedirect ? 'stroke-muted-foreground' : ''} h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0`}
                            />
                            <Moon
                              className={`${isLoadingBillingRedirect ? 'stroke-muted-foreground' : ''} absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100`}
                            />
                            <span
                              className={
                                isLoadingBillingRedirect
                                  ? 'text-muted-foreground'
                                  : ''
                              }
                            >
                              {theme === 'dark'
                                ? 'Dark'
                                : theme === 'light'
                                  ? 'Light'
                                  : 'System'}
                            </span>
                            <span className="sr-only">Toggle theme</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent className="p-2">
                              <DropdownMenuItem
                                onClick={() => setTheme('light')}
                              >
                                Light
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => setTheme('dark')}
                              >
                                Dark
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => setTheme('system')}
                              >
                                System
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          disabled={isLoadingBillingRedirect}
                          asChild
                        >
                          <Link href="/home" target="_blank">
                            <SquareArrowOutUpRight className="mr-2 h-4 w-4" />
                            <span>Go to homepage</span>
                          </Link>
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => redirectAction('/account-settings')}
                        >
                          <UserRoundCog className="mr-2 h-4 w-4" />
                          <span>Account settings</span>
                        </DropdownMenuItem> */}
                        {hasProjectWithSubscription &&
                          selectedProjectSubscriptionId && (
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onSelect={(event) => event.preventDefault()}
                              asChild
                            >
                              <button
                                className={`${isLoadingBillingRedirect ? 'bg-accent' : ''} flex w-full cursor-pointer items-center justify-between`}
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
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="cursor-pointer"
                          disabled={isLoadingBillingRedirect}
                          onClick={() => logout()}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log out</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {/* Project selector */}
                  <Popover
                    open={openProjectsCombobox}
                    onOpenChange={setOpenProjectsCombobox}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openProjectsCombobox}
                        className="col-span-2 justify-between"
                      >
                        {projectsComboboxValue
                          ? projectsList?.find(
                              (project) =>
                                project.value === projectsComboboxValue
                            )?.label
                          : 'Select project...'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-[9.83375rem] p-0"
                      align="end"
                      sideOffset={8}
                    >
                      <Command>
                        <CommandInput placeholder="Search project..." />
                        <CommandEmpty>No project found.</CommandEmpty>
                        <CommandGroup>
                          {projectsList?.map((project) => (
                            <CommandItem
                              key={project.value}
                              value={project.value}
                              onSelect={(newValue) => {
                                setProjectsComboboxValue(
                                  newValue === projectsComboboxValue
                                    ? projectsComboboxValue
                                    : newValue
                                )
                                if (newValue !== projectsComboboxValue) {
                                  // replace projectPathname with new value but keep the rest of the path
                                  router.push(
                                    pathname.replace(projectPathname, newValue)
                                  )
                                }
                                setOpenProjectsCombobox(false)
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  projectsComboboxValue === project.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {project.label}
                            </CommandItem>
                          ))}
                          <CommandSeparator className="my-1" />
                          <CommandItem className="cursor-pointer">
                            <NewProjectDialog
                              userId={user.id}
                              trigger={
                                <div className="flex w-full items-center justify-center gap-2">
                                  <Plus className="h-4 w-4" />
                                  New project
                                </div>
                              }
                              reservedNames={reservedNames ?? []}
                            />
                          </CommandItem>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Desktop Marketing*/}
          <div className="mx-auto w-full max-w-7xl">
            <div className="hidden w-full items-center justify-between p-4 lg:flex">
              <Link
                href="/home"
                className={`${user ? 'w-24' : 'w-[165.75px]'} flex items-center justify-start gap-2`}
              >
                <Image
                  src="/icon.svg"
                  alt="SharePreviews"
                  width={40}
                  height={40}
                />
              </Link>

              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/about" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        About
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/starter-templates" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Starter Templates
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/card-validator" legacyBehavior passHref>
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
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="cursor-pointer">
                        <AvatarImage
                          src={user.profilePictureUrl ?? ''}
                          alt=""
                        />
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
                    >
                      Start for Free
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
