'use client'

import { createProjectAction } from '@/app/actions/actions'
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
import Spinner from '@/app/ui/components/Spinner'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useFormStatus } from 'react-dom'

export default function CreateFirstProjectDialog({
  trigger,
  userId,
  reservedNames,
}: {
  trigger: React.ReactNode
  userId: string
  reservedNames: string[]
}) {
  const router = useRouter()
  const [isOpen, setOpen] = useState<boolean>(false)

  useEffect(() => {
    setOpen(true)
  }, [])

  const inputRef = useRef<HTMLInputElement>(null)

  const [error, setError] = useState<boolean>(false)

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form
          action={async (formData: FormData) => {
            const name = formData.get('name') as string

            if (name) {
              if (reservedNames.includes(name)) {
                setError(true)
                inputRef?.current?.focus()
                return
              }
              await createProjectAction({
                name,
                userId,
              })
            } else {
              inputRef?.current?.focus()
            }
          }}
          autoComplete="off"
        >
          <DialogHeader>
            <DialogTitle>Create a new project</DialogTitle>
            <DialogDescription>
              Create a project to store image templates for your website, app,
              or business.
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
                data-1p-ignore
                onChange={() => setError(false)}
              />
            </div>
          </div>
          <DialogFooter>
            {error && (
              <span className="text-sm text-red-500">
                This project name is reserved. Please choose another name.
              </span>
            )}
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
