'use client'

import { suscribeToProAction } from '@/app/actions/lemonActions'
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/ui/components/Tooltip'
import { User } from '@workos-inc/node'
import { CircleCheck, Info } from 'lucide-react'
import Link from 'next/link'
import { useFormStatus } from 'react-dom'

export default function UpgradeToProDialog({
  trigger,
  user,
  project,
}: {
  trigger: React.ReactNode
  user: User
  project: ProjectType
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form
          action={() => {
            if (
              project?.id &&
              user?.id &&
              user?.email &&
              user?.firstName &&
              user?.lastName
            ) {
              suscribeToProAction({
                projectId: project.id,
                projectName: project.name,
                userId: user.id,
                email: user.email,
                name: `${user.firstName} ${user.lastName}`,
              })
            }
          }}
          className="flex flex-col gap-4"
        >
          <DialogHeader className="flex items-center justify-center gap-2">
            <DialogTitle className="w-full text-center">
              {`Upgrade ${project?.name} to Pro`}
            </DialogTitle>
            <DialogDescription className="w-96 text-balance text-center">
              Higher limits, extra features and priority support.
            </DialogDescription>
          </DialogHeader>
          <Card className="flex flex-col items-start justify-start gap-4 p-4">
            <span className="text-muted-foreground">sharepreviews Pro</span>
            <span className="title">$24 / mo</span>
            <div className="flex w-full flex-col items-start justify-start gap-2">
              <TooltipProvider>
                <div className="flex items-center justify-start gap-1">
                  <CircleCheck className="h-5 w-5 fill-green-500 stroke-background" />
                  <div className="flex items-center justify-start gap-1">
                    <span className="text-muted-foreground">
                      5,000 new images/mo
                    </span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 stroke-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="w-64 text-center">
                        Once the limit has been reached, you will be charged $24
                        per additional 5,000 images.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                <div className="flex items-center justify-start gap-1">
                  <CircleCheck className="h-5 w-5 fill-green-500 stroke-background" />
                  <span className="text-muted-foreground">
                    Unlimited templates
                  </span>
                </div>

                <div className="flex items-center justify-start gap-1">
                  <CircleCheck className="h-5 w-5 fill-green-500 stroke-background" />
                  <span className="text-muted-foreground">
                    Priority support
                  </span>
                </div>
              </TooltipProvider>
            </div>
            <UpgradeButton />
          </Card>
          <Link
            href="/contact"
            target="_blank"
            className="w-full text-center text-muted-foreground underline-offset-2 hover:underline"
          >
            Need custom solutions? Contact us.
          </Link>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function UpgradeButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className="mt-1 w-full">
      {pending ? (
        <Spinner className="h-6 w-6 fill-primary-foreground text-primary-foreground/25" />
      ) : (
        'Upgrade now'
      )}
    </Button>
  )
}
