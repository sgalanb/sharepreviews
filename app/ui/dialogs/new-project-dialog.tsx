'use client'

import { createProjectAction } from '@/app/actions'
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

export default function NewProjectDialog({
  trigger,
  userId,
}: {
  trigger: React.ReactNode
  userId: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form
          action={(formData: FormData) => {
            if (formData.get('name')) {
              createProjectAction({
                name: formData.get('name') as string,
                userId: userId,
              })
            } else {
              inputRef?.current?.focus()
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>New project</DialogTitle>
            <DialogDescription>
              Create a new template to use in your projects.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                ref={inputRef}
                type="text"
                containerClassName="col-span-5"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose>
              <CreateButton />
            </DialogClose>
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
