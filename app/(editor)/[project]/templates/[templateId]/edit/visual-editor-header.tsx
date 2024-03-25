'use client'

import { LayerType } from '@/app/(editor)/[project]/templates/[templateId]/edit/page'
import { updateTemplateAction } from '@/app/actions/actions'
import { ProjectType, TemplateType } from '@/app/db/schema'
import { Button } from '@/app/ui/components/Button'
import Spinner from '@/app/ui/components/Spinner'
import { ChevronLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { useFormStatus } from 'react-dom'

export default function VisualEditorHeader({
  layers,
  canvasBackgroundColor,
  project,
  template,
  originalTemplate,
}: {
  layers: LayerType[]
  canvasBackgroundColor: string
  project: ProjectType
  template: TemplateType | undefined
  originalTemplate: TemplateType | undefined
}) {
  return (
    <div className="col-span-3 flex w-full flex-col items-center justify-start gap-2 rounded-t-lg">
      <div className="flex w-full items-center justify-between border-b px-4 py-2">
        <Link
          href={`/${project.pathname}/templates`}
          className="flex items-center justify-center text-muted-foreground"
        >
          <ChevronLeft className="ml-[-4px]" />
          <span className="self-center text-sm font-normal">Exit</span>
        </Link>
        <div className="flex gap-1">
          <span className="text-muted-foreground">{`${project?.name} / `}</span>
          {template?.name ? (
            <span className="">{template.name}</span>
          ) : (
            <div className="w-20 animate-pulse rounded-full bg-accent duration-1000" />
          )}
        </div>
        <form
          action={() => {
            if (
              template?.id &&
              template?.name &&
              project?.id &&
              project?.pathname
            ) {
              updateTemplateAction({
                id: template.id,
                name: template.name,
                projectId: project.id,
                projectPathname: project.pathname,
                layersData: JSON.stringify(layers),
                canvasBackgroundColor,
              })
            }
          }}
        >
          <SaveButton
            template={template}
            originalTemplate={originalTemplate}
            layers={layers}
            canvasBackgroundColor={canvasBackgroundColor}
          />
        </form>
      </div>
    </div>
  )
}

function SaveButton({
  template,
  originalTemplate,
  layers,
  canvasBackgroundColor,
}: {
  template: TemplateType | undefined
  originalTemplate: TemplateType | undefined
  layers: LayerType[]
  canvasBackgroundColor: string
}) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      size="sm"
      className="flex min-w-[5.25rem] gap-2"
      disabled={
        !template?.id ||
        (JSON.stringify(layers) === template?.layersData &&
          canvasBackgroundColor === template?.canvasBackgroundColor &&
          originalTemplate?.name === template?.name) ||
        pending
      }
    >
      {pending ? (
        <Spinner className="h-6 w-6 fill-primary-foreground text-primary-foreground/25" />
      ) : (
        <>
          <Save className="h-5 w-5" />
          Save
        </>
      )}
    </Button>
  )
}
