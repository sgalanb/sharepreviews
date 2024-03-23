'use client'

import { TemplateType } from '@/app/db/schema'
import { Card } from '@/app/ui/components/Card'
import { getUrlWithConditionalVariablesTrue } from '@/app/utils'
import Link from 'next/link'

export default function SelectedTemplates({
  selectedTemplates,
}: {
  selectedTemplates: TemplateType[]
}) {
  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4">
      {selectedTemplates.map((template) => (
        <Link href={`/starter-templates/${template.id}`} key={template.id}>
          <Card className="flex h-fit w-full flex-col items-center justify-center gap-4 p-4">
            <div className="pointer-events-none h-fit w-full select-none">
              {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
              <img
                src={getUrlWithConditionalVariablesTrue(template)}
                className="aspect-[1.91/1] w-full rounded-md border"
              />
            </div>
            <div className="flex w-full flex-col items-start justify-center gap-1">
              <span className="line-clamp-1 h-6 w-full text-ellipsis text-base font-semibold">
                {template.name}
              </span>
              <span className="line-clamp-2 h-10 w-full text-muted-foreground">
                {template.description}
              </span>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
