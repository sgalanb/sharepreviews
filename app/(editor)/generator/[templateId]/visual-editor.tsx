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
import { useEffect, useState } from 'react'
import satori from 'satori'

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
  value: string
  family: string
  size: number
  lineHeight: number
  weight: string
  alignHorizontal: 'left' | 'center' | 'right'
  alignVertical: 'top' | 'center' | 'bottom'
  balance: boolean // text wrap balance
  color: string
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
  const [canvasBackgroundColor, setCanvasBackgroundColor] =
    useState<string>('#ffffff')

  const [layers, setLayers] = useState<LayerType[]>([
    {
      id: '1',
      type: 'text',
      name: 'Text',
      x: 0,
      y: 0,
      width: 200,
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
      value: 'Lets fucking go',
    },
    {
      id: '2',
      type: 'image',
      name: 'Image',
      x: 500,
      y: 150,
      width: 100,
      height: 100,
      rotation: 0,
      opacity: 1,
      cornerRadius: 0,
      src: 'https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/meta-icons/rockstar/favicon-180x180.png',
      objectFit: 'cover',
    },
    {
      id: '3',
      type: 'rectangle',
      name: 'Rectangle',
      x: 1100,
      y: 200,
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

  const [preview, setPreview] = useState<string>()

  async function downloadFont(url: string): Promise<ArrayBuffer> {
    // Use fetch to get the font file from the URL
    const fontData = await fetch(new URL(url, import.meta.url)).then((res) =>
      res.arrayBuffer()
    )
    return fontData
  }

  console.log(layers)

  const generatePreview = async () => {
    const roboto = await downloadFont(
      'https://fonts.cdnfonts.com/s/12165/Roboto-Regular.woff'
    )

    const svg = await satori(
      <div
        tw="flex w-full h-full"
        style={{ backgroundColor: canvasBackgroundColor }}
      >
        {layers.toReversed().map((layer) => {
          if (layer.type === 'text') {
            return (
              <div
                key={layer.id}
                tw="flex items-center justify-center"
                style={{
                  position: 'absolute',
                  left: layer.x,
                  top: layer.y,
                  width: layer.width,
                  height: layer.height,
                  transform: `rotate(${layer.rotation}deg)`,
                  opacity: layer.opacity,
                  fontFamily: layer.family,
                  fontSize: layer.size,
                  lineHeight: layer.lineHeight,
                  fontWeight: layer.weight,
                  textAlign: layer.alignHorizontal,
                  color: layer.color,
                }}
              >
                {layer.value}
              </div>
            )
          }
          if (layer.type === 'image') {
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={layer.id}
                alt=""
                src={layer.src}
                tw="flex items-center justify-center"
                style={{
                  position: 'absolute',
                  left: layer.x,
                  top: layer.y,
                  width: layer.width,
                  height: layer.height,
                  transform: `rotate(${layer.rotation}deg)`,
                  opacity: layer.opacity,
                  borderRadius: layer.cornerRadius,
                  objectFit: layer.objectFit,
                }}
              />
            )
          }
          if (layer.type === 'rectangle') {
            return (
              <div
                key={layer.id}
                tw="flex items-center justify-center"
                style={{
                  position: 'absolute',
                  left: layer.x,
                  top: layer.y,
                  width: layer.width,
                  height: layer.height,
                  transform: `rotate(${layer.rotation}deg)`,
                  opacity: layer.opacity,
                  backgroundColor: layer.color,
                  borderRadius: layer.cornerRadius,
                }}
              ></div>
            )
          }
        })}
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Roboto',
            data: roboto,
            weight: 400,
            style: 'normal',
          },
        ],
        debug: false,
      }
    )
    setPreview(svg)
  }

  useEffect(() => {
    generatePreview()
  }, [layers, canvasBackgroundColor])

  return (
    <div className="grid h-full w-full grid-cols-[280px,1fr,280px] grid-rows-[53px,1fr]">
      {/* HEADER */}
      <div className="col-span-3 flex w-full flex-col items-center justify-start gap-2 rounded-t-lg">
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
      {/* LEFT PANEL */}
      <div
        className="flex w-full flex-col items-start justify-between rounded-l-lg border-r"
        onClick={() => {
          selectedLayer && setSelectedLayer(undefined)
        }}
      >
        {/* LAYERS */}
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
        {/* BACKGROUND */}
        <div className="w-full">
          <Separator />
          <div className="flex h-fit w-full flex-col items-start justify-start gap-2 p-4">
            <span className="h-8 text-lg font-semibold">Background</span>
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
      {/* CANVAS */}
      <div
        className="relative flex w-full flex-col items-center justify-center gap-2 overflow-hidden bg-neutral-100"
        onClick={() => {
          selectedLayer && setSelectedLayer(undefined)
        }}
      >
        {/* <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-20"></div> */}
        <div
          dangerouslySetInnerHTML={{ __html: preview || '' }}
          className="absolute flex h-full max-h-[315px] w-full max-w-[600px] items-center justify-center"
        ></div>
      </div>
      {/* RIGHT PANEL */}
      <div className="flex w-full flex-col items-start justify-between rounded-r-lg border-l">
        {/* PROPERTIES */}
        {selectedLayer && (
          <div
            key={selectedLayer.id} // Force the component to re-render when the selected layer changes
            className="flex h-full w-full flex-col items-start justify-start gap-2 p-4"
          >
            <span className="h-8 text-lg font-semibold">Properties</span>
            <div className="grid w-full grid-cols-2 items-center gap-2">
              <TooltipProvider>
                <Input
                  id="x"
                  type="number"
                  step={
                    1200 - (selectedLayer.x + selectedLayer.width) < 10 ? 1 : 10
                  }
                  min={0}
                  max={1200 - selectedLayer.width}
                  defaultValue={selectedLayer.x}
                  onChange={(e) => {
                    if (e.target.value === '') return
                    setSelectedLayer({
                      ...selectedLayer,
                      x: parseInt(e.target.value),
                    })
                    setLayers(
                      layers.map((layer) =>
                        layer.id === selectedLayer.id
                          ? { ...layer, x: parseInt(e.target.value) }
                          : layer
                      )
                    )
                  }}
                  onBlur={(e) => {
                    if (e.target.value === '') {
                      e.target.value = selectedLayer.x.toString()
                    }
                  }}
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
                  id="y"
                  type="number"
                  step={
                    630 - (selectedLayer.y + selectedLayer.height) < 10 ? 1 : 10
                  }
                  min={0}
                  max={630 - selectedLayer.height}
                  defaultValue={selectedLayer.y}
                  onChange={(e) => {
                    if (e.target.value === '') return
                    setSelectedLayer({
                      ...selectedLayer,
                      y: parseInt(e.target.value),
                    })
                    setLayers(
                      layers.map((layer) =>
                        layer.id === selectedLayer.id
                          ? { ...layer, y: parseInt(e.target.value) }
                          : layer
                      )
                    )
                  }}
                  onBlur={(e) => {
                    if (e.target.value === '') {
                      e.target.value = selectedLayer.y.toString()
                    }
                  }}
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
                  id="width"
                  type="number"
                  step={10}
                  min={1}
                  max={1200}
                  defaultValue={selectedLayer.width}
                  onChange={(e) => {
                    if (e.target.value === '') return
                    setSelectedLayer({
                      ...selectedLayer,
                      width: parseInt(e.target.value),
                    })
                    setLayers(
                      layers.map((layer) =>
                        layer.id === selectedLayer.id
                          ? { ...layer, width: parseInt(e.target.value) }
                          : layer
                      )
                    )
                  }}
                  onBlur={(e) => {
                    if (e.target.value === '') {
                      e.target.value = selectedLayer.width.toString()
                    }
                  }}
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
                  id="height"
                  type="number"
                  step={10}
                  min={1}
                  max={630}
                  defaultValue={selectedLayer.height}
                  onChange={(e) => {
                    if (e.target.value === '') return
                    setSelectedLayer({
                      ...selectedLayer,
                      height: parseInt(e.target.value),
                    })
                    setLayers(
                      layers.map((layer) =>
                        layer.id === selectedLayer.id
                          ? { ...layer, height: parseInt(e.target.value) }
                          : layer
                      )
                    )
                  }}
                  onBlur={(e) => {
                    if (e.target.value === '') {
                      e.target.value = selectedLayer.height.toString()
                    }
                  }}
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
                      id="rotation"
                      type="number"
                      step={1}
                      min={0}
                      max={360}
                      defaultValue={selectedLayer.rotation}
                      onChange={(e) => {
                        if (e.target.value === '') return
                        setSelectedLayer({
                          ...selectedLayer,
                          rotation: parseInt(e.target.value),
                        })
                        setLayers(
                          layers.map((layer) =>
                            layer.id === selectedLayer.id
                              ? { ...layer, rotation: parseInt(e.target.value) }
                              : layer
                          )
                        )
                      }}
                      onBlur={(e) => {
                        if (e.target.value === '') {
                          e.target.value = selectedLayer.rotation.toString()
                        }
                      }}
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
                        id="opacity"
                        type="number"
                        step={0.1}
                        min={0}
                        max={1}
                        defaultValue={selectedLayer.opacity}
                        onChange={(e) => {
                          if (e.target.value === '') return
                          setSelectedLayer({
                            ...selectedLayer,
                            opacity: parseFloat(e.target.value),
                          })
                          setLayers(
                            layers.map((layer) =>
                              layer.id === selectedLayer.id
                                ? {
                                    ...layer,
                                    opacity: parseFloat(e.target.value),
                                  }
                                : layer
                            )
                          )
                        }}
                        onBlur={(e) => {
                          if (e.target.value === '') {
                            e.target.value = selectedLayer.opacity.toString()
                          }
                        }}
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
                        id="corner-radius"
                        type="number"
                        step={1}
                        min={0}
                        max={999}
                        defaultValue={selectedLayer.cornerRadius}
                        onChange={(e) => {
                          if (e.target.value === '') return
                          setSelectedLayer({
                            ...selectedLayer,
                            cornerRadius: parseInt(e.target.value),
                          })
                          setLayers(
                            layers.map((layer) =>
                              layer.id === selectedLayer.id
                                ? {
                                    ...layer,
                                    cornerRadius: parseInt(e.target.value),
                                  }
                                : layer
                            )
                          )
                        }}
                        onBlur={(e) => {
                          if (e.target.value === '') {
                            e.target.value =
                              selectedLayer.cornerRadius.toString()
                          }
                        }}
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
            {selectedLayer?.type !== 'image' && (
              <div className="grid w-full grid-cols-2 items-center gap-2">
                <Input
                  id="color"
                  type="color"
                  defaultValue={selectedLayer.color}
                  onChange={(e) => {
                    if (e.target.value === '') return
                    setSelectedLayer({
                      ...selectedLayer,
                      color: e.target.value,
                    })
                    setLayers(
                      layers.map((layer) =>
                        layer.id === selectedLayer.id
                          ? { ...layer, color: e.target.value }
                          : layer
                      )
                    )
                  }}
                  leftLabel={
                    <Label
                      htmlFor="background-color"
                      className="w-10 text-center text-muted-foreground"
                    >
                      Fill
                    </Label>
                  }
                  className="py-1.5 pl-16"
                />
              </div>
            )}
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
        )}
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
