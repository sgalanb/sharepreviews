'use client'

import { ProjectType, TemplateType } from '@/app/db/schema'
import { Button } from '@/app/ui/components/Button'
import { Card } from '@/app/ui/components/Card'
import NewTemplateDialog from '@/app/ui/dialogs/new-template-dialog'
import { fetcher } from '@/app/utils'
import { User } from '@workos-inc/node'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import useSWR from 'swr'

export default function TemplatesDashboard({
  user,
  userProjects,
}: {
  user: User
  userProjects: ProjectType[]
}) {
  const pathname = usePathname()
  const selectedProject = userProjects.find(
    (project) => project.pathname === pathname.split('/')[1]
  )

  const {
    data: projectTemplates,
    isLoading,
    error,
  }: {
    data: TemplateType[]
    isLoading: boolean
    error: any
  } = useSWR<any>(`/api/templates?projectId=${selectedProject?.id}`, fetcher, {
    revalidateOnFocus: false,
  })

  return (
    <div className="flex h-full w-full max-w-7xl flex-col items-center justify-start gap-8 p-4 lg:p-12">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex flex-col justify-between gap-2">
          <span className="title">Templates</span>
          <p className="text-muted-foreground">
            Create templates that will generate different images with the inputs
            you provide. See{' '}
            <Button variant="link" asChild>
              <Link href="/inspiration" target="_blank" className="h-fit !p-0">
                starter templates
              </Link>
            </Button>
            .
          </p>
        </div>
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
      </div>
      <div className="grid h-full w-full grid-cols-2 gap-4 xl:grid-cols-3">
        {projectTemplates?.length > 0 ? (
          <>
            {projectTemplates?.map((template) => (
              <Card
                key={template.id}
                className="flex h-full max-h-64 w-full flex-col items-center justify-center gap-4 p-4"
              >
                <div className="flex h-full w-full items-end justify-between gap-4">
                  <span className="font-medium leading-10">
                    {template.name}
                  </span>
                  <div className="flex h-full w-full items-end justify-end gap-2">
                    <Button variant="outline">Get URL</Button>
                    <Button asChild>
                      <Link
                        href={`
                      /${selectedProject?.pathname}/templates/${template.id}/edit
                      `}
                      >
                        Edit
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </>
        ) : (
          <Card className="flex h-full max-h-64 w-full flex-col items-center justify-center gap-4">
            <span className="text-muted-foreground">No templates found.</span>
          </Card>
        )}
      </div>
    </div>
  )
}
