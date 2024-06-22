import VisualEditorLeftPanelLayer from '@/app/(editor)/t/[templateId]/visual-editor-left-panel-layer'
import { LayerType } from '@/app/lib/reflect/datamodel/layers'
import { M } from '@/app/lib/reflect/datamodel/mutators'
import {
  useLayers,
  useLayersIDs,
  useSelectionState,
} from '@/app/lib/reflect/datamodel/subscriptions'
import { Button } from '@/app/ui/components/Button'
import { ScrollArea } from '@/app/ui/components/ScrollArea'
import NewLayerDialog from '@/app/ui/dialogs/new-layer-dialog'
import { DndContext } from '@dnd-kit/core'
import { DragEndEvent } from '@dnd-kit/core/dist/types'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import type { Reflect } from '@rocicorp/reflect/client'
import { Plus } from 'lucide-react'
import { Fragment, useEffect, useState } from 'react'

export default function VisualEditorLeftPanelLayersList({
  reflect,
}: {
  reflect: Reflect<M>
}) {
  const ids = useLayersIDs(reflect)
  const { selectedID, overID } = useSelectionState(reflect)

  const layers = useLayers(reflect)
  const [layersState, setLayersState] = useState<LayerType[]>([])

  useEffect(() => {
    setLayersState(layers)
  }, [layers])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!active || !over) return

    setLayersState((layers) => {
      const oldIndex = layers.findIndex((layer) => layer.id === active.id)
      const newIndex = layers.findIndex((layer) => layer.id === over.id)

      return arrayMove(layersState, oldIndex, newIndex)
    })
  }

  return (
    <Fragment>
      {/* LAYERS */}
      <div className="flex h-14 w-full items-center justify-between py-2 pl-4 pr-2">
        <span className="text-lg font-semibold">Layers</span>
        <NewLayerDialog
          trigger={
            <Button variant="ghost" className="aspect-square w-10 p-0">
              <Plus className="h-5 w-5" />
            </Button>
          }
          reflect={reflect}
        />
      </div>

      <ScrollArea className="flex h-[calc(100dvh-381px)] w-full flex-col items-center justify-start gap-0 px-2">
        <DndContext
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext
            items={layersState}
            strategy={verticalListSortingStrategy}
          >
            {false ? (
              <>
                {Array(4)
                  .fill(0)
                  .map((index) => (
                    <div
                      key={index}
                      className={`${index === 0 ? 'mb-2' : 'my-2'} h-10 w-full animate-pulse rounded-sm bg-muted duration-1000`}
                    />
                  ))}
              </>
            ) : (
              <>
                {layersState.length <= 1 ? (
                  <div className="flex h-[calc(100dvh-381px)] items-center justify-center">
                    <NewLayerDialog
                      trigger={
                        <Button variant="outline" className="flex gap-2">
                          Add first layer
                          <Plus className="h-5 w-5" />
                        </Button>
                      }
                      reflect={reflect}
                    />
                  </div>
                ) : (
                  <>
                    {layersState.map((layer, index) => (
                      <Fragment key={`LeftPanel-${layer.id}`}>
                        <VisualEditorLeftPanelLayer
                          reflect={reflect}
                          id={layer.id}
                          index={index}
                          layersLength={ids.length}
                          selectedID={selectedID}
                        />
                      </Fragment>
                    ))}
                  </>
                )}
              </>
            )}
          </SortableContext>
        </DndContext>
      </ScrollArea>
    </Fragment>
  )
}
