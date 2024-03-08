'use client'

import { LayerType } from '@/app/(editor)/[project]/templates/[templateId]/edit/page'
import { updateTemplateAction } from '@/app/actions'
import { ProjectType, TemplateType } from '@/app/db/schema'
import { Button } from '@/app/ui/components/Button'
import { ChevronLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function VisualEditorHeader({
  layers,
  userProjects,
  template,
}: {
  layers: LayerType[]
  userProjects: ProjectType[]
  template: TemplateType | undefined
}) {
  const pathname = usePathname()
  const selectedProject = userProjects.find(
    (project) => project.pathname === pathname.split('/')[1]
  )

  console.log(layers)

  return (
    <div className="col-span-3 flex w-full flex-col items-center justify-start gap-2 rounded-t-lg">
      <div className="flex w-full items-center justify-between border-b px-4 py-2">
        <Link
          href={`/${pathname.split('/')[1]}/templates`}
          className="flex items-center justify-center text-muted-foreground"
        >
          <ChevronLeft className="ml-[-4px]" />
          <span className="self-center text-sm font-normal">Exit</span>
        </Link>
        <div className="flex gap-1">
          <span className="text-muted-foreground">{`${selectedProject?.name} / `}</span>
          {template?.name ? (
            <span className="">{template.name}</span>
          ) : (
            <div className="w-20 animate-pulse rounded-full bg-accent duration-700" />
          )}
        </div>
        <Button
          size="sm"
          className="flex gap-2"
          disabled={
            !template?.id || JSON.stringify(layers) === template?.layersData
          }
          onClick={() => {
            if (template?.id && template?.name && selectedProject?.pathname) {
              updateTemplateAction({
                id: template.id,
                name: template.name,
                projectPathname: selectedProject.pathname,
                layersData: JSON.stringify(layers),
              })
            }
          }}
        >
          <Save className="h-5 w-5" />
          Save
        </Button>
      </div>
    </div>
  )
}
