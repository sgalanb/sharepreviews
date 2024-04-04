'use client'

import { TemplateType } from '@/app/db/schema'
import { getUrlWithConditionalVariablesTrue } from '@/app/utils'
import Image from 'next/image'
import Link from 'next/link'

export default function SelectedTemplates({
  selectedTemplates,
}: {
  selectedTemplates: TemplateType[]
}) {
  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-10">
      {selectedTemplates.map((template) => (
        <Link
          key={template.id}
          href={`/starter-templates/${template.id}`}
          className="flex flex-col rounded-md border"
        >
          <Image
            src={getUrlWithConditionalVariablesTrue(template)}
            alt=""
            width={438}
            height={227}
            className="rounded-t-md"
          />
          <div className="flex flex-col items-start justify-center gap-2 border-t p-4">
            <h3 className="marketing-third-title text-balance text-left">
              {template.name}
            </h3>
            <p className="text-left text-muted-foreground">
              {template.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
