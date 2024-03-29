import AddTemplateToProjectButton from '@/app/(marketing)/starter-templates/[templateId]/AddTemplateToProjectButton'
import GetTestUrlButton from '@/app/(marketing)/starter-templates/[templateId]/GetTestUrlButton'
import { getUserProjects } from '@/app/db/operations/projects'
import { getTemplateById } from '@/app/db/operations/templates'
import { getAuthorizationUrl, getUser } from '@/app/lib/workos'
import { Button } from '@/app/ui/components/Button'

import { getUrlWithConditionalVariablesTrue } from '@/app/utils'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default async function StarterTemplatePage({
  params,
}: {
  params: { templateId: string }
}) {
  const { user } = await getUser()
  const authorizationUrl = getAuthorizationUrl()

  const userProjects = await getUserProjects(user?.id ?? '')

  const selectedTemplate = await getTemplateById(params.templateId)

  return (
    <div className="flex w-full max-w-7xl flex-col items-start justify-start gap-8 p-4 pt-20">
      <Link
        href="/starter-templates"
        className="flex items-center justify-center text-muted-foreground"
      >
        <ChevronLeft className="ml-[-4px]" />
        <span className="self-center text-sm">Starter Templates</span>
      </Link>
      <div className="flex w-full flex-col gap-8 rounded-lg lg:flex-row">
        <div className="order-2 w-full lg:order-1 lg:w-1/3">
          <div className="flex h-full flex-col justify-between gap-4">
            <div className="flex flex-col gap-4">
              <h1 className="marketing-title lg:text-balance">
                {selectedTemplate?.name}
              </h1>
              <p className="text-muted-foreground lg:text-balance">
                {selectedTemplate?.description}
              </p>
              <div className="flex items-center justify-start gap-2">
                <Image
                  src="/pfp.jpeg"
                  alt="author profile picture"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <span className="text-balance font-medium leading-5">
                  Santiago Galán
                </span>
              </div>
            </div>
            <div className="flex w-full flex-col gap-2">
              {user ? (
                <AddTemplateToProjectButton
                  userProjects={userProjects}
                  templateId={selectedTemplate?.id as string}
                />
              ) : (
                <Button asChild>
                  <Link href={authorizationUrl} className="mt-4 w-full">
                    Use template
                  </Link>
                </Button>
              )}
              {selectedTemplate && (
                <GetTestUrlButton template={selectedTemplate} />
              )}
            </div>
          </div>
        </div>
        {selectedTemplate && (
          <div className="pointer-events-none order-1 h-fit w-full select-none rounded-md object-cover lg:order-2 lg:w-2/3 ">
            {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
            <img
              src={getUrlWithConditionalVariablesTrue(selectedTemplate)}
              className="aspect-[1.91/1] w-full rounded-md border"
            />
          </div>
        )}
      </div>
    </div>
  )
}
