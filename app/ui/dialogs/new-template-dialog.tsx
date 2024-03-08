'use client'

import { createTemplateAction } from '@/app/actions'
import { ProjectType } from '@/app/db/schema'
import { Button } from '@/app/ui/components/Button'
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
import { usePathname } from 'next/navigation'
import { useRef } from 'react'

export default function NewTemplateDialog({
  trigger,
  userId,
  userProjects,
}: {
  trigger: React.ReactNode
  userId: string
  userProjects: ProjectType[]
}) {
  const pathname = usePathname()
  const inputRef = useRef<HTMLInputElement>(null)

  const selectedProject = userProjects.find(
    (project) => project.pathname === pathname.split('/')[1]
  )

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form
          action={(formData: FormData) => {
            if (formData.get('name')) {
              createTemplateAction({
                name: formData.get('name') as string,
                projectId: selectedProject?.id as string,
                projectPathname: selectedProject?.pathname as string,
                layersData: '[]',
              })
            } else {
              inputRef?.current?.focus()
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>New template</DialogTitle>
            <DialogDescription>Create a new image template.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                containerClassName="col-span-5"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
