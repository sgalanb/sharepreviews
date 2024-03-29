'use client'

import { LayerType } from '@/app/(editor)/[project]/templates/[templateId]/edit/page'
import { Button } from '@/app/ui/components/Button'
import { Minus, Plus } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import satori from 'satori'

export default function VisualEditorPreview({
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
  const [preview, setPreview] = useState<string>()

  const generatePreview = async () => {
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
                tw="flex"
                style={{
                  justifyContent: layer.alignHorizontal,
                  alignItems: layer.alignVertical,
                  position: 'absolute',
                  left: layer.x,
                  top: layer.y,
                  width: layer.width,
                  height: layer.height,
                  transform: `rotate(${layer.rotation}deg)`,
                  opacity: layer.opacity,
                }}
              >
                <p
                  style={{
                    fontFamily: layer.family.replace(/-/g, ' '),
                    fontWeight: 800,
                    fontSize: layer.size,
                    lineHeight: layer.lineHeight,
                    color: layer.color,
                  }}
                >
                  {layer.conditionalValue ? layer.exampleValue : layer.value}
                </p>
              </div>
            )
          }
          if (
            layer.type === 'image' &&
            ((layer.conditionalValue && layer.exampleSrc) ||
              (!layer.conditionalValue && layer.src))
          ) {
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={layer.id}
                alt=""
                src={layer.conditionalValue ? layer.exampleSrc : layer.src}
                width={layer.width}
                height={layer.height}
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
            name: 'Inter Thin',
            data: await fetch(
              new URL('/assets/inter-thin.otf', import.meta.url)
            ).then((res) => res.arrayBuffer() as any),
            weight: 100,
            style: 'normal',
          },
          {
            name: 'Inter Extra Light',
            data: await fetch(
              new URL('/assets/inter-extra-light.otf', import.meta.url)
            ).then((res) => res.arrayBuffer() as any),
            weight: 200,
            style: 'normal',
          },
          {
            name: 'Inter Light',
            data: await fetch(
              new URL('/assets/inter-light.otf', import.meta.url)
            ).then((res) => res.arrayBuffer() as any),
            weight: 300,
            style: 'normal',
          },
          {
            name: 'Inter Regular',
            data: await fetch(
              new URL('/assets/inter-regular.otf', import.meta.url)
            ).then((res) => res.arrayBuffer() as any),
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Inter Medium',
            data: await fetch(
              new URL('/assets/inter-medium.otf', import.meta.url)
            ).then((res) => res.arrayBuffer() as any),
            weight: 500,
            style: 'normal',
          },
          {
            name: 'Inter Semi Bold',
            data: await fetch(
              new URL('/assets/inter-semi-bold.otf', import.meta.url)
            ).then((res) => res.arrayBuffer() as any),
            weight: 600,
            style: 'normal',
          },
          {
            name: 'Inter Bold',
            data: await fetch(
              new URL('/assets/inter-bold.otf', import.meta.url)
            ).then((res) => res.arrayBuffer() as any),
            weight: 700,
            style: 'normal',
          },
          {
            name: 'Inter Extra Bold',
            data: await fetch(
              new URL('/assets/inter-extra-bold.otf', import.meta.url)
            ).then((res) => res.arrayBuffer() as any),
            weight: 800,
            style: 'normal',
          },
          {
            name: 'Inter Black',
            data: await fetch(
              new URL('/assets/inter-black.otf', import.meta.url)
            ).then((res) => res.arrayBuffer() as any),
            weight: 900,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layers, canvasBackgroundColor])

  // Canvas zoom and pan
  const [scale, setScale] = useState(1) // For zoom levels
  const minScale = 1
  const maxScale = 5
  const [origin, setOrigin] = useState({ x: 0, y: 0 }) // For pan origin
  const parentDivRef = useRef<any>(null)

  const [isGrabbing, setIsGrabbing] = useState(false)

  const clamp = (value: any, min: any, max: any) => {
    return Math.min(Math.max(value, min), max)
  }

  const adjustOriginForScale = (newScale: number) => {
    const parentWidth = parentDivRef.current.offsetWidth
    const parentHeight = parentDivRef.current.offsetHeight
    const childWidth = parentDivRef.current.firstChild.offsetWidth
    const childHeight = parentDivRef.current.firstChild.offsetHeight

    // Calculate new boundaries based on the scaled dimensions
    const scaledWidth = childWidth * newScale
    const scaledHeight = childHeight * newScale

    // Calculate the maximum offsets allowed to keep the scaled content within the parent's bounds
    let maxX = Math.max(0, (scaledWidth - parentWidth) / 2 / newScale)
    let maxY = Math.max(0, (scaledHeight - parentHeight) / 2 / newScale)

    // Dynamically adjust origin based on scale change, maintaining content within bounds
    const newX = clamp(origin.x, -maxX, maxX)
    const newY = clamp(origin.y, -maxY, maxY)

    return { x: newX, y: newY }
  }

  const handleWheel = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const scaleAdjustment = e.deltaY > 0 ? 0.9 : 1.1
    let newScale = scale * scaleAdjustment
    newScale = clamp(newScale, minScale, maxScale)

    setScale(newScale)

    // Adjust origin based on the new scale
    const adjustedOrigin = adjustOriginForScale(newScale)
    setOrigin(adjustedOrigin)
  }

  const handleManualZoom = (newScale: number) => {
    const newScaleNumber = clamp(newScale, minScale, maxScale)

    setScale(newScaleNumber)

    // Adjust origin based on the new scale
    const adjustedOrigin = adjustOriginForScale(newScale)
    setOrigin(adjustedOrigin)
  }

  const handleMouseDown = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    setIsGrabbing(true)
    const startX = e.pageX - origin.x
    const startY = e.pageY - origin.y
    const parentWidth = parentDivRef.current.offsetWidth
    const parentHeight = parentDivRef.current.offsetHeight

    function onMouseMove(e: any) {
      e.preventDefault()
      let newX = e.pageX - startX
      let newY = e.pageY - startY

      // Adjust boundaries based on the scaled size of the child
      const scaledWidth = parentDivRef.current.firstChild.offsetWidth * scale
      const scaledHeight = parentDivRef.current.firstChild.offsetHeight * scale

      // Calculate the effective boundaries considering the scale
      const maxX = Math.max(0, (scaledWidth - parentWidth) / 2 / scale)
      const maxY = Math.max(0, (scaledHeight - parentHeight) / 2 / scale)

      // Apply boundary checks for both X and Y coordinates
      newX = Math.min(Math.max(newX, -maxX), maxX)
      newY = Math.min(Math.max(newY, -maxY), maxY)

      // Update origin within adjusted boundaries
      setOrigin({
        x: newX,
        y: newY,
      })
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      setIsGrabbing(false)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  return (
    <div
      ref={parentDivRef}
      className="relative my-[1px] flex w-full flex-col items-center justify-center gap-2 overflow-hidden border-y"
      onClick={() => {
        selectedLayer && setSelectedLayer(undefined)
      }}
    >
      <div
        className={`${scale == 1 ? '' : isGrabbing ? 'cursor-grabbing' : 'cursor-grab'} relative order-none flex h-full w-full items-center justify-center overflow-hidden bg-neutral-100`}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        style={{
          transform: `scale(${scale}) translate(${origin.x}px, ${origin.y}px)`,
        }}
      >
        <div
          dangerouslySetInnerHTML={{ __html: preview || '' }}
          className="absolute flex h-full max-h-[315px] w-full max-w-[600px] items-center justify-center"
        />
      </div>
      <div className="absolute bottom-4 right-4 z-50 flex items-center justify-center gap-2 rounded-md bg-secondary text-secondary-foreground">
        <Button
          variant="secondary"
          className="px-3 hover:bg-neutral-300"
          onClick={(e) => {
            e.stopPropagation()
            handleManualZoom(scale - 0.25)
          }}
        >
          <Minus className="h-6 w-6" />
        </Button>
        <span>{scale.toFixed(2)}x</span>
        <Button
          variant="secondary"
          className="px-3 hover:bg-neutral-300"
          onClick={(e) => {
            e.stopPropagation()
            handleManualZoom(scale + 0.25)
          }}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
