'use client'

import { ProjectType, TemplateType } from '@/app/db/schema'
import { Card, CardContent, CardHeader } from '@/app/ui/components/Card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/ui/components/Select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/ui/components/Tooltip'
import { fetcher } from '@/app/utils'
import { User } from '@workos-inc/node'
import { Info } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

type TemplateTypePlusURLs = TemplateType & { urls: string[] }

export default function OverviewDashboard({
  user,
  project,
  userUsage,
  projectUsage,
}: {
  user: User
  userUsage: number
  project: ProjectType
  projectUsage: number
}) {
  const {
    data: projectTemplates,
    isLoading: isLoadingTemplates,
  }: {
    data: TemplateTypePlusURLs[]
    isLoading: boolean
  } = useSWR<any>(`/api/templates?projectId=${project?.id}`, fetcher)

  const [lastestImagesSelectedTemplate, setLastestImagesSelectedTemplate] =
    useState<string>('')

  useEffect(() => {
    if (projectTemplates?.length > 0 && projectTemplates[0].id) {
      setLastestImagesSelectedTemplate(projectTemplates[0].id)
    }
  }, [projectTemplates])

  return (
    <TooltipProvider>
      <div className="flex h-full w-full max-w-7xl flex-col items-center justify-start gap-8 p-4 lg:p-12">
        <div className="flex w-full flex-col items-start justify-between gap-4 md:h-16 lg:flex-row">
          <div className="flex h-10 items-center justify-start gap-4">
            <span className="title line-clamp-1 leading-10">
              {project?.name}
            </span>
          </div>
        </div>
        <div className="grid h-fit w-full grid-cols-2 flex-col gap-4 lg:grid-cols-3">
          {/* Latest Images*/}
          <Card className="col-span-2 h-[23.5rem]">
            <CardHeader className="h-[4.5rem] border-b pb-4">
              <div className="flex h-10 items-center justify-between">
                <span className="subtitle font-medium">Latest Images</span>

                {projectTemplates?.length > 0 && (
                  <Select
                    value={lastestImagesSelectedTemplate}
                    onValueChange={(value) =>
                      setLastestImagesSelectedTemplate(value)
                    }
                  >
                    <SelectTrigger className="w-fit cursor-default gap-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent align="end">
                      <SelectGroup>
                        {projectTemplates?.map((template) => (
                          <>
                            {template.id && (
                              <SelectItem value={template.id} key={template.id}>
                                {template.name}
                              </SelectItem>
                            )}
                          </>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex h-[19rem] flex-col gap-2 pr-0 pt-4">
              {isLoadingTemplates ? (
                <div className="h-full animate-pulse rounded-md bg-accent pr-4 duration-1000" />
              ) : (
                <>
                  {projectTemplates?.length > 0 ? (
                    <div className="grid h-fit grid-cols-1 gap-4 overflow-auto p-0.5 pr-[1.125rem] sm:grid-cols-2 lg:grid-cols-3">
                      {projectTemplates
                        ?.find(
                          (template) =>
                            template.id === lastestImagesSelectedTemplate
                        )
                        ?.urls.slice(0, 12)
                        .map((url, index) => (
                          <Link
                            href={`/og/${new URLSearchParams(url).get('templateId')}?${url}`}
                            target="_blank"
                            key={url + index}
                            className="cursor-default rounded-md border ring-primary hover:ring-2 focus:outline-none focus:ring-2 dark:text-neutral-300"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={`/og/${new URLSearchParams(url).get('templateId')}?${url}`}
                              className="aspect-[1.91/1] w-full rounded-md object-cover"
                              alt=""
                            />
                          </Link>
                        ))}
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-neutral-400 dark:text-neutral-500">
                        No images generated.{' '}
                        <Link
                          href={`/${project.pathname}/templates`}
                          className="cursor-default text-primary hover:underline hover:underline-offset-4"
                        >
                          Create a template.
                        </Link>
                      </span>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
          {/* Images by Template */}
          <Card className="col-span-2 h-[23.5rem] lg:col-span-1">
            <CardHeader className="h-[4.5rem] items-start justify-center border-b pb-4">
              <div className="flex items-center justify-start gap-2">
                <span className="subtitle font-medium">Images by Template</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent
                    className="w-64"
                    align="start"
                    alignOffset={-96}
                  >
                    <span className="font-normal">
                      The row total may be less than the total number of
                      generated images if any templates were deleted during the
                      last billing period.
                    </span>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>
            <CardContent className="h-[19rem] pr-0 pt-4">
              {isLoadingTemplates ? (
                <div className="flex flex-col gap-2 pr-4" key="loading">
                  {Array(7)
                    .fill(0)
                    .map((index) => (
                      <div
                        key={index}
                        className="h-8 w-full animate-pulse rounded-md bg-accent duration-1000"
                      />
                    ))}
                </div>
              ) : (
                <>
                  {projectTemplates?.length > 0 ? (
                    <div
                      className="flex h-full flex-col gap-2 overflow-auto p-0.5 pr-[1.125rem]"
                      key="loaded"
                    >
                      {projectTemplates
                        .sort((a, b) => b.urls.length - a.urls.length)
                        .map((template) => (
                          <Link
                            href={`/${project.pathname}/templates`}
                            key={template.id}
                            className="flex w-full cursor-default items-center justify-between gap-2 rounded-md bg-muted px-2 py-1.5 text-neutral-600 ring-primary hover:ring-2 focus:outline-none focus:ring-2 dark:text-neutral-300"
                          >
                            <span className="">{template.name}</span>
                            <span className="font-medium text-foreground">
                              {template.urls.length}
                            </span>
                          </Link>
                        ))}
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-neutral-400 dark:text-neutral-500">
                        No templates created.{' '}
                        <Link
                          href={`/${project.pathname}/templates`}
                          className="cursor-default text-primary hover:underline hover:underline-offset-4"
                        >
                          Create a template.
                        </Link>
                      </span>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}
