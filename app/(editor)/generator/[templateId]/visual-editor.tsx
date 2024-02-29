'use client'

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
  BlendIcon,
  ChevronLeft,
  GripHorizontal,
  Image,
  Plus,
  RotateCw,
  Save,
  Spline,
  Square,
  Type,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface LayerInterface {
  id: string
  name: string
  x: number
  y: number
  width: number
  height: number
  rotation: number
  opacity: number
  type: 'text' | 'image' | 'rectangle'
}

interface TextLayerInterface extends LayerInterface {
  type: 'text'
  family: string
  size: number
  lineHeight: number
  weight: string
  alignHorizontal: 'left' | 'center' | 'right'
  alignVertical: 'top' | 'center' | 'bottom'
  balance: boolean // text wrap balance
  color: string
  backgroundColor: string
}

interface ImageLayerInterface extends LayerInterface {
  type: 'image'
  cornerRadius: number
  src: string
  objectFit: 'fill' | 'contain' | 'cover'
}

interface RectangleLayerInterface extends LayerInterface {
  type: 'rectangle'
  cornerRadius: number
  color: string
}

export type LayerType =
  | TextLayerInterface
  | ImageLayerInterface
  | RectangleLayerInterface

export default function VisualEditor() {
  const [layers, setLayers] = useState<LayerType[]>([
    {
      id: '1',
      type: 'text',
      name: 'Text',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      rotation: 0,
      opacity: 1,
      family: 'Inter',
      size: 16,
      lineHeight: 1.5,
      weight: 'normal',
      alignHorizontal: 'left',
      alignVertical: 'top',
      balance: false,
      color: '#000000',
      backgroundColor: '#ffffff',
    },
    {
      id: '2',
      type: 'image',
      name: 'Image',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      rotation: 0,
      opacity: 1,
      cornerRadius: 0,
      src: 'https://via.placeholder.com/100',
      objectFit: 'cover',
    },
    {
      id: '3',
      type: 'rectangle',
      name: 'Rectangle',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      rotation: 0,
      opacity: 1,
      color: '#000000',
      cornerRadius: 0,
    },
  ])

  const [selectedLayer, setSelectedLayer] = useState<LayerType | undefined>()

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
    <div className="h-full w-full">
      <div className="grid h-full w-full grid-cols-[280px,1fr] grid-rows-[53px,1fr]">
        <div className="col-span-2 flex w-full flex-col items-center justify-start gap-2 rounded-t-lg">
          <div className="flex w-full items-center justify-between border-b px-4 py-2">
            <Link
              href="/generator"
              className="flex items-center justify-center text-muted-foreground"
            >
              <ChevronLeft className="ml-[-4px]" />
              <span className="self-center text-sm font-normal">Exit</span>
            </Link>
            <div className="flex gap-1">
              {/* <span className="text-muted-foreground">Project /</span> */}
              <span className=""> Blog post</span>
            </div>
            <Button size="sm" className="flex gap-2">
              <Save className="h-5 w-5" />
              Save
            </Button>
          </div>
        </div>
        <div className="flex w-full flex-col items-start justify-between rounded-l-lg border-r">
          <div className="flex w-full flex-col items-start justify-start gap-2">
            <div className="flex h-12 w-full items-center justify-between pl-4 pr-2 pt-2">
              <span className="text-lg font-semibold">Layers</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" className="aspect-square w-10 p-0">
                      <Plus className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span className="font-medium">Add new layer</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {/* Layers */}
            <DndContext
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext
                items={layers}
                strategy={verticalListSortingStrategy}
              >
                <ScrollArea className="flex h-60 w-full flex-col gap-0 px-2">
                  {layers.map((layer, index) => (
                    <Layer
                      key={layer.id}
                      layer={layer}
                      selected={layer.id === selectedLayer?.id}
                      setSelectedLayer={setSelectedLayer}
                    />
                  ))}
                </ScrollArea>
              </SortableContext>
            </DndContext>
          </div>
          <Separator />
          <div className="flex h-full w-full flex-col items-start justify-start gap-2 p-4">
            <span className="h-8 text-lg font-semibold">Properties</span>
            <div className="grid w-full grid-cols-2 items-center gap-2">
              <TooltipProvider>
                <Input
                  type="number"
                  id="x"
                  leftLabel={
                    <Label
                      htmlFor="x"
                      className="w-4 text-center text-muted-foreground"
                    >
                      X
                    </Label>
                  }
                  className="pl-10"
                />
                <Input
                  type="number"
                  id="y"
                  leftLabel={
                    <Label
                      htmlFor="y"
                      className="w-4 text-center text-muted-foreground"
                    >
                      Y
                    </Label>
                  }
                  className="pl-10"
                />
                <Input
                  type="number"
                  id="width"
                  leftLabel={
                    <Label
                      htmlFor="width"
                      className="w-4 text-center text-muted-foreground"
                    >
                      W
                    </Label>
                  }
                  className="pl-10"
                />
                <Input
                  type="number"
                  id="height"
                  leftLabel={
                    <Label
                      htmlFor="height"
                      className="w-4 text-center text-muted-foreground"
                    >
                      H
                    </Label>
                  }
                  className="pl-10"
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Input
                      type="number"
                      id="rotation"
                      leftLabel={
                        <Label
                          htmlFor="rotation"
                          className="w-4 text-center text-muted-foreground"
                        >
                          <RotateCw className="h-4 w-4" />
                        </Label>
                      }
                      className="pl-10"
                    />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <span className="font-medium">Rotation</span>
                  </TooltipContent>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Input
                        type="number"
                        id="opacity"
                        leftLabel={
                          <Label
                            htmlFor="opacity"
                            className="w-4 text-center text-muted-foreground"
                          >
                            <BlendIcon className="h-4 w-4" />
                          </Label>
                        }
                        className="pl-10"
                      />
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <span className="font-medium">Opacity</span>
                    </TooltipContent>
                  </Tooltip>
                </Tooltip>
                {selectedLayer?.type !== 'text' && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Input
                        type="number"
                        id="corner-radius"
                        leftLabel={
                          <Label
                            htmlFor="corner-radius"
                            className="w-4 text-center text-muted-foreground"
                          >
                            <Spline className="h-4 w-4" />
                          </Label>
                        }
                        className="pl-10"
                      />
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <span className="font-medium">Corner radius</span>
                    </TooltipContent>
                  </Tooltip>
                )}
              </TooltipProvider>
            </div>
            {/* {selectedLayer?.type === 'image' && (
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  console.log('Files: ', res)
                }}
                onUploadError={(error: Error) => {
                  console.log(`ERROR! ${error.message}`)
                }}
              />
            )} */}
          </div>
          <Separator />
          <div className="flex h-fit w-full flex-col items-start justify-start gap-2 p-4">
            <span className="h-8 text-lg font-semibold">Background</span>
            <div className="grid w-full grid-cols-2 items-center gap-2">
              <Input
                type="color"
                id="background-color"
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
        <div className="flex w-full flex-col items-center justify-center gap-2 rounded-tr-lg">
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-20">
            {/* <div className="flex h-12 w-full items-center justify-center pl-4 pr-2 pt-2">
              <span className="text-lg font-semibold">Preview</span>
            </div> */}
            {/* Mock image */}
            <div className="aspect-[1.9/1] w-full bg-primary/20"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Layer = ({
  layer,
  selected,
  setSelectedLayer,
}: {
  layer: LayerType
  selected: boolean
  setSelectedLayer: (layer: LayerType) => void
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
      onClick={() => setSelectedLayer(layer)}
      className={`${
        isDragging
          ? 'border-ring'
          : selected
            ? 'border-background hover:border-background'
            : 'border-background hover:border-ring'
      } ${
        selected ? 'bg-accent' : 'bg-background'
      } flex cursor-pointer items-center justify-between gap-2 rounded-sm border-2 p-1.5`}
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
      <Button
        {...attributes}
        {...listeners}
        variant="ghost"
        className={`${
          isDragging ? 'cursor-grabbing ' : 'cursor-grab'
        } aspect-square h-8 p-0`}
      >
        <GripHorizontal className="h-4 w-4" />
      </Button>
    </div>
  )
}
