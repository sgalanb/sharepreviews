'use client'

import { LayerType } from '@/app/(editor)/[project]/templates/[templateId]/edit/page'
import { updateTemplateAction } from '@/app/actions/actions'
import { ProjectType, TemplateType } from '@/app/db/schema'
import { Button } from '@/app/ui/components/Button'
import Spinner from '@/app/ui/components/Spinner'
import { ChevronLeft, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useFormStatus } from 'react-dom'

export default function VisualEditorHeader({
  layers,
  canvasBackgroundColor,
  project,
  template,
  originalTemplate,
  hasUnsavedChanges,
  promptUnsavedChanges,
}: {
  layers: LayerType[]
  canvasBackgroundColor: string
  project: ProjectType
  template: TemplateType | undefined
  originalTemplate: TemplateType | undefined
  hasUnsavedChanges: boolean
  promptUnsavedChanges: () => boolean
}) {
  const router = useRouter()
  // `/${project.pathname}/templates`
  return (
    <div className="col-span-3 flex w-full flex-col items-center justify-start gap-2 rounded-t-lg">
      <div className="flex w-full items-center justify-between border-b px-4 py-2">
        <button
          onClick={() => {
            if (hasUnsavedChanges && !promptUnsavedChanges()) {
              return
            }
            router.push(`/${project.pathname}/templates`)
          }}
          className="flex items-center justify-center text-muted-foreground"
        >
          <ChevronLeft className="ml-[-4px]" />
          <span className="self-center text-sm font-normal">Exit</span>
        </button>
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
          <SaveButton hasUnsavedChanges={hasUnsavedChanges} />
        </form>
      </div>
    </div>
  )
}

function SaveButton({ hasUnsavedChanges }: { hasUnsavedChanges: boolean }) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      size="sm"
      className="flex min-w-[5.25rem] gap-2"
      disabled={pending || !hasUnsavedChanges}
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
