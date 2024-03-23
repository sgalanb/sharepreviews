'use client'

import { duplicateTemplateAction } from '@/app/actions/actions'
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
import { useState } from 'react'

export default function AddTemplateToProjectButton({
  userProjects,
  templateId,
}: {
  userProjects: ProjectType[]
  templateId: string
}) {
  // Project Selector
  const [openProjectsCombobox, setOpenProjectsCombobox] =
    useState<boolean>(false)

  const projectsList = userProjects?.map((project) => ({
    value: project.pathname,
    label: project.name,
  }))

  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <Popover open={openProjectsCombobox} onOpenChange={setOpenProjectsCombobox}>
      <PopoverTrigger asChild>
        <Button role="combobox" aria-expanded={openProjectsCombobox}>
          {isLoading ? (
            <Spinner className="h-6 w-6 fill-primary-foreground text-primary-foreground/25" />
          ) : (
            'Use template'
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="center" sideOffset={8}>
        <Command>
          <CommandInput placeholder="Select project..." />
          <CommandEmpty>No project found.</CommandEmpty>
          <CommandGroup>
            {projectsList?.map((project) => (
              <CommandItem
                key={project.value}
                value={project.value}
                onSelect={(newValue) => {
                  duplicateTemplateAction({
                    templateToDuplicateId: templateId,
                    targetProjectId: userProjects.find(
                      (project) => project.pathname === newValue
                    )?.id as string,
                    targetProjectPathname: newValue,
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
