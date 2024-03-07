import { getUserProjects } from '@/app/db/operations/projects'
import { getUser } from '@/app/lib/workos'
import { Button } from '@/app/ui/components/Button'
import NewTemplateDialog from '@/app/ui/dialogs/new-template-dialog'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default async function GeneratorPage() {
  const { user } = await getUser()
  const userProjects = await getUserProjects(user?.id!)

  const projectTemplates = ['s']

  return (
    <div className="flex h-full w-full max-w-7xl flex-col items-center justify-start gap-4 p-4 lg:p-12">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col justify-between gap-2">
          <span className="title">Templates</span>
          <p className="text-muted-foreground">
            Create image templates that will generate different card images
            based on the inputs you provide. See our{' '}
            {projectTemplates.length > 0 && (
              <Button variant="link" asChild>
                <Link
                  href="/inspiration"
                  target="_blank"
                  className="h-fit !p-0"
                >
                  starter templates.
                </Link>
              </Button>
            )}
          </p>
        </div>
        {projectTemplates.length > 0 && (
          <NewTemplateDialog
            trigger={
              <Button className="flex gap-2">
                <Plus className="h-4 w-4" />
                New template
              </Button>
            }
            userId={user?.id!}
            userProjects={userProjects}
          />
        )}
      </div>
      {projectTemplates.length > 0 ? (
        <div></div>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <NewTemplateDialog
            trigger={<Button variant="outline">New blank template</Button>}
            userId={user?.id!}
            userProjects={userProjects}
          />
          <p>or</p>
          <Button variant="link" asChild>
            <Link href="/inspiration">Browse our starter templates</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
