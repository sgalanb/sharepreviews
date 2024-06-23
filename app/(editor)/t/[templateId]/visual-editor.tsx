'use client'

import VisualEditorCanvas from '@/app/(editor)/t/[templateId]/visual-editor-canvas'
import VisualEditorLeftPanel from '@/app/(editor)/t/[templateId]/visual-editor-left-panel'
import VisualEditorRightPanel from '@/app/(editor)/t/[templateId]/visual-editor-right-panel'
import { randUserInfo } from '@/app/lib/reflect/datamodel/client-state'
import { M, clientMutators } from '@/app/lib/reflect/datamodel/mutators'
import { Reflect } from '@rocicorp/reflect/client'
import { UndoManager } from '@rocicorp/undo'
import { nanoid } from 'nanoid'

import { useEffect, useState } from 'react'

export const reflectServer = process.env.NEXT_PUBLIC_REFLECT_SERVER!

// if (!reflectServer) {
//   throw new Error('Required env var NEXT_PUBLIC_REFLECT_SERVER is not defined')
// }

export default function VisualEditor({ templateId }: { templateId: string }) {
  const [reflect, setReflectClient] = useState<Reflect<M> | null>(null)
  const [online, setOnline] = useState(false)

  useEffect(() => {
    const [, , roomID] = location.pathname.split('/')

    console.info(`Connecting to Reflect server at ${reflectServer}`)
    const userID = nanoid()

    const r = new Reflect<M>({
      server: 'http://localhost:8080',
      // server: reflectServer,
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

    void r.mutate.initTemplate({
      id: roomID,
      name: 'Untitled',
      width: 1200,
      height: 630,
    })

    void r.mutate.initLayer({
      id: roomID,
      name: `backgroundFirstLayerHidden`,
      type: 'shape',
      positionX: 0,
      positionY: 0,
      positionZ: 0,
      width: 1200,
      height: 630,
      rotation: 0,
      opacity: 1,
      cornerRadius: 0,
      color: '#F3F3F3',
    })

    setReflectClient(r)
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
      <VisualEditorLeftPanel reflect={reflect} />
      {/* PREVIEW */}
      <VisualEditorCanvas reflect={reflect} undoManager={undoManager} />
      {/* RIGHT PANEL */}
      <VisualEditorRightPanel
        reflect={reflect}
        availableFonts={availableFonts}
      />
    </div>
  )
}
