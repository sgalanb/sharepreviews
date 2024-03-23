'use client'

import { ProjectType, TemplateType } from '@/app/db/schema'
import { Badge } from '@/app/ui/components/Badge'
import { Button } from '@/app/ui/components/Button'
import { Card, CardContent, CardHeader } from '@/app/ui/components/Card'
import { Progress } from '@/app/ui/components/Progress'
import UpgradeToProDialog from '@/app/ui/dialogs/upgrade-to-pro-dialog'
import { fetcher } from '@/app/utils'
import { User } from '@workos-inc/node'
import useSWR from 'swr'

export default function OverviewDashboard({
  user,
  project,
}: {
  user: User
  project: ProjectType
}) {
  const {
    data: projectTemplates,
    isLoading: isLoadingTemplates,
  }: {
    data: TemplateType[]
    isLoading: boolean
  } = useSWR<any>(`/api/templates?projectId=${project?.id}`, fetcher)

  return (
    <div className="flex h-full w-full max-w-7xl flex-col items-center justify-start gap-8 p-4 lg:p-12">
      <div className="flex w-full items-start justify-between gap-4 md:h-16">
        <div className="flex h-10 items-center justify-start gap-4">
          <span className="title">{project?.name}</span>
          <Badge variant="secondary" className="h-fit font-normal">
            {`${project?.plan?.charAt(0).toUpperCase()}${project?.plan?.slice(1)}`}
          </Badge>
        </div>

        <UpgradeToProDialog
          trigger={<Button className="flex gap-2">Upgrade to Pro</Button>}
          project={project}
          user={user}
        />
      </div>
      <div className="grid h-fit w-full grid-cols-2 flex-col gap-4 xl:grid-cols-3">
        <Card className="h-fit">
          <CardHeader className="pb-4 text-muted-foreground">
            Generated images
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {isLoadingTemplates ? (
              <div className="h-14 animate-pulse rounded-md bg-accent duration-1000" />
            ) : (
              <>
                <div className="second-title flex items-end justify-between">
                  <div className="flex items-center justify-start gap-2">
                    <span>{projectTemplates?.length}</span>
                    <span className="text-neutral-400 dark:text-neutral-500">
                      /
                    </span>
                    <span className="text-neutral-400 dark:text-neutral-500">
                      1000
                    </span>
                  </div>
                  <span className="text-sm font-normal text-neutral-400 dark:text-neutral-500">
                    18,6%
                  </span>
                </div>
                <Progress value={projectTemplates?.length} />
              </>
            )}
          </CardContent>
        </Card>
        <Card className="h-fit">
          <CardHeader className="pb-4 text-muted-foreground">
            Templates
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {isLoadingTemplates ? (
              <div className="h-14 animate-pulse rounded-md bg-accent duration-1000" />
            ) : (
              <div className="marketing-second-title flex h-14 items-center justify-start gap-2">
                <span>{projectTemplates?.length}</span>
                <span className="text-neutral-400 dark:text-neutral-500">
                  /
                </span>
                <span className="text-neutral-400 dark:text-neutral-500">
                  2
                </span>
              </div>
            )}
          </CardContent>
        </Card>
        {isLoadingTemplates ? (
          <Card className="col-span-2 h-[24rem]">
            <CardHeader className="flex flex-row items-center justify-between pb-4 text-muted-foreground">
              <span>Images by template</span>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {Array(8)
                .fill(0)
                .map((index) => (
                  <div
                    key={index}
                    className="h-8 w-full animate-pulse rounded-sm bg-accent duration-1000"
                  />
                ))}
            </CardContent>
          </Card>
        ) : (
          <>
            {projectTemplates?.length > 0 ? (
              <Card className="col-span-2 h-[24rem]">
                <CardHeader className="flex flex-row items-center justify-between pb-4 text-muted-foreground">
                  <span>Images by template</span>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  {isLoadingTemplates ? (
                    <>
                      {Array(8)
                        .fill(0)
                        .map((index) => (
                          <div
                            key={index}
                            className="h-8 w-full animate-pulse rounded-sm bg-accent duration-1000"
                          />
                        ))}
                    </>
                  ) : (
                    <>
                      {projectTemplates?.map((template) => (
                        <div
                          key={template.id}
                          className="flex w-full items-center justify-between gap-2 rounded-sm bg-accent px-2 py-1.5"
                        >
                          <span>{template.name}</span>
                          <span>249</span>
                        </div>
                      ))}
                    </>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="col-span-2 flex h-[23.25rem] items-center justify-center">
                <span className="text-muted-foreground">
                  No templates found.
                </span>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  )
}
