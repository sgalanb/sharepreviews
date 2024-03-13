'use client'

import { createTemplateAction } from '@/app/actions'
import { ProjectType } from '@/app/db/schema'
import { Button } from '@/app/ui/components/Button'
import { Card } from '@/app/ui/components/Card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/ui/components/Dialog'
import Spinner from '@/app/ui/components/Spinner'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'
import { useFormStatus } from 'react-dom'

export default function UpgradeToProDialog({
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
          className="flex flex-col gap-4"
        >
          <DialogHeader className="gap-2">
            <DialogTitle className="w-full text-center">
              Upgrade to Pro
            </DialogTitle>
            <DialogDescription className="w-full text-balance text-center">
              Consider upgrading to Pro to enjoy higher limits and extra
              features.
            </DialogDescription>
          </DialogHeader>
          <Card className="p-4"></Card>
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
