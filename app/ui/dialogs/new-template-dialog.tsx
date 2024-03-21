'use client'

import { createTemplateAction } from '@/app/actions/actions'
import { ProjectType } from '@/app/db/schema'
import { Button } from '@/app/ui/components/Button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/ui/components/Dialog'
import { Input } from '@/app/ui/components/Input'
import { Label } from '@/app/ui/components/Label'
import Spinner from '@/app/ui/components/Spinner'
import { useRef } from 'react'
import { useFormStatus } from 'react-dom'

export default function NewTemplateDialog({
  trigger,
  project,
}: {
  trigger: React.ReactNode
  project: ProjectType
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form
          action={(formData: FormData) => {
            if (formData.get('name')) {
              createTemplateAction({
                name: formData.get('name') as string,
                projectId: project?.id as string,
                projectPathname: project?.pathname as string,
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
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
            <CreateButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function CreateButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className="min-w-20">
      {pending ? (
        <Spinner className="h-6 w-6 fill-primary-foreground text-primary-foreground/25" />
      ) : (
        'Create'
      )}
    </Button>
  )
}
