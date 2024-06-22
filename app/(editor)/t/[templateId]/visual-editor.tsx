'use client'

import VisualEditorCanvas from '@/app/(editor)/t/[templateId]/visual-editor-canvas'
import { TemplateInfoType } from '@/app/api/templates/[templateId]/route'
import { randUserInfo } from '@/app/lib/reflect/datamodel/client-state'
import { LayerType } from '@/app/lib/reflect/datamodel/layers'
import { M, clientMutators } from '@/app/lib/reflect/datamodel/mutators'
import { Reflect } from '@rocicorp/reflect/client'
import { UndoManager } from '@rocicorp/undo'
import { nanoid } from 'nanoid'

import { useCallback, useEffect, useState } from 'react'

export const reflectServer = process.env.NEXT_PUBLIC_REFLECT_SERVER!

if (!reflectServer) {
  throw new Error('Required env var NEXT_PUBLIC_REFLECT_SERVER is not defined')
}

export default function VisualEditor({ templateId }: { templateId: string }) {
  const [reflect, setReflectClient] = useState<Reflect<M> | null>(null)
  const [online, setOnline] = useState(false)

  useEffect(() => {
    const [, , roomID] = location.pathname.split('/')

    console.info(`Connecting to Reflect server at ${reflectServer}`)
    const userID = nanoid()

    const r = new Reflect<M>({
      server: reflectServer,
      onOnlineChange: setOnline,
      userID,
      roomID,
      mutators: clientMutators,
    })

    const defaultUserInfo = randUserInfo()
    void r.mutate.initClientState({
      cursor: null,
      overID: '',
      selectedID: '',
      userInfo: defaultUserInfo,
    })

    setReflectClient(r)
  }, [])

  const [template, setTemplate] = useState<TemplateInfoType | undefined>(
    undefined
  )

  const [canvasBackgroundColor, setCanvasBackgroundColor] = useState<string>('')

  const [layers, setLayers] = useState<LayerType[]>([])

  const getTemplate = async () => {
    const res = await fetch(`/api/templates/${templateId}`)
    const data = await res.json()
    setTemplate(data)
    setCanvasBackgroundColor(data.canvasBackgroundColor)
    setLayers(JSON.parse(data.layersData))
  }

  const [selectedLayer, setSelectedLayer] = useState<LayerType | undefined>()
  const [multiSelectedLayers, setMultiSelectedLayers] = useState<LayerType[]>(
    []
  )

  // Handle Keyboard
  const [spacePressed, setSpacePressed] = useState<boolean>(false)
  const [shiftPressed, setShiftPressed] = useState<boolean>(false)

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.code === 'Space') {
        setSpacePressed(true)
      } else if (e.code === 'Escape') {
        setSelectedLayer(undefined)
        setMultiSelectedLayers([])
      } else if (e.code === 'ShiftLeft') {
        setShiftPressed(true)
      }
    }
    const handleKeyUp = (e: any) => {
      if (e.code === 'Space') {
        setSpacePressed(false)
      } else if (e.code === 'Escape') {
        setSelectedLayer(undefined)
        setMultiSelectedLayers([])
      } else if (e.code === 'ShiftLeft') {
        setShiftPressed(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOnLayerClick = (layer: LayerType) => {
    if (shiftPressed) {
      if (
        multiSelectedLayers.includes(layer) &&
        multiSelectedLayers.length > 2
      ) {
        setMultiSelectedLayers(
          multiSelectedLayers.filter((l) => l.id !== layer.id)
        )
        if (selectedLayer?.id === layer.id) {
          setSelectedLayer(undefined)
        }
      } else if (
        multiSelectedLayers.includes(layer) &&
        multiSelectedLayers.length === 2
      ) {
        setMultiSelectedLayers(
          multiSelectedLayers.filter((l) => l.id !== layer.id)
        )
        setSelectedLayer(multiSelectedLayers.find((l) => l.id !== layer.id))
      } else if (multiSelectedLayers.length > 0) {
        setMultiSelectedLayers([...multiSelectedLayers, layer])
      } else if (selectedLayer) {
        setMultiSelectedLayers([selectedLayer, layer])
      } else {
        setMultiSelectedLayers([layer])
        setSelectedLayer(layer)
      }
    } else {
      setSelectedLayer(layer)
      setMultiSelectedLayers([])
    }
  }

  // Check if there are unsaved changes
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false)
  // Prevent leaving the page if there are unsaved changes
  useEffect(() => {
    if (!hasUnsavedChanges) return
    function handleOnBeforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault()
      return (e.returnValue = '')
    }
    window.addEventListener('beforeunload', handleOnBeforeUnload, {
      capture: true,
    })
    return () =>
      window.removeEventListener('beforeunload', handleOnBeforeUnload, {
        capture: true,
      })
  }, [hasUnsavedChanges])
  const promptUnsavedChanges = useCallback(() => {
    return window.confirm(
      'You have unsaved changes. Are you sure you want to leave?'
    )
  }, [])

  // Load available Google fonts
  const [availableFonts, setAvailableFonts] = useState<string[]>([])

  useEffect(() => {
    const getAvailableFonts = async () => {
      const res = await fetch(
        `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY}&subset=latin&sort=popularity`
      )
      const data = await res.json()
      setAvailableFonts(data.items)
    }
    getAvailableFonts()
  }, [])

  // Guides
  const [floatingLabelTwitter, setFloatingLabelTwitter] =
    useState<boolean>(false)

  const undoManager = new UndoManager()

  if (!reflect) {
    return null
  }

  return (
    <div className="grid h-full w-full grid-cols-[280px,1fr,280px] overflow-hidden">
      {/* HEADER */}
      {/* <VisualEditorHeader
        layers={layers}
        template={template}
        canvasBackgroundColor={canvasBackgroundColor}
        hasUnsavedChanges={hasUnsavedChanges}
        promptUnsavedChanges={promptUnsavedChanges}
      /> */}
      {/* LEFT PANEL */}
      {/* <VisualEditorLeftPanel
        layers={layers}
        setLayers={setLayers}
        selectedLayer={selectedLayer}
        setSelectedLayer={setSelectedLayer}
        multiSelectedLayers={multiSelectedLayers}
        setMultiSelectedLayers={setMultiSelectedLayers}
        canvasBackgroundColor={canvasBackgroundColor}
        setCanvasBackgroundColor={setCanvasBackgroundColor}
        isLoadingTemplate={!template}
        handleOnLayerClick={handleOnLayerClick}
      /> */}
      {/* PREVIEW */}
      <VisualEditorCanvas
        reflect={reflect}
        undoManager={undoManager}
        floatingLabelTwitter={floatingLabelTwitter}
      />
      {/* RIGHT PANEL */}
      {/* <VisualEditorRightPanel
        userId={userId}
        template={template}
        setTemplate={setTemplate}
        layers={layers}
        setLayers={setLayers}
        selectedLayer={selectedLayer}
        setSelectedLayer={setSelectedLayer}
        multiSelectedLayers={multiSelectedLayers}
        setMultiSelectedLayers={setMultiSelectedLayers}
        availableFonts={availableFonts}
        floatingLabelTwitter={floatingLabelTwitter}
        setFloatingLabelTwitter={setFloatingLabelTwitter}
      /> */}
    </div>
  )
}
