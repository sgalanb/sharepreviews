'use client'

import { LayerType } from '@/app/(editor)/[project]/templates/[templateId]/edit/page'
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
import {
  getConditionalValueVariableName,
  getConditionalVisibilityVariableName,
} from '@/app/utils'
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
  CopyPlus,
  GripHorizontal,
  Image,
  Info,
  Plus,
  Square,
  Trash2,
  Type,
} from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function VisualEditorLeftPanel({
  layers,
  setLayers,
  selectedLayer,
  setSelectedLayer,
  multiSelectedLayers,
  setMultiSelectedLayers,
  canvasBackgroundColor,
  setCanvasBackgroundColor,
  isLoadingTemplate,
  handleOnLayerClick,
}: {
  layers: LayerType[]
  setLayers: Dispatch<SetStateAction<LayerType[]>>
  selectedLayer?: LayerType
  setSelectedLayer: Dispatch<SetStateAction<LayerType | undefined>>
  multiSelectedLayers: LayerType[]
  setMultiSelectedLayers: Dispatch<SetStateAction<LayerType[]>>
  canvasBackgroundColor: string
  setCanvasBackgroundColor: Dispatch<SetStateAction<string>>
  isLoadingTemplate: boolean
  handleOnLayerClick: (layer: LayerType) => void
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
      className="flex h-full w-full flex-col items-start justify-between rounded-l-lg border-r"
      onClick={() => {
        selectedLayer && setSelectedLayer(undefined)
        multiSelectedLayers.length > 0 && setMultiSelectedLayers([])
      }}
    >
      {/* LAYERS */}
      <div className="flex h-14 w-full items-center justify-between py-2 pl-4 pr-2">
        <span className="text-lg font-semibold">Layers</span>
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
      </div>

      <ScrollArea className="flex h-[calc(100dvh-381px)] w-full flex-col items-center justify-start gap-0 px-2">
        <DndContext
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext
            items={layers}
            strategy={verticalListSortingStrategy}
          >
            {isLoadingTemplate ? (
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
                {layers.length === 0 ? (
                  <div className="flex h-[calc(100dvh-381px)] items-center justify-center">
                    <NewLayerDialog
                      layers={layers}
                      setLayers={setLayers}
                      setSelectedLayer={setSelectedLayer}
                      trigger={
                        <Button variant="outline" className="flex gap-2">
                          Add first layer
                          <Plus className="h-5 w-5" />
                        </Button>
                      }
                    />
                  </div>
                ) : (
                  <>
                    {layers.map((layer) => (
                      <Layer
                        key={layer.id}
                        layer={layer}
                        layers={layers}
                        setLayers={setLayers}
                        selected={
                          layer.id === selectedLayer?.id ||
                          multiSelectedLayers.some((l) => l.id === layer.id)
                        }
                        setSelectedLayer={setSelectedLayer}
                        multiSelectedLayers={multiSelectedLayers}
                        setMultiSelectedLayers={setMultiSelectedLayers}
                        handleOnLayerClick={handleOnLayerClick}
                      />
                    ))}
                  </>
                )}
              </>
            )}
          </SortableContext>
        </DndContext>
      </ScrollArea>
      <div className="flex h-64 w-full flex-col">
        {/* VARIABLES */}
        <div className="h-36 w-full">
          <Separator />
          <div className="flex h-full w-full flex-col items-start justify-start gap-2 pb-[1px] pt-4">
            <div className="flex h-8 w-full items-center justify-start gap-2 px-4">
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
                      <strong>show/hide them</strong>. <br /> Variables are
                      passed to the template via the{' '}
                      <strong>template URL</strong>. You can get the template
                      URL after saving.
                    </span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <ScrollArea className="flex h-full w-full px-4">
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
                  (layer) =>
                    layer.type !== 'rectangle' && layer.conditionalValue
                )
                .map((layer) => (
                  <VariablesElement
                    key={layer.id}
                    layer={layer}
                    setSelectedLayer={setSelectedLayer}
                  />
                ))}
            </ScrollArea>
          </div>
        </div>
        {/* BACKGROUND */}
        <div className="h-28 w-full">
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
                value={canvasBackgroundColor}
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
    </div>
  )
}

const Layer = ({
  layer,
  layers,
  setLayers,
  selected,
  setSelectedLayer,
  multiSelectedLayers,
  setMultiSelectedLayers,
  handleOnLayerClick,
}: {
  layer: LayerType
  layers: LayerType[]
  setLayers: Dispatch<SetStateAction<LayerType[]>>
  selected: boolean
  setSelectedLayer: Dispatch<SetStateAction<LayerType | undefined>>
  multiSelectedLayers: LayerType[]
  setMultiSelectedLayers: Dispatch<SetStateAction<LayerType[]>>
  handleOnLayerClick: (layer: LayerType) => void
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
        handleOnLayerClick(layer)
      }}
      className={`${
        isDragging
          ? 'border-ring'
          : selected
            ? 'border-background hover:border-background'
            : 'border-background hover:border-ring'
      } ${
        selected ? 'bg-accent' : 'bg-background'
      } flex select-none items-center justify-between gap-2 rounded-sm border-2 p-1.5`}
    >
      <div className="flex items-center justify-start gap-2">
        {layer.type === 'text' ? (
          <Type
            className={`${
              selected
                ? 'stroke-foreground'
                : 'stroke-neutral-300 dark:stroke-secondary'
            } h-5 w-5 shrink-0`}
          />
        ) : layer.type === 'image' ? (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image
            className={`${
              selected
                ? 'stroke-foreground'
                : 'stroke-neutral-300 dark:stroke-secondary'
            } h-5 w-5 shrink-0`}
          />
        ) : (
          layer.type === 'rectangle' && (
            <Square
              className={`${
                selected
                  ? 'stroke-foreground'
                  : 'stroke-neutral-300 dark:stroke-secondary'
              } h-5 w-5 shrink-0`}
            />
          )
        )}
        <span className="line-clamp-1 break-all text-sm">{layer.name}</span>
      </div>
      <TooltipProvider>
        <div className="flex">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={`${selected ? '' : 'hidden'} aspect-square h-8 p-0 hover:bg-neutral-200 dark:hover:bg-neutral-600`}
                onClick={(e) => {
                  e.stopPropagation()
                  // Duplicate layer/s
                  if (multiSelectedLayers.length > 1) {
                    const newLayers = layers
                      .filter((layer) => multiSelectedLayers.includes(layer))
                      .map((oldLayer) => ({
                        ...oldLayer,
                        id: uuidv4(),
                        name: `${oldLayer.name} copy`,
                      }))
                      .map((newLayer) => ({
                        ...newLayer,
                        conditionalValueVariableName:
                          newLayer.type !== 'rectangle'
                            ? newLayer.conditionalValue
                              ? getConditionalValueVariableName(newLayer)
                              : ''
                            : '',
                        conditionalVisibilityVariableName:
                          newLayer.conditionalVisibility
                            ? getConditionalVisibilityVariableName(newLayer)
                            : '',
                      }))
                    setSelectedLayer(undefined)

                    setMultiSelectedLayers(newLayers)

                    setLayers([...layers, ...newLayers])
                  } else {
                    const newLayerName = {
                      ...layer,
                      id: uuidv4(),
                      name: `${layer.name} copy`,
                    }
                    const newLayer = {
                      ...newLayerName,
                      conditionalValueVariableName:
                        newLayerName.type !== 'rectangle'
                          ? newLayerName.conditionalValue
                            ? getConditionalValueVariableName(newLayerName)
                            : ''
                          : '',
                      conditionalVisibilityVariableName:
                        newLayerName.conditionalVisibility
                          ? getConditionalVisibilityVariableName(newLayerName)
                          : '',
                    }
                    setLayers([...layers, newLayer])
                    setSelectedLayer(newLayer)
                  }
                }}
              >
                <CopyPlus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span className="font-normal">
                Duplicate{' '}
                {multiSelectedLayers.length > 1
                  ? `${multiSelectedLayers.length} layers`
                  : 'layer'}
              </span>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <DeleteLayerDialog
              trigger={
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`${selected ? '' : 'hidden'} aspect-square h-8 p-0 hover:bg-neutral-200 dark:hover:bg-neutral-600`}
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
              }
              layers={layers}
              setLayers={setLayers}
              selectedLayer={layer}
              setSelectedLayer={setSelectedLayer}
              multiSelectedLayers={multiSelectedLayers}
              setMultiSelectedLayers={setMultiSelectedLayers}
            />
            <TooltipContent>
              <span className="font-normal">
                Delete{' '}
                {multiSelectedLayers.length > 1
                  ? `${multiSelectedLayers.length} layers`
                  : 'layer'}
              </span>
            </TooltipContent>
          </Tooltip>

          <Button
            {...attributes}
            {...listeners}
            variant="ghost"
            className={`${selected ? 'hover:bg-neutral-200 dark:hover:bg-neutral-600' : ''} ${
              isDragging ? 'cursor-grabbing ' : 'cursor-grab'
            } aspect-square h-8 p-0`}
          >
            <GripHorizontal className="h-4 w-4 fill-muted-foreground" />
          </Button>
        </div>
      </TooltipProvider>
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
  return (
    <div
      key={layer.id}
      className="mb-2 break-all rounded-sm bg-accent px-2 py-1.5"
      onClick={(e) => {
        e.stopPropagation()
        setSelectedLayer(layer)
      }}
    >
      <span className="">
        {visibilityVariable
          ? getConditionalVisibilityVariableName(layer)
          : getConditionalValueVariableName(layer)}
      </span>
    </div>
  )
}
