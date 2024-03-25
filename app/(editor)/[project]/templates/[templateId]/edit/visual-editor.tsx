'use client'

import { LayerType } from '@/app/(editor)/[project]/templates/[templateId]/edit/page'
import VisualEditorHeader from '@/app/(editor)/[project]/templates/[templateId]/edit/visual-editor-header'
import VisualEditorLeftPanel from '@/app/(editor)/[project]/templates/[templateId]/edit/visual-editor-left-panel'
import VisualEditorPreview from '@/app/(editor)/[project]/templates/[templateId]/edit/visual-editor-preview'
import VisualEditorRightPanel from '@/app/(editor)/[project]/templates/[templateId]/edit/visual-editor-right-panel'
import { ProjectType, TemplateType } from '@/app/db/schema'

import { useEffect, useState } from 'react'

export default function VisualEditor({
  userId,
  project,
  templateId,
}: {
  userId: string
  project: ProjectType
  templateId: string
}) {
  const [template, setTemplate] = useState<TemplateType | undefined>(undefined)
  const [originalTemplate, setOriginalTemplate] = useState<
    TemplateType | undefined
  >(undefined)

  const [canvasBackgroundColor, setCanvasBackgroundColor] = useState<string>('')

  const [layers, setLayers] = useState<LayerType[]>([])

  const getTemplate = async () => {
    const res = await fetch(`/api/templates/${templateId}`)
    const data = await res.json()
    setTemplate(data)
    setOriginalTemplate(data)
    setCanvasBackgroundColor(data.canvasBackgroundColor)
    setLayers(JSON.parse(data.layersData))
  }

  useEffect(() => {
    // Make sure the template is loaded only once
    if (!template) {
      getTemplate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [selectedLayer, setSelectedLayer] = useState<LayerType | undefined>()

  return (
    <div className="grid h-full w-full grid-cols-[280px,1fr,280px] grid-rows-[53px,1fr]">
      {/* HEADER */}
      <VisualEditorHeader
        layers={layers}
        project={project}
        template={template}
        canvasBackgroundColor={canvasBackgroundColor}
        originalTemplate={originalTemplate}
      />
      {/* LEFT PANEL */}
      <VisualEditorLeftPanel
        layers={layers}
        setLayers={setLayers}
        selectedLayer={selectedLayer}
        setSelectedLayer={setSelectedLayer}
        canvasBackgroundColor={canvasBackgroundColor}
        setCanvasBackgroundColor={setCanvasBackgroundColor}
        isLoadingTemplate={!template}
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
        template={template}
        setTemplate={setTemplate}
        layers={layers}
        setLayers={setLayers}
        selectedLayer={selectedLayer}
        setSelectedLayer={setSelectedLayer}
      />
    </div>
  )
}
