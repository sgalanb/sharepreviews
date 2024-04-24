'use client'

import { suscribeToProAction } from '@/app/actions/lemonActions'
import { ProjectType } from '@/app/db/schema'
import { Button } from '@/app/ui/components/Button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/app/ui/components/Command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/ui/components/Popover'
import Spinner from '@/app/ui/components/Spinner'
import { User } from '@workos-inc/node'
import { useState } from 'react'

export default function UpgradeProjectComboBox({
  user,
  userProjects,
}: {
  user: User
  userProjects: ProjectType[]
}) {
  // Project Selector
  const [openProjectsCombobox, setOpenProjectsCombobox] =
    useState<boolean>(false)

  const projectsList = userProjects?.map((project) => ({
    value: project.id,
    label: project.name,
  }))

  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <Popover open={openProjectsCombobox} onOpenChange={setOpenProjectsCombobox}>
      <PopoverTrigger asChild>
        <Button
          className="w-full"
          role="combobox"
          aria-expanded={openProjectsCombobox}
        >
          {isLoading ? (
            <Spinner className="h-6 w-6 fill-primary-foreground text-primary-foreground/25" />
          ) : (
            'Upgrade now'
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[222px] p-0" align="center" sideOffset={8}>
        <Command>
          <CommandInput placeholder="Select project to upgrade" />
          <CommandEmpty>No project found.</CommandEmpty>
          <CommandGroup>
            {projectsList?.map((project) => (
              <CommandItem
                key={project.value}
                value={project.value}
                onSelect={(newValue) => {
                  suscribeToProAction({
                    projectId: newValue,
                    projectName: project.label,
                    userId: user.id,
                    email: user.email,
                    name: `${user.firstName} ${user.lastName}`,
                  })
                  setIsLoading(true)
                  setOpenProjectsCombobox(false)
                }}
                className="cursor-pointer pl-8"
              >
                {project.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
