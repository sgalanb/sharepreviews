'use client'

import { LayerType } from '@/app/(editor)/[project]/templates/[templateId]/edit/page'
import { Button } from '@/app/ui/components/Button'
import { convertOpacityToHex } from '@/app/utils'
import { Minus, Plus } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

export default function VisualEditorPreview({
  layers,
  setLayers,
  selectedLayer,
  setSelectedLayer,
  multiSelectedLayers,
  setMultiSelectedLayers,
  canvasBackgroundColor,
  setCanvasBackgroundColor,
  spacePressed,
  shiftPressed,
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
  spacePressed: boolean
  shiftPressed: boolean
  handleOnLayerClick: (layer: LayerType) => void
}) {
  // Canvas settings
  const minScale = 1
  const maxScale = 5
  const [scale, setScale] = useState(1) // For zoom levels
  const [origin, setOrigin] = useState({ x: 0, y: 0 }) // For pan origin
  const [isGrabbing, setIsGrabbing] = useState<boolean>(false)

  const parentDivRef = useRef<any>(null)

  // Clamp function to limit the scale within the min and max values
  const clamp = (value: any, min: any, max: any) => {
    return Math.min(Math.max(value, min), max)
  }

  // Prevent default zoom behavior
  useEffect(() => {
    const handleWheel = (event: any) => {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault()
      }
    }

    document.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      document.removeEventListener('wheel', handleWheel)
    }
  }, [])

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
    // Check if the middle mouse button is pressed or the space key is pressed
    if (e.button !== 1 && !spacePressed) {
      // If not, do nothing
      return
    }

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
      className="relative flex w-full flex-col items-center justify-center gap-2 overflow-hidden"
      onClick={() => {
        selectedLayer && setSelectedLayer(undefined)
        multiSelectedLayers.length > 0 && setMultiSelectedLayers([])
      }}
    >
      <div
        className={`${isGrabbing ? 'cursor-grabbing' : spacePressed ? 'cursor-grab' : 'cursor-default'} relative order-none flex h-full w-full items-center justify-center overflow-hidden bg-neutral-100`}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        style={{
          transform: `scale(${scale}) translate(${origin.x}px, ${origin.y}px)`,
        }}
      >
        <div className="absolute h-[630px] w-[1200px] scale-50">
          <div
            className="flex h-full w-full"
            style={{ backgroundColor: canvasBackgroundColor }}
          >
            {/* This is replicated with satori on og generation*/}
            {layers.toReversed().map((layer) => {
              if (layer.type === 'text') {
                return (
                  <div
                    key={layer.id}
                    className={`${
                      layer.id === selectedLayer?.id ||
                      multiSelectedLayers.find((l) => l.id === layer.id)
                        ? 'ring-[3px] ring-sky-600'
                        : 'hover:ring-4 hover:ring-sky-600'
                    } flex select-none`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleOnLayerClick(layer)
                    }}
                    style={{
                      position: 'absolute',
                      justifyContent: layer.alignHorizontal,
                      alignItems: layer.alignVertical,
                      left: layer.x,
                      top: layer.y,
                      width:
                        layer.widthType === 'fixed'
                          ? layer.width
                          : 'fit-content',
                      height:
                        layer.heightType === 'fixed'
                          ? layer.height
                          : 'fit-content',
                      wordBreak: 'break-all',
                      overflow: 'hidden',
                      transform: `rotate(${layer.rotation}deg)`,
                      // Background styles
                      backgroundColor: layer.background
                        ? `${layer.bgColor}${convertOpacityToHex(layer.bgOpacity)}`
                        : 'transparent',
                      paddingLeft: layer.bgPaddingX ? layer.bgPaddingX : 0,
                      paddingRight: layer.bgPaddingX ? layer.bgPaddingX : 0,
                      paddingTop: layer.bgPaddingY ? layer.bgPaddingY : 0,
                      paddingBottom: layer.bgPaddingY ? layer.bgPaddingY : 0,
                      borderRadius: layer.bgCornerRadius,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: '__Inter_aaf875',
                        fontWeight: layer.family.endsWith('thin')
                          ? 100
                          : layer.family.endsWith('extra-light')
                            ? 200
                            : layer.family.endsWith('light')
                              ? 300
                              : layer.family.endsWith('regular')
                                ? 400
                                : layer.family.endsWith('medium')
                                  ? 500
                                  : layer.family.endsWith('semi-bold')
                                    ? 600
                                    : layer.family.endsWith('extra-bold')
                                      ? 800
                                      : layer.family.endsWith('bold')
                                        ? 700
                                        : 900,
                        fontSize: layer.size,
                        lineHeight: layer.lineHeight,
                        color: layer.color,
                        opacity: layer.opacity,
                      }}
                    >
                      {layer.conditionalValue
                        ? layer.exampleValue
                        : layer.value}
                    </div>
                  </div>
                )
              }
              if (layer.type === 'image') {
                return (
                  <div
                    key={layer.id}
                    className={`${
                      layer.id === selectedLayer?.id ||
                      multiSelectedLayers.find((l) => l.id === layer.id)
                        ? 'ring-[3px] ring-sky-600'
                        : 'hover:ring-4 hover:ring-sky-600'
                    } select-none`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleOnLayerClick(layer)
                    }}
                    style={{
                      position: 'absolute',
                      left: layer.x,
                      top: layer.y,
                      transform: `rotate(${layer.rotation}deg)`,
                      // Shared styles between parent and child
                      width: layer.width,
                      height: layer.height,
                      borderRadius: layer.cornerRadius,
                    }}
                  >
                    {((layer.conditionalValue && layer.exampleSrc) ||
                      (!layer.conditionalValue && layer.src)) && (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          alt=""
                          src={
                            layer.conditionalValue
                              ? layer.exampleSrc
                              : layer.src
                          }
                          width={layer.width}
                          height={layer.height}
                          className="flex items-center justify-center"
                          style={{
                            // Shared styles between parent and child
                            width: layer.width,
                            height: layer.height,
                            borderRadius: layer.cornerRadius,
                            // Independent (from the parent div) styles
                            opacity: layer.opacity,
                            objectFit: layer.objectFit,
                          }}
                        />
                      </>
                    )}
                  </div>
                )
              }
              if (layer.type === 'rectangle') {
                return (
                  <div
                    key={layer.id}
                    className={`${
                      layer.id === selectedLayer?.id ||
                      multiSelectedLayers.find((l) => l.id === layer.id)
                        ? 'ring-[3px] ring-sky-600'
                        : 'hover:ring-4 hover:ring-sky-600'
                    } select-none`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleOnLayerClick(layer)
                    }}
                    style={{
                      position: 'absolute',
                      left: layer.x,
                      top: layer.y,
                      transform: `rotate(${layer.rotation}deg)`,
                      // Shared styles between parent and child
                      width: layer.width,
                      height: layer.height,
                      borderRadius: layer.cornerRadius,
                    }}
                  >
                    <div
                      className="flex items-center justify-center"
                      style={{
                        // Shared styles between parent and child
                        width: layer.width,
                        height: layer.height,
                        borderRadius: layer.cornerRadius,
                        // Independent (from the parent div) styles
                        opacity: layer.opacity,
                        backgroundColor: layer.color,
                      }}
                    />
                  </div>
                )
              }
            })}
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 z-50 flex items-center justify-center gap-2 rounded-lg border bg-white dark:bg-neutral-900  ">
        <Button
          variant="outline"
          className="border-none px-3"
          onClick={(e) => {
            e.stopPropagation()
            e.currentTarget.blur()
            handleManualZoom(scale - 0.25)
          }}
        >
          <Minus className="h-6 w-6" />
        </Button>
        <span className="select-none">{scale.toFixed(2)}x</span>
        <Button
          variant="outline"
          className="border-none px-3"
          onClick={(e) => {
            e.stopPropagation()
            e.currentTarget.blur()
            handleManualZoom(scale + 0.25)
          }}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
