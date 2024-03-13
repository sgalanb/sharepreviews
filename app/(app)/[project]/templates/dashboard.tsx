'use client'

import { deleteTemplateAction } from '@/app/actions'
import { ProjectType, TemplateType } from '@/app/db/schema'
import { Button } from '@/app/ui/components/Button'
import { Card } from '@/app/ui/components/Card'
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/ui/components/DropdownMenu'
import { Input } from '@/app/ui/components/Input'
import { Label } from '@/app/ui/components/Label'
import Spinner from '@/app/ui/components/Spinner'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/ui/components/Tooltip'
import NewTemplateDialog from '@/app/ui/dialogs/new-template-dialog'
import {
  fetcher,
  getUrlWithConditionalVariablesTrue,
  getUrlWithVariables,
} from '@/app/utils'
import { User } from '@workos-inc/node'
import { motion } from 'framer-motion'
import { Check, Copy, Edit, MoreHorizontal, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import useSWR, { mutate } from 'swr'

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
    isLoading: isLoadingTemplates,
  }: {
    data: TemplateType[]
    isLoading: boolean
  } = useSWR<any>(`/api/templates?projectId=${selectedProject?.id}`, fetcher)

  const revalidateTemplates = () => {
    mutate(`/api/templates?projectId=${selectedProject?.id}`)
  }

  // Get URL dialog
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 700) // Reset after 0.7 seconds
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }
  const buttonVariants = {
    initial: { scale: 1 },
    animate: { scale: 1.2, transition: { duration: 0.2 } },
    exit: { scale: 1, transition: { duration: 0.2 } },
  }

  return (
    <div className="flex h-full w-full max-w-7xl flex-col items-center justify-start gap-8 p-4 lg:p-12">
      <div className="flex w-full items-start justify-between gap-4 md:h-16">
        <div className="flex flex-col justify-between gap-1">
          <span className="title leading-10">Templates</span>
          <p className="text-muted-foreground">
            Templates can generate different images based the variables you
            provide. {` `}
            <Button variant="link" asChild>
              <Link
                href="/inspiration"
                target="_blank"
                className="hidden h-fit !p-0 xl:inline"
              >
                See starter templates.
              </Link>
            </Button>
          </p>
        </div>
        <NewTemplateDialog
          trigger={
            <Button className="hidden gap-2 md:flex">
              <Plus className="h-4 w-4" />
              New template
            </Button>
          }
          userId={user?.id!}
          userProjects={userProjects}
        />
      </div>
      <div className="grid h-fit w-full grid-cols-1 flex-col gap-4 md:grid-cols-2 xl:grid-cols-3">
        {isLoadingTemplates ? (
          // Skeleton
          <>
            {Array(6)
              .fill(0)
              .map((index) => (
                <Card
                  key={index}
                  className="flex h-fit w-full animate-pulse flex-col gap-4 bg-accent p-4 duration-700"
                >
                  <div className="aspect-[1.91/1] h-fit w-full rounded-md border" />
                  <div className="flex h-10 w-full items-center justify-between gap-4">
                    <div className="h-5 w-32 rounded-full border" />
                  </div>
                </Card>
              ))}
          </>
        ) : (
          <>
            {projectTemplates?.length > 0 ? (
              <>
                {projectTemplates?.map((template) => (
                  <>
                    <Card
                      key={template.id}
                      className="flex h-fit w-full flex-col items-center justify-center gap-4 p-4"
                    >
                      <div className="h-fit w-full">
                        {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
                        <img
                          src={getUrlWithConditionalVariablesTrue(template)}
                          className="aspect-[1.91/1] w-full rounded-md border"
                        />
                      </div>
                      <div className="flex h-10 w-full items-center justify-between gap-4">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="line-clamp-1 w-full text-ellipsis font-medium">
                                {template.name}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="w-fit" align="start">
                              <span>{template.name}</span>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <div className="flex h-full w-full items-end justify-end gap-2">
                          <Dialog>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="aspect-square w-10 p-0 "
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                className="w-fit p-2"
                                align="center"
                                sideOffset={8}
                              >
                                <DropdownMenuGroup>
                                  <DropdownMenuItem
                                    className="hidden cursor-pointer md:flex"
                                    asChild
                                  >
                                    <Link
                                      href={`
                                        /${selectedProject?.pathname}/templates/${template.id}/edit
                                        `}
                                      className="flex items-center justify-start gap-2"
                                    >
                                      <Edit className="h-4 w-4" />
                                      Edit
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="cursor-pointer"
                                    asChild
                                  >
                                    <DialogTrigger className="w-full">
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </DialogTrigger>
                                  </DropdownMenuItem>
                                </DropdownMenuGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <DialogContent className="sm:max-w-md">
                              <form
                                className="flex flex-col gap-4"
                                action={async () =>
                                  await deleteTemplateAction({
                                    id: template?.id!,
                                  }).then(() => {
                                    revalidateTemplates()
                                  })
                                }
                              >
                                <DialogHeader>
                                  <DialogTitle>Delete template</DialogTitle>
                                  <DialogDescription>
                                    Are you sure you want to delete this
                                    template? All URLs associated with this
                                    template will stop working. <br />
                                    This action cannot be undone.
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    {/* Type button to avoid submitting the form */}
                                    <Button type="button" variant="outline">
                                      Cancel
                                    </Button>
                                  </DialogClose>

                                  <DeleteTemplateButton />
                                </DialogFooter>
                              </form>
                            </DialogContent>
                          </Dialog>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="select-none">Get URL</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-xl">
                              <DialogHeader>
                                <DialogTitle>Template URL</DialogTitle>
                                <DialogDescription>
                                  {`Use this URL to generate images based on this
                                  template.`}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="flex items-center space-x-2">
                                <div className="grid flex-1 gap-2">
                                  <Label htmlFor="link" className="sr-only">
                                    Link
                                  </Label>
                                  <Input
                                    id="link"
                                    defaultValue={getUrlWithVariables(template)}
                                    readOnly
                                  />
                                </div>
                                <motion.div
                                  initial="initial"
                                  animate={isCopied ? 'animate' : 'exit'}
                                  variants={buttonVariants}
                                >
                                  <Button
                                    type="submit"
                                    size="sm"
                                    className="px-3"
                                    onClick={() =>
                                      copyToClipboard(
                                        getUrlWithVariables(template)
                                      )
                                    }
                                  >
                                    <span className="sr-only">Copy</span>
                                    {isCopied ? (
                                      <Check className="h-4 w-4" />
                                    ) : (
                                      <Copy className="h-4 w-4" />
                                    )}
                                  </Button>
                                </motion.div>
                              </div>
                              <DialogDescription>{`Replace {VALUE} with the value you want to use. Remember that visibility variables only accept "true" or "false" as values.`}</DialogDescription>
                              <DialogFooter className="">
                                <DialogClose asChild>
                                  <Button variant="outline">Close</Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </Card>
                  </>
                ))}
              </>
            ) : (
              <Card className="flex h-80 max-h-64 w-full flex-col items-center justify-center gap-4">
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

function DeleteTemplateButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className="min-w-20">
      {pending ? (
        <Spinner className="h-6 w-6 fill-primary-foreground text-primary-foreground/25" />
      ) : (
        'Delete'
      )}
    </Button>
  )
}
