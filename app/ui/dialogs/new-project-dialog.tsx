'use client'

import { createProjectAction } from '@/app/actions/actions'
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
import { useRef, useState } from 'react'
import { useFormStatus } from 'react-dom'

export default function NewProjectDialog({
  trigger,
  userId,
  reservedNames,
}: {
  trigger: React.ReactNode
  userId: string
  reservedNames: string[]
}) {
  const [isOpen, setOpen] = useState<boolean>(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const closeDialog = () => {
    setOpen(false)
  }

  const [error, setError] = useState<boolean>(false)

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form
          action={(formData: FormData) => {
            const name = formData.get('name') as string

            if (name) {
              if (reservedNames.includes(name)) {
                setError(true)
                inputRef?.current?.focus()
                return
              }

              createProjectAction({
                name,
                userId,
              }).then(() => {
                closeDialog()
              })
            } else {
              inputRef?.current?.focus()
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>New project</DialogTitle>
            <DialogDescription>Create a new project.</DialogDescription>
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
                data-1p-ignore
              />
            </div>
          </div>
          <DialogFooter>
            {error && (
              <span className="text-sm text-red-500">
                This project name is reserved. Please choose another name.
              </span>
            )}
            <DialogClose>
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
