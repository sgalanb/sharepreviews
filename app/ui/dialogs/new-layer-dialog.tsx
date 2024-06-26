'use client'

import { LayerType } from '@/app/(editor)/[project]/templates/[templateId]/edit/page'
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

  const newTextLayer: LayerType = {
    id: uuidv4(),
    type: 'text',
    name: `Text${textNameLayers + 1 !== 1 ? ` ${textNameLayers + 1}` : ''}`,
    width: 400,
    height: 200,
    x: 500,
    y: 265,
    rotation: 0,
    opacity: 1,
    widthType: 'fit',
    heightType: 'fit',
    lineClamp: 1,
    fontName: 'Roboto_400',
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontUrl:
      'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf',
    size: 48,
    lineHeight: 1.2,
    alignHorizontal: 'flex-start',
    alignVertical: 'flex-start',
    background: false,
    color: '#000000',
    bgColor: '#000000',
    bgOpacity: 1,
    bgPaddingX: 0,
    bgPaddingY: 0,
    bgCornerRadius: 0,
    conditionalVisibility: false,
    conditionalValue: false,
    conditionalValueVariableName: '',
    conditionalVisibilityVariableName: '',
    value: 'Text',
  }

  const newImageLayer: LayerType = {
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
    objectFit: 'cover',
    conditionalVisibility: false,
    conditionalValue: false,
    conditionalValueVariableName: '',
    conditionalVisibilityVariableName: '',
    src: '',
  }
  const newRectangleLayer: LayerType = {
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
    conditionalVisibilityVariableName: '',
  }

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
              className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-md bg-accent outline-primary ring-primary transition-all duration-100 hover:ring"
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
              className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-md bg-accent outline-primary ring-primary transition-all duration-100 hover:ring"
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
              className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-md bg-accent outline-primary ring-primary transition-all duration-100 hover:ring"
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
