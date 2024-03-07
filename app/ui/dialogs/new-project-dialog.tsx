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
import { useRef } from 'react'

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
                formData,
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
            <DialogClose asChild>
              <Button type="submit">Create</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}