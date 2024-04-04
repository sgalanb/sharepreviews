'use client'

import {
  FREE_IMAGES,
  FREE_TEMPLATES,
  PRO_IMAGES_PACKAGE,
} from '@/app/constants'
import { ProjectType, TemplateType } from '@/app/db/schema'
import { Badge } from '@/app/ui/components/Badge'
import { Button } from '@/app/ui/components/Button'
import { Card, CardContent, CardHeader } from '@/app/ui/components/Card'
import { Progress } from '@/app/ui/components/Progress'
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
import UpgradeToProDialog from '@/app/ui/dialogs/upgrade-to-pro-dialog'
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

  console.log(projectTemplates)

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
        <div className="flex w-full items-start justify-between gap-4 md:h-16">
          <div className="flex h-10 items-center justify-start gap-4">
            <span className="title leading-none">{project?.name}</span>
            <Badge
              variant={project.plan === 'free' ? 'secondary' : 'default'}
              className="h-fit font-normal"
            >
              {`${project?.plan?.charAt(0).toUpperCase()}${project?.plan?.slice(1)}`}
            </Badge>
          </div>

          {project?.plan === 'free' && (
            <UpgradeToProDialog
              trigger={<Button className="flex gap-2">Upgrade to Pro</Button>}
              project={project}
              user={user}
            />
          )}
        </div>
        {project?.plan === 'free' ? (
          // FREE
          <div className="grid h-fit w-full grid-cols-2 flex-col gap-4 lg:grid-cols-3">
            {/* Generated Images */}
            <Card className="col-span-2 h-fit">
              <CardHeader className="border-b pb-4">
                <div className="flex items-center justify-start gap-2">
                  <span className="subtitle font-medium">Generated Images</span>
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
                        Since this project doesn&apos;t have a subscription,
                        generated images will count towards the user level limit
                        of {FREE_IMAGES} images.
                      </span>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 pt-4">
                {isLoadingTemplates ? (
                  <div className="h-14 animate-pulse rounded-md bg-accent duration-1000" />
                ) : (
                  <>
                    <div className="flex items-end justify-between">
                      <div className="flex items-center justify-start gap-2">
                        <span className="second-title">{userUsage}</span>
                        <span className="second-title text-neutral-400 dark:text-neutral-500">
                          /
                        </span>
                        <span className="second-title text-neutral-400 dark:text-neutral-500">
                          {FREE_IMAGES}
                        </span>
                      </div>
                      <span className="font-medium text-neutral-400 dark:text-neutral-500">
                        {((userUsage / FREE_IMAGES) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={projectTemplates?.length} />
                  </>
                )}
              </CardContent>
            </Card>
            {/* Created Templates */}
            <Card className="col-span-2 h-fit lg:col-span-1">
              <CardHeader className="border-b pb-4">
                <div className="flex items-center justify-start gap-2">
                  <span className="subtitle font-medium">
                    Created Templates
                  </span>
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
                        Since this project doesn&apos;t have a subscription,
                        created templates will count towards the user level
                        limit of {FREE_TEMPLATES} templates.
                      </span>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 pt-4">
                {isLoadingTemplates ? (
                  <div className="h-14 animate-pulse rounded-md bg-accent duration-1000" />
                ) : (
                  <div className="marketing-second-title flex h-14 items-center justify-start gap-2">
                    <span>{projectTemplates?.length}</span>
                    <span className="text-neutral-400 dark:text-neutral-500">
                      /
                    </span>
                    <span className="text-neutral-400 dark:text-neutral-500">
                      {FREE_TEMPLATES}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
            {/* Latest Images*/}
            <Card className="col-span-2 h-[23.5rem]">
              <CardHeader className="h-[4.5rem] border-b pb-4">
                <div className="flex items-center justify-between">
                  <span className="subtitle font-medium">Latest Images</span>

                  <Select
                    value={lastestImagesSelectedTemplate}
                    onValueChange={(value) =>
                      setLastestImagesSelectedTemplate(value)
                    }
                  >
                    <SelectTrigger className="w-fit gap-2">
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
                </div>
              </CardHeader>
              <CardContent className="flex h-[19rem] flex-col gap-2 pr-0 pt-4">
                {isLoadingTemplates ? (
                  <div className="h-full animate-pulse rounded-md bg-accent pr-4 duration-1000" />
                ) : (
                  <div className="grid h-fit grid-cols-3 gap-4 overflow-auto pr-4">
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
                          className="rounded-md border"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`/og/${new URLSearchParams(url).get('templateId')}?${url}`}
                            className="aspect-[1.91/1] w-full rounded-sm object-cover"
                            alt=""
                          />
                        </Link>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
            {/* Images by Template */}
            <Card className="col-span-2 h-[23.5rem] lg:col-span-1">
              <CardHeader className="h-[4.5rem] items-start justify-center border-b pb-4">
                <span className="subtitle font-medium">Images by Template</span>
              </CardHeader>
              <CardContent className="h-[19rem] pr-0 pt-4">
                {isLoadingTemplates ? (
                  <div className="flex flex-col gap-2 pr-4" key="loading">
                    {Array(7)
                      .fill(0)
                      .map((index) => (
                        <div
                          key={index}
                          className="h-8 w-full animate-pulse rounded-sm bg-accent duration-1000"
                        />
                      ))}
                  </div>
                ) : (
                  <div
                    className="flex h-full flex-col gap-2 overflow-auto pr-4"
                    key="loaded"
                  >
                    {projectTemplates
                      .sort((a, b) => b.urls.length - a.urls.length)
                      .map((template) => (
                        <div
                          key={template.id}
                          className="flex w-full items-center justify-between gap-2 rounded-sm bg-muted px-2 py-1.5"
                        >
                          <span className="text-neutral-600 dark:text-neutral-300">
                            {template.name}
                          </span>
                          <span className="font-medium">
                            {template.urls.length}
                          </span>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          project?.plan === 'pro' && (
            // PRO
            <div className="grid h-fit w-full grid-cols-2 flex-col gap-4 lg:grid-cols-3">
              {/* Generated Images */}
              <Card className="col-span-2 h-fit">
                <CardHeader className="border-b pb-4">
                  <div className="flex items-center justify-start gap-2">
                    <span className="subtitle font-medium">
                      Generated Images
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 pt-4">
                  {isLoadingTemplates ? (
                    <div className="h-14 animate-pulse rounded-md bg-accent duration-1000" />
                  ) : (
                    <>
                      <div className="flex items-end justify-between">
                        <div className="flex items-center justify-start gap-2">
                          <span className="second-title">{projectUsage}</span>
                          <span className="second-title text-neutral-400 dark:text-neutral-500">
                            /
                          </span>
                          <span className="second-title text-neutral-400 dark:text-neutral-500">
                            {PRO_IMAGES_PACKAGE}
                          </span>
                        </div>
                        <span className="font-medium text-neutral-400 dark:text-neutral-500">
                          {((projectUsage / PRO_IMAGES_PACKAGE) * 100).toFixed(
                            1
                          )}
                          %
                        </span>
                      </div>
                      <Progress value={projectTemplates?.length} />
                    </>
                  )}
                </CardContent>
              </Card>
              {/* Created Templates */}
              <Card className="col-span-2 h-fit lg:col-span-1">
                <CardHeader className="border-b pb-4">
                  <div className="flex items-center justify-start gap-2">
                    <span className="subtitle font-medium">
                      Created Templates
                    </span>
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
                          Since this project doesn&apos;t have a subscription,
                          created templates will count towards the user level
                          limit of {FREE_TEMPLATES} templates.
                        </span>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-2 pt-4">
                  {isLoadingTemplates ? (
                    <div className="h-14 animate-pulse rounded-md bg-accent duration-1000" />
                  ) : (
                    <div className="marketing-second-title flex h-14 items-center justify-start gap-2">
                      <span>{projectTemplates?.length}</span>
                      <span className="text-neutral-400 dark:text-neutral-500">
                        /
                      </span>
                      <span className="text-neutral-400 dark:text-neutral-500">
                        {FREE_TEMPLATES}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
              {/* Latest Images*/}
              <Card className="col-span-2 h-[23.5rem]">
                <CardHeader className="h-[4.5rem] border-b pb-4">
                  <div className="flex items-center justify-between">
                    <span className="subtitle font-medium">Latest Images</span>

                    <Select
                      value={lastestImagesSelectedTemplate}
                      onValueChange={(value) =>
                        setLastestImagesSelectedTemplate(value)
                      }
                    >
                      <SelectTrigger className="w-fit gap-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent align="end">
                        <SelectGroup>
                          {projectTemplates?.map((template) => (
                            <>
                              {template.id && (
                                <SelectItem
                                  value={template.id}
                                  key={template.id}
                                >
                                  {template.name}
                                </SelectItem>
                              )}
                            </>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="flex h-[19rem] flex-col gap-2 pr-0 pt-4">
                  {isLoadingTemplates ? (
                    <div className="h-full animate-pulse rounded-md bg-accent pr-4 duration-1000" />
                  ) : (
                    <div className="grid h-fit grid-cols-3 gap-4 overflow-auto pr-4">
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
                            className="rounded-md border"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={`/og/${new URLSearchParams(url).get('templateId')}?${url}`}
                              className="aspect-[1.91/1] w-full rounded-sm object-cover"
                              alt=""
                            />
                          </Link>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>
              {/* Images by Template */}
              <Card className="col-span-2 h-[23.5rem] lg:col-span-1">
                <CardHeader className="h-[4.5rem] items-start justify-center border-b pb-4">
                  <span className="subtitle font-medium">
                    Images by Template
                  </span>
                </CardHeader>
                <CardContent className="h-[19rem] pr-0 pt-4">
                  {isLoadingTemplates ? (
                    <div className="flex flex-col gap-2 pr-4" key="loading">
                      {Array(7)
                        .fill(0)
                        .map((index) => (
                          <div
                            key={index}
                            className="h-8 w-full animate-pulse rounded-sm bg-accent duration-1000"
                          />
                        ))}
                    </div>
                  ) : (
                    <div
                      className="flex h-full flex-col gap-2 overflow-auto pr-4"
                      key="loaded"
                    >
                      {projectTemplates
                        .sort((a, b) => b.urls.length - a.urls.length)
                        .map((template) => (
                          <div
                            key={template.id}
                            className="flex w-full items-center justify-between gap-2 rounded-sm bg-muted px-2 py-1.5"
                          >
                            <span className="text-neutral-600 dark:text-neutral-300">
                              {template.name}
                            </span>
                            <span className="font-medium">
                              {template.urls.length}
                            </span>
                          </div>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )
        )}
      </div>
    </TooltipProvider>
  )
}
