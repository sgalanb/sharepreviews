'use client'

import { logout, redirectAction } from '@/app/actions'
import { ProjectType } from '@/app/db/schema'
import { Avatar, AvatarFallback, AvatarImage } from '@/app/ui/components/Avatar'
import { Badge } from '@/app/ui/components/Badge'
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
import NewProjectDialog from '@/app/ui/dialogs/new-project-dialog'
import PictorialMark from '@/app/ui/svgs/PictorialMark'
import { ThemeToggle } from '@/app/ui/theme-toggle'
import { cn } from '@/app/utils'
import { User } from '@workos-inc/node'
import {
  BookText,
  Check,
  ChevronsUpDown,
  LayoutGrid,
  LogOut,
  MenuIcon,
  MonitorCheck,
  Moon,
  Plus,
  Sun,
  UserRoundCog,
  Zap,
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
}: {
  authorizationUrl: string
  isApp: boolean
  user: User | undefined
  userProjects: ProjectType[]
}) {
  const router = useRouter()
  const pathname = usePathname()
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
  const [projectsComboboxValue, setProjectsComboboxValue] = useState<string>(
    pathname.split('/')[1]
  )

  const projectsList = userProjects?.map((project) => ({
    value: project.pathname,
    label: project.name,
  }))

  useEffect(() => {
    setProjectsComboboxValue(pathname.split('/')[1])
  }, [pathname])

  return (
    <header
      className={`${
        isScrolled
          ? 'border-gray-500/10 dark:border-zinc-800'
          : 'border-transparent'
      } ${
        isApp
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
      {isApp ? (
        <>
          {/* Desktop App */}
          <div className="hidden h-full w-full flex-col items-start justify-between lg:flex">
            <div className="flex w-full flex-col items-start justify-start gap-4">
              <div className="mt-6 flex w-full flex-col items-start justify-start gap-2">
                <Button variant="ghost" asChild>
                  <Link
                    href={`/${pathname.split('/')[1]}`}
                    className={`${
                      pathname == `/${pathname.split('/')[1]}`
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
                    href={`/${pathname.split('/')[1]}/generator`}
                    className={`${
                      pathname == `/${pathname.split('/')[1]}/generator`
                        ? 'bg-foreground text-background hover:bg-foreground/90 hover:text-background dark:bg-background dark:text-foreground dark:hover:bg-background/90 dark:hover:text-foreground'
                        : 'text-foreground hover:bg-accent'
                    } flex w-full !justify-start gap-2`}
                  >
                    <Zap className="h-4 w-4" />
                    Image Templates
                  </Link>
                </Button>
              </div>

              <Separator />

              <div className="flex w-full flex-col items-start justify-start gap-2">
                <Button variant="ghost" asChild>
                  <Link
                    href="/card-validator"
                    className="flex w-full !justify-start gap-2 text-foreground hover:bg-accent"
                    target="_blank"
                  >
                    <MonitorCheck className="h-4 w-4" />
                    Card Validator
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
              <div className="flex flex-col gap-2">
                <Button variant="outline" asChild>
                  <Link
                    href="/blog"
                    className="flex w-full !justify-start gap-2 text-foreground hover:bg-accent"
                    target="_blank"
                  >
                    <BookText className="h-4 w-4" />
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
                          <DropdownMenuSubTrigger className="flex items-center justify-start gap-2">
                            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span>
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
                          onClick={() => redirectAction('/account-settings')}
                        >
                          <UserRoundCog className="mr-2 h-4 w-4" />
                          <span>Account settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
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
                          ? projectsList.find(
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
                          {projectsList.map((project) => (
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
                                  // replace pathname.split('/')[1] with new value but keep the rest of the path
                                  router.push(
                                    pathname.replace(
                                      pathname.split('/')[1],
                                      newValue
                                    )
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
                          <CommandItem>
                            <NewProjectDialog
                              userId={user.id}
                              trigger={
                                <div className="flex w-full items-center justify-center gap-2">
                                  <Plus className="h-4 w-4" />
                                  New project
                                </div>
                              }
                            />
                          </CommandItem>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
              {/* <Separator />
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
              </div> */}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Desktop Landing */}
          <div className="mx-auto w-full max-w-7xl">
            <div className="hidden w-full items-center justify-between p-4 lg:flex">
              <Link href="/" className="flex items-center justify-center gap-2">
                <Image
                  src="/logo.svg"
                  alt="SharePreviews"
                  width={40}
                  height={40}
                />
              </Link>

              <NavigationMenu>
                <NavigationMenuList>
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
              {user ? (
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
                    className="w-52  p-2"
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
                <div className="flex items-center justify-end gap-4">
                  <ThemeToggle ghost />
                  <Button asChild>
                    <Link href={authorizationUrl}>Get Started</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  )
}
