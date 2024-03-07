'use client'

import { LayerType } from '@/app/(editor)/[project]/templates/[templateId]/edit/types'
import { Button } from '@/app/ui/components/Button'
import { Input } from '@/app/ui/components/Input'
import { Label } from '@/app/ui/components/Label'
import { ScrollArea } from '@/app/ui/components/ScrollArea'
import { Separator } from '@/app/ui/components/Separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/ui/components/Tooltip'
import DeleteLayerDialog from '@/app/ui/dialogs/delete-layer-dialog'
import NewLayerDialog from '@/app/ui/dialogs/new-layer-dialog'
import { DndContext } from '@dnd-kit/core'
import { DragEndEvent } from '@dnd-kit/core/dist/types'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  GripHorizontal,
  Image,
  Info,
  Plus,
  Square,
  Trash2,
  Type,
} from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

export default function VisualEditorLeftPanel({
  layers,
  setLayers,
  selectedLayer,
  setSelectedLayer,
  canvasBackgroundColor,
  setCanvasBackgroundColor,
}: {
  layers: LayerType[]
  setLayers: Dispatch<SetStateAction<LayerType[]>>
  selectedLayer?: LayerType
  setSelectedLayer: Dispatch<SetStateAction<LayerType | undefined>>
  canvasBackgroundColor: string
  setCanvasBackgroundColor: Dispatch<SetStateAction<string>>
}) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!active || !over) return

    setLayers((layers) => {
      const oldIndex = layers.findIndex((layer) => layer.id === active.id)
      const newIndex = layers.findIndex((layer) => layer.id === over.id)

      return arrayMove(layers, oldIndex, newIndex)
    })
  }

  return (
    <div
      className="flex w-full flex-col items-start justify-between rounded-l-lg border-r"
      onClick={() => {
        selectedLayer && setSelectedLayer(undefined)
      }}
    >
      {/* LAYERS */}
      <div className="flex h-full w-full flex-col items-start justify-start gap-2">
        <div className="flex h-12 w-full items-center justify-between pl-4 pr-2 pt-2">
          <span className="text-lg font-semibold">Layers</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <NewLayerDialog
                  layers={layers}
                  setLayers={setLayers}
                  setSelectedLayer={setSelectedLayer}
                  trigger={
                    <Button variant="ghost" className="aspect-square w-10 p-0">
                      <Plus className="h-5 w-5" />
                    </Button>
                  }
                />
              </TooltipTrigger>
              <TooltipContent>
                <span className="font-medium">Add new layer</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <DndContext
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext
            items={layers}
            strategy={verticalListSortingStrategy}
          >
            <ScrollArea className="flex h-full w-full flex-col gap-0 px-2">
              {layers.map((layer, index) => (
                <Layer
                  key={layer.id}
                  layer={layer}
                  layers={layers}
                  setLayers={setLayers}
                  selected={layer.id === selectedLayer?.id}
                  setSelectedLayer={setSelectedLayer}
                />
              ))}
            </ScrollArea>
          </SortableContext>
        </DndContext>
      </div>
      {/* VARIABLES */}
      <div className="w-full">
        <Separator />
        <div className="flex h-fit w-full flex-col items-start justify-start gap-2 p-4">
          <div className="flex h-8 w-full items-center justify-start gap-2">
            <span className="text-lg font-semibold">Variables</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent
                  className="w-64"
                  align="start"
                  alignOffset={-96}
                >
                  <span className="font-normal">
                    Variables are used to{' '}
                    <strong>change the content of the layers</strong> or to{' '}
                    <strong>show/hide them</strong>. <br /> Variables are passed
                    to the template via the <strong>template URL</strong>. You
                    will get the template URL after saving.
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {layers
            .filter((layer) => layer.conditionalVisibility)
            // order by id
            .sort((a, b) => a.id.localeCompare(b.id))
            .map((layer) => (
              <VariablesElement
                key={layer.id}
                layer={layer}
                setSelectedLayer={setSelectedLayer}
                visibilityVariable
              />
            ))}
          {layers
            .filter(
              (layer) => layer.type !== 'rectangle' && layer.conditionalValue
            )
            .map((layer) => (
              <VariablesElement
                key={layer.id}
                layer={layer}
                setSelectedLayer={setSelectedLayer}
              />
            ))}
        </div>
      </div>
      {/* BACKGROUND */}
      <div className="w-full">
        <Separator />
        <div className="flex h-fit w-full flex-col items-start justify-start gap-2 p-4">
          <div className="flex h-8 w-full items-center justify-start gap-2">
            <span className="text-lg font-semibold">Background</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent className="w-64">
                  <span className="font-normal">
                    For more complex backgrounds you can add a full size{' '}
                    <strong>image layer</strong> and drag it to the bottom of
                    the layers list.
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="grid w-full grid-cols-2 items-center gap-2">
            <Input
              type="color"
              id="background-color"
              defaultValue={canvasBackgroundColor}
              onChange={(e) => setCanvasBackgroundColor(e.target.value)}
              leftLabel={
                <Label
                  htmlFor="background-color"
                  className="w-10 text-center text-muted-foreground"
                >
                  Color
                </Label>
              }
              className="py-1.5 pl-16"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const Layer = ({
  layer,
  layers,
  setLayers,
  selected,
  setSelectedLayer,
}: {
  layer: LayerType
  layers: LayerType[]
  setLayers: Dispatch<SetStateAction<LayerType[]>>
  selected: boolean
  setSelectedLayer: Dispatch<SetStateAction<LayerType | undefined>>
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: layer.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={(event) => {
        event.stopPropagation()
        setSelectedLayer(layer)
      }}
      className={`${
        isDragging
          ? 'border-ring'
          : selected
            ? 'border-background hover:border-background'
            : 'border-background hover:border-ring'
      } ${
        selected ? 'bg-accent' : 'cursor-pointer bg-background'
      } flex items-center justify-between gap-2 rounded-sm border-2 p-1.5`}
    >
      <div className="flex items-center justify-start gap-2">
        {layer.type === 'text' ? (
          <Type
            className={`${
              selected
                ? 'stroke-foreground'
                : 'stroke-neutral-300 dark:stroke-secondary'
            } h-5 w-5`}
          />
        ) : layer.type === 'image' ? (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image
            className={`${
              selected
                ? 'stroke-foreground'
                : 'stroke-neutral-300 dark:stroke-secondary'
            } h-5 w-5`}
          />
        ) : (
          layer.type === 'rectangle' && (
            <Square
              className={`${
                selected
                  ? 'stroke-foreground'
                  : 'stroke-neutral-300 dark:stroke-secondary'
              } h-5 w-5`}
            />
          )
        )}
        <span className="text-sm">{layer.name}</span>
      </div>
      <div className="flex">
        <DeleteLayerDialog
          trigger={
            <Button
              variant="ghost"
              className={`${selected ? '' : 'hidden'} aspect-square h-8 p-0 hover:bg-neutral-200`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          }
          layers={layers}
          setLayers={setLayers}
          selectedLayer={layer}
          setSelectedLayer={setSelectedLayer}
        />

        <Button
          {...attributes}
          {...listeners}
          variant="ghost"
          className={`${selected ? 'hover:bg-neutral-200' : ''} ${
            isDragging ? 'cursor-grabbing ' : 'cursor-grab'
          } aspect-square h-8 p-0`}
        >
          <GripHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

const VariablesElement = ({
  layer,
  setSelectedLayer,
  visibilityVariable,
}: {
  layer: LayerType
  setSelectedLayer: (layer: LayerType) => void
  visibilityVariable?: boolean
}) => {
  // Remove spaces and special characters from the layer name
  const formattedLayerName = layer.name
    .replace(/[^a-zA-Z0-9]/g, '_')
    .toLowerCase()

  const postfix = visibilityVariable
    ? 'isVisible'
    : layer.type === 'text'
      ? 'value'
      : 'src'
  return (
    <div
      key={layer.id}
      className="rounded-sm bg-accent px-2 py-1"
      onClick={(e) => {
        e.stopPropagation()
        setSelectedLayer(layer)
      }}
    >
      <span className="">{`${formattedLayerName}_${postfix}`}</span>
    </div>
  )
}
