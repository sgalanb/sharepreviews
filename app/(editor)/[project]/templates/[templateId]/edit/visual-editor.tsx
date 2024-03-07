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

  const [layers, setLayers] = useState<LayerType[]>([
    {
      id: '1',
      type: 'text',
      name: 'Text1',
      x: 0,
      y: 0,
      width: 200,
      height: 100,
      rotation: 0,
      opacity: 1,
      family: 'Inter Regular',
      size: 16,
      lineHeight: 1.5,
      alignHorizontal: 'flex-start',
      alignVertical: 'flex-start',
      color: '#000000',
      conditionalVisibility: false,
      conditionalValue: false,
      value: 'Hello, world!',
    },
    {
      id: '2',
      type: 'text',
      name: 'Text2',
      x: 0,
      y: 0,
      width: 200,
      height: 100,
      rotation: 0,
      opacity: 1,
      family: 'Inter Regular',
      size: 16,
      lineHeight: 1.5,
      alignHorizontal: 'flex-start',
      alignVertical: 'flex-start',
      color: '#000000',
      conditionalVisibility: false,
      conditionalValue: true,
      exampleValue: 'Hello, world!',
    },
    {
      id: '3',
      type: 'image',
      name: 'Image1',
      x: 500,
      y: 150,
      width: 100,
      height: 100,
      rotation: 0,
      opacity: 1,
      cornerRadius: 0,
      objectFit: 'cover',
      conditionalVisibility: false,
      conditionalValue: false,
      src: 'https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/meta-icons/rockstar/favicon-180x180.png',
    },
    {
      id: '4',
      type: 'image',
      name: 'Image2',
      x: 500,
      y: 150,
      width: 100,
      height: 100,
      rotation: 0,
      opacity: 1,
      cornerRadius: 0,
      objectFit: 'cover',
      conditionalVisibility: false,
      conditionalValue: true,
      exampleSrc:
        'https://images.transistor.fm/images/logos/site/15734/medium_1ST_Principles_Logo_black.png',
    },
    {
      id: '5',
      type: 'rectangle',
      name: 'Rectangle1',
      x: 1100,
      y: 200,
      width: 100,
      height: 100,
      rotation: 0,
      opacity: 1,
      color: '#000000',
      cornerRadius: 0,
      conditionalVisibility: false,
    },
    {
      id: '6',
      type: 'rectangle',
      name: 'Rectangle2',
      x: 1100,
      y: 200,
      width: 100,
      height: 100,
      rotation: 0,
      opacity: 1,
      color: '#000000',
      cornerRadius: 0,
      conditionalVisibility: true,
    },
  ])

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
