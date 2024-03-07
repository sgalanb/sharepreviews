'use client'

import { LayerType } from '@/app/(editor)/[project]/templates/[templateId]/edit/types'
import VisualEditorHeader from '@/app/(editor)/[project]/templates/[templateId]/edit/visual-editor-header'
import VisualEditorLeftPanel from '@/app/(editor)/[project]/templates/[templateId]/edit/visual-editor-left-panel'
import VisualEditorPreview from '@/app/(editor)/[project]/templates/[templateId]/edit/visual-editor-preview'
import VisualEditorRightPanel from '@/app/(editor)/[project]/templates/[templateId]/edit/visual-editor-right-panel'
import { ProjectType } from '@/app/db/schema'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function VisualEditor({
  userId,
  userProjects,
}: {
  userId: string
  userProjects: ProjectType[]
}) {
  const pathname = usePathname()
  const templateId = pathname.split('/')[3]

  const [template, setTemplate] = useState<any>(undefined)

  const getTemplate = async () => {
    const res = await fetch(`/api/templates/${templateId}`)
    const data = await res.json()
    setTemplate(data)
  }

  useEffect(() => {
    // Make sure the template is loaded only once
    if (!template) {
      getTemplate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [canvasBackgroundColor, setCanvasBackgroundColor] =
    useState<string>('#ffffff')

  const [layers, setLayers] = useState<LayerType[]>([])

  const [selectedLayer, setSelectedLayer] = useState<LayerType | undefined>()

  return (
    <div className="grid h-full w-full grid-cols-[280px,1fr,280px] grid-rows-[53px,1fr]">
      {/* HEADER */}
      <VisualEditorHeader userProjects={userProjects} />
      {/* LEFT PANEL */}
      <VisualEditorLeftPanel
        layers={layers}
        setLayers={setLayers}
        selectedLayer={selectedLayer}
        setSelectedLayer={setSelectedLayer}
        canvasBackgroundColor={canvasBackgroundColor}
        setCanvasBackgroundColor={setCanvasBackgroundColor}
      />
      {/* PREVIEW */}
      <VisualEditorPreview
        layers={layers}
        setLayers={setLayers}
        selectedLayer={selectedLayer}
        setSelectedLayer={setSelectedLayer}
        canvasBackgroundColor={canvasBackgroundColor}
        setCanvasBackgroundColor={setCanvasBackgroundColor}
      />
      {/* RIGHT PANEL */}
      <VisualEditorRightPanel
        userId={userId}
        layers={layers}
        setLayers={setLayers}
        selectedLayer={selectedLayer}
        setSelectedLayer={setSelectedLayer}
      />
    </div>
  )
}
