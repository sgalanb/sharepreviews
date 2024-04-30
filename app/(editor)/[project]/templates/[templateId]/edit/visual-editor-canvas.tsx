'use client'

import { LayerType } from '@/app/(editor)/[project]/templates/[templateId]/edit/page'
import { Button } from '@/app/ui/components/Button'
import { convertOpacityToHex } from '@/app/utils'
import { Minus, Plus } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

export default function VisualEditorCanvas({
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
  floatingLabelTwitter,
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
  floatingLabelTwitter: boolean
}) {
  const parentDivRef = useRef<any>(null)

  const [origin, setOrigin] = useState({ x: 0, y: 0 })

  // CANVAS ZOOMING
  const minZoomScale = 1
  const maxZoomScale = 5
  const [zoomScale, setZoomScale] = useState(1)

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

  // Clamp function to limit the scale within the min and max values
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

  const handleCanvasWheelZoom = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    let newZoomScale = zoomScale + (e.deltaY > 0 ? -1 : 1)
    newZoomScale = clamp(newZoomScale, minZoomScale, maxZoomScale)

    setZoomScale(newZoomScale)

    // Adjust origin based on the new scale
    const adjustedOrigin = adjustOriginForScale(newZoomScale)
    setOrigin(adjustedOrigin)
  }

  const handleCanvasManualZoomButtons = (
    oldZoomScale: number,
    positive: boolean
  ) => {
    const newZoomScale = clamp(
      positive ? oldZoomScale + 1 : oldZoomScale - 1,
      minZoomScale,
      maxZoomScale
    )

    setZoomScale(newZoomScale)

    // Adjust origin based on the new scale
    const adjustedOrigin = adjustOriginForScale(newZoomScale)
    setOrigin(adjustedOrigin)
  }

  // CANVAS PANNING
  const [isGrabbingCanvas, setIsGrabbingCanvas] = useState<boolean>(false)

  const handleCanvasMousePanning = (e: any) => {
    // Check if the middle mouse button is pressed or the space key is pressed
    if (e.button !== 1 && !spacePressed) {
      // If not, do nothing
      return
    }

    e.preventDefault()
    e.stopPropagation()
    setIsGrabbingCanvas(true)
    const startX = e.pageX - origin.x
    const startY = e.pageY - origin.y
    const parentWidth = parentDivRef.current.offsetWidth
    const parentHeight = parentDivRef.current.offsetHeight

    function onMouseMove(e: any) {
      e.preventDefault()
      let newX = e.pageX - startX
      let newY = e.pageY - startY

      // Adjust boundaries based on the scaled size of the child
      const scaledWidth =
        parentDivRef.current.firstChild.offsetWidth * zoomScale
      const scaledHeight =
        parentDivRef.current.firstChild.offsetHeight * zoomScale

      // Calculate the effective boundaries considering the scale
      const maxX = Math.max(0, (scaledWidth - parentWidth) / 2 / zoomScale)
      const maxY = Math.max(0, (scaledHeight - parentHeight) / 2 / zoomScale)

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
      setIsGrabbingCanvas(false)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  // LAYER TRANSFORMATIONS
  const handleLayerMouseDown = (
    e: React.MouseEvent,
    selectedLayer: LayerType
  ) => {
    // Check if left mouse button is pressed
    if (e.button !== 0) {
      if (e.button === 1) {
        // Middle mouse button
        setIsGrabbingCanvas(true)
        handleCanvasMousePanning(e)
        return
      } else {
        return
      }
    }

    // This executes once when the mouse is down
    const startMouseX = e.clientX
    const startMouseY = e.clientY

    const startSingleLayerX = selectedLayer.x
    const startSingleLayerY = selectedLayer.y

    const multipleLayersStartPositions = new Map()
    multiSelectedLayers.forEach((layer) => {
      multipleLayersStartPositions.set(layer.id, { x: layer.x, y: layer.y })
    })

    function onMouseMove(e: MouseEvent) {
      // This executes on every mouse move while the mouse is down
      const diffMouseX = e.clientX - startMouseX
      const diffMouseY = e.clientY - startMouseY

      if (
        multiSelectedLayers.length < 2 ||
        !multiSelectedLayers.some((layer) => layer.id === selectedLayer.id)
      ) {
        // Move one layer
        setLayers((prevLayers) =>
          prevLayers.map((layer) => {
            if (layer.id === selectedLayer.id) {
              return {
                ...layer,
                x: Math.round(startSingleLayerX + (diffMouseX * 2) / zoomScale),
                y: Math.round(startSingleLayerY + (diffMouseY * 2) / zoomScale),
              }
            }
            return layer
          })
        )
      } else {
        // Move multiple layers
        setLayers((prevLayers) =>
          prevLayers.map((layer) => {
            if (
              multiSelectedLayers.find((findLayer) => findLayer.id === layer.id)
            ) {
              const startPos = multipleLayersStartPositions.get(layer.id)

              return {
                ...layer,
                x: Math.round(startPos.x + (diffMouseX * 2) / zoomScale),
                y: Math.round(startPos.y + (diffMouseY * 2) / zoomScale),
              }
            }
            return layer
          })
        )
      }
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  // Load all fonts used in the text layers
  useEffect(() => {
    const style = document.createElement('style')

    const usedFonts = layers
      .filter((layer) => layer.type === 'text')
      .map((layer) => {
        if (layer.type === 'text') {
          return { fontName: layer.fontName, fontUrl: layer.fontUrl }
        }
      })
    // Remove duplicates
    const uniqueFonts = [...new Set(usedFonts)]

    style.innerHTML = `
        ${uniqueFonts
          .map(
            (font) => `
          @font-face {
            font-family: '${font?.fontName}';
            src: url('${font?.fontUrl}') format('truetype');
          }
        `
          )
          .join('')}
      `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [layers])

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
        className={`${isGrabbingCanvas ? 'cursor-grabbing' : spacePressed ? 'cursor-grab' : 'cursor-default'} relative order-none flex h-full w-full items-center justify-center overflow-hidden bg-neutral-100`}
        onWheel={handleCanvasWheelZoom}
        onMouseDown={handleCanvasMousePanning}
        style={{
          transform: `scale(${zoomScale}) translate(${origin.x}px, ${origin.y}px)`,
        }}
      >
        <div
          className={`${floatingLabelTwitter ? 'rounded-[32px] border border-[#cfd9de]' : ''} absolute h-[630px] w-[1200px] scale-50 overflow-hidden`}
        >
          {floatingLabelTwitter && (
            <div className="absolute bottom-6 left-6 right-6 z-50 line-clamp-1 w-fit">
              <div className="flex h-10 items-center justify-center self-start rounded-[8px] bg-black/30 px-2">
                <span className="line-clamp-1 break-words break-all text-left text-[30px] font-normal leading-8 text-white">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  nec odio ut mi ultricies vehicula. Nullam quis ante.
                </span>
              </div>
            </div>
          )}

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
                    onMouseDown={(e) => {
                      e.stopPropagation()
                      handleLayerMouseDown(e, layer)
                    }}
                    style={{
                      position: 'absolute',
                      justifyContent: layer.alignHorizontal,
                      alignItems: layer.alignVertical,
                      left: layer.x,
                      top: layer.y,
                      ...(layer.widthType === 'fixed'
                        ? { width: layer.width }
                        : { textOverflow: 'ellipsis', whiteSpace: 'nowrap' }),
                      height: layer.height,
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
                      className="line-clamp-1"
                      style={{
                        wordBreak: 'break-word',
                        fontFamily: layer.fontName,
                        fontWeight: layer.fontWeight,
                        fontSize: layer.size,
                        lineHeight: layer.lineHeight,
                        color: layer.color,
                        opacity: layer.opacity,
                        WebkitLineClamp: layer.lineClamp,
                        textAlign:
                          layer.alignHorizontal === 'center'
                            ? 'center'
                            : layer.alignHorizontal === 'flex-end'
                              ? 'right'
                              : 'left',
                        verticalAlign:
                          layer.alignVertical === 'center'
                            ? 'middle'
                            : layer.alignVertical === 'flex-end'
                              ? 'bottom'
                              : 'top',
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
                    onMouseDown={(e) => {
                      e.stopPropagation()
                      handleLayerMouseDown(e, layer)
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
                          className="pointer-events-none flex items-center justify-center"
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
                    onMouseDown={(e) => {
                      e.stopPropagation()
                      handleLayerMouseDown(e, layer)
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
            handleCanvasManualZoomButtons(zoomScale, false)
          }}
        >
          <Minus className="h-6 w-6" />
        </Button>
        <span className="select-none">{zoomScale.toFixed(2)}x</span>
        <Button
          variant="outline"
          className="border-none px-3"
          onClick={(e) => {
            e.stopPropagation()
            e.currentTarget.blur()
            handleCanvasManualZoomButtons(zoomScale, true)
          }}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
