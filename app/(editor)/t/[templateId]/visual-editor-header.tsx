'use client'

import { M } from '@/app/lib/reflect/datamodel/mutators'
import {
  useLayers,
  useTemplates,
} from '@/app/lib/reflect/datamodel/subscriptions'
import { Button } from '@/app/ui/components/Button'
import type { Reflect } from '@rocicorp/reflect/client'

export default function VisualEditorHeader({
  reflect,
}: {
  reflect: Reflect<M>
}) {
  const layers = useLayers(reflect)
  const templates = useTemplates(reflect) // Will be only one template

  return (
    <div className="col-span-3 flex w-full flex-col items-center justify-start gap-2 rounded-t-lg">
      <div className="flex w-full items-center justify-between border-b px-4 py-2">
        <Button>Do something</Button>
        <div className="flex gap-1">
          {templates[0]?.name ? (
            <span className="">{templates[0].name}</span>
          ) : (
            <div className="w-20 animate-pulse rounded-full bg-accent duration-1000" />
          )}
        </div>
        <Button>Export</Button>
      </div>
    </div>
  )
}
