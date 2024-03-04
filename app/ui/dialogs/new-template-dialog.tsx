'use client'

import { ProjectType } from '@/app/db/schema'
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/ui/components/Dialog'
import { Input } from '@/app/ui/components/Input'
import { Label } from '@/app/ui/components/Label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/ui/components/Popover'
import { cn } from '@/app/utils'
import { Check, ChevronsUpDown, Plus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function NewTemplateDialog({
  trigger,
  userProjects,
}: {
  trigger: React.ReactNode
  userProjects: ProjectType[]
}) {
  const pathname = usePathname()

  const [openProjectsCombobox, setOpenProjectsCombobox] =
    useState<boolean>(false)
  const [projectsComboboxValue, setProjectsComboboxValue] = useState<string>(
    pathname.split('/')[1]
  )

  const projectsList = userProjects?.map((project) => ({
    value: project.pathname,
    label: project.name,
  }))

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New template</DialogTitle>
          <DialogDescription>
            Create a new template to use in your projects.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4">
          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" type="text" containerClassName="col-span-5" />
          </div>
          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Project
            </Label>
            <Popover
              open={openProjectsCombobox}
              onOpenChange={setOpenProjectsCombobox}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openProjectsCombobox}
                  className="col-span-5 justify-between"
                >
                  {projectsComboboxValue
                    ? projectsList.find(
                        (project) => project.value === projectsComboboxValue
                      )?.label
                    : 'Select project...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[19.375rem] p-0">
                <Command>
                  <CommandInput placeholder="Search project..." />
                  <CommandEmpty>No project found.</CommandEmpty>
                  <CommandGroup>
                    {projectsList.map((project) => (
                      <CommandItem
                        key={project.value}
                        value={project.value}
                        onSelect={(currentValue) => {
                          setProjectsComboboxValue(
                            currentValue === projectsComboboxValue
                              ? ''
                              : currentValue
                          )
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
                    <CommandSeparator />
                    <CommandItem className="flex items-center justify-center">
                      <Plus className="mr-2 h-4 w-4" />
                      New project
                    </CommandItem>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </form>
        <DialogFooter>
          <Button asChild>
            <Link href={`/generator/${''}}`}>Create</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
