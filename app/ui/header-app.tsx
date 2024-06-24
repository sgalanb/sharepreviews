'use client'

import { logout } from '@/app/actions/actions'
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/ui/components/Popover'
import { Separator } from '@/app/ui/components/Separator'
import NewProjectDialog from '@/app/ui/dialogs/new-project-dialog'
import { cn } from '@/app/utils'
import { User } from '@workos-inc/node'
import {
  Check,
  ChevronsUpDown,
  ImageIcon,
  LayoutGrid,
  LayoutTemplate,
  LogOut,
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

export default function HeaderApp({
  isAuthenticated,
  user,
  userProjects,
  reservedNames,
}: {
  isAuthenticated: boolean
  user: User | undefined
  userProjects?: ProjectType[]
  reservedNames?: string[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const projectPathname = pathname.split('/')[1]
  const { theme, setTheme } = useTheme()

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

  return (
    <header
      className="z-50 col-span-1 hidden h-screen w-64 border-none bg-background bg-neutral-50 p-2 transition-colors duration-200 dark:bg-neutral-800 lg:flex lg:bg-noise"
      style={{
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="flex h-full w-full flex-col items-start justify-between">
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
          {isAuthenticated && user && (
            <div className="grid grid-cols-3 gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="col-span-1">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={user.profilePictureUrl ?? ''} alt="" />
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
                        <Moon className="dark:scale-100` absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0" />
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
                          <DropdownMenuItem onClick={() => setTheme('light')}>
                            Light
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setTheme('dark')}>
                            Dark
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setTheme('system')}>
                            System
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem asChild>
                      <Link href="/home" target="_blank">
                        <SquareArrowOutUpRight className="mr-2 h-4 w-4" />
                        <span>Go to homepage</span>
                      </Link>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem
                          onClick={() => redirectAction('/account-settings')}
                        >
                          <UserRoundCog className="mr-2 h-4 w-4" />
                          <span>Account settings</span>
                        </DropdownMenuItem> */}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => logout()}>
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
                    className="col-span-2 w-full justify-between"
                  >
                    <span className="line-clamp-1 w-full text-left">
                      {projectsComboboxValue
                        ? projectsList?.find(
                            (project) => project.value === projectsComboboxValue
                          )?.label
                        : 'Select project...'}
                    </span>
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
                      <CommandItem>
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
    </header>
  )
}
