'use client'

import { LayerType } from '@/app/(editor)/[project]/templates/[templateId]/edit/types'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/ui/components/Dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/ui/components/Tooltip'
import { Image, Square, Type } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function NewLayerDialog({
  trigger,
  layers,
  setLayers,
  setSelectedLayer,
}: {
  trigger: React.ReactNode
  layers: LayerType[]
  setLayers: Dispatch<SetStateAction<LayerType[]>>
  setSelectedLayer: Dispatch<SetStateAction<LayerType | undefined>>
}) {
  //number of layers that start with Text
  const textNameLayers = layers.filter(
    (layer) => layer.name.startsWith('Text') && layer.type === 'text'
  ).length
  const imageLayers = layers.filter(
    (layer) => layer.name.startsWith('Image') && layer.type === 'image'
  ).length
  const rectangleLayers = layers.filter(
    (layer) => layer.name.startsWith('Rectangle') && layer.type === 'rectangle'
  ).length

  const newTextLayer = {
    id: uuidv4(),
    type: 'text',
    name: `Text${textNameLayers + 1 !== 1 ? ` ${textNameLayers + 1}` : ''}`,
    width: 200,
    height: 100,
    x: 500,
    y: 265,
    rotation: 0,
    opacity: 1,
    family: 'Inter Regular',
    size: 48,
    lineHeight: 1,
    alignHorizontal: 'center',
    alignVertical: 'center',
    color: '#000000',
    conditionalVisibility: false,
    conditionalValue: false,
    value: 'Text',
  } as LayerType

  const newImageLayer = {
    id: uuidv4(),
    type: 'image',
    name: `Image${imageLayers + 1 !== 1 ? ` ${imageLayers + 1}` : ''}`,
    width: 100,
    height: 100,
    x: 550,
    y: 265,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    objectFit: 'contain',
    conditionalVisibility: false,
    conditionalValue: false,
    src: '',
  } as LayerType

  const newRectangleLayer = {
    id: uuidv4(),
    type: 'rectangle',
    name: `Rectangle${rectangleLayers + 1 !== 1 ? ` ${rectangleLayers + 1}` : ''}`,
    width: 200,
    height: 100,
    x: 500,
    y: 265,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    color: '#000000',
    conditionalVisibility: false,
    conditionalValue: false,
  } as LayerType

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <span className="font-medium">Add new layer</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="flex flex-col gap-4 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New layer</DialogTitle>
        </DialogHeader>
        <div className="flex justify-between gap-4">
          <DialogClose asChild>
            <button
              className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md bg-accent outline-primary ring-primary transition-all duration-100 hover:ring"
              onClick={() => {
                setLayers([newTextLayer, ...layers])
                setSelectedLayer(newTextLayer)
              }}
            >
              <Type className="h-7 w-7 stroke-foreground" />
              <span className="select-none">Text</span>
            </button>
          </DialogClose>
          <DialogClose asChild>
            <button
              className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md bg-accent outline-primary ring-primary transition-all duration-100 hover:ring"
              onClick={() => {
                setLayers([newImageLayer, ...layers])
                setSelectedLayer(newImageLayer)
              }}
            >
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image className="h-7 w-7 stroke-foreground" />
              <span className="select-none">Image</span>
            </button>
          </DialogClose>
          <DialogClose asChild>
            <button
              className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md bg-accent outline-primary ring-primary transition-all duration-100 hover:ring"
              onClick={() => {
                setLayers([newRectangleLayer, ...layers])
                setSelectedLayer(newRectangleLayer)
              }}
            >
              <Square className="h-7 w-7 stroke-foreground" />
              <span className="select-none">Rectangle</span>
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
