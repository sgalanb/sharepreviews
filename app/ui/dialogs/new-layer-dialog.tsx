'use client'

import {
  ImageLayerType,
  ShapeLayerType,
  TextLayerType,
} from '@/app/lib/reflect/datamodel/layers'
import { M } from '@/app/lib/reflect/datamodel/mutators'
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
import type { Reflect } from '@rocicorp/reflect/client'
import { Image, Square, Type } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

export default function NewLayerDialog({
  trigger,
  reflect,
}: {
  trigger: React.ReactNode
  reflect: Reflect<M>
}) {
  // TODO: Get the number of layers from reflect
  const textLayers = 999
  const imageLayers = 999
  const rectangleLayers = 999

  const newTextLayer: TextLayerType = {
    id: uuidv4(),
    name: `Text ${textLayers + 1}`,
    type: 'text',
    positionX: 400,
    positionY: 215,
    positionZ: 9999,
    width: 400,
    height: 200,
    rotation: 0,
    opacity: 1,
    textValue: 'Text',
    color: '#F3F3F3',
    lineClamp: 1,
    fontFamily: 'Geist',
    fontWeight: 400,
    fontUrl:
      'https://utfs.io/f/7b7c064b-76b8-4cce-ab60-262ba59ed706-5ho58b.otf',
    size: 64,
    lineHeight: 76,
    alignHorizontal: 'center',
    alignVertical: 'middle',
  }

  const newImageLayer: ImageLayerType = {
    id: uuidv4(),
    name: `Image ${imageLayers + 1}`,
    type: 'image',
    positionX: 400,
    positionY: 215,
    positionZ: 9999,
    width: 400,
    height: 200,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    objectFit: 'cover',
    imageValue: {
      type: 'static',
      value: '',
    },
  }

  const newShapeLayer: ShapeLayerType = {
    id: uuidv4(),
    name: `Shape ${rectangleLayers + 1}`,
    type: 'shape',
    positionX: 500,
    positionY: 215,
    positionZ: 9999,
    width: 200,
    height: 200,
    rotation: 0,
    opacity: 1,
    cornerRadius: 0,
    color: '#F3F3F3',
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
                reflect.mutate.setLayer(newTextLayer)
                reflect.mutate.selectLayer(newTextLayer.id)
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
                reflect.mutate.setLayer(newImageLayer)
                reflect.mutate.selectLayer(newImageLayer.id)
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
                reflect.mutate.setLayer(newShapeLayer)
                reflect.mutate.selectLayer(newShapeLayer.id)
              }}
            >
              <Square className="h-7 w-7 stroke-foreground" />
              <span className="select-none">Shape</span>
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
