'use client'

import { Cursor } from '@/app/lib/reflect/datamodel/Cursor'
import {
  ImageLayerType,
  LayerType,
  ShapeLayerType,
  TextLayerType,
} from '@/app/lib/reflect/datamodel/layers'
import { M } from '@/app/lib/reflect/datamodel/mutators'
import {
  useCollaboratorIDs,
  useCollaboratorStates,
  useLayerByID,
  useLayers,
  useLayersIDs,
  useSelectionState,
  useTemplates,
} from '@/app/lib/reflect/datamodel/subscriptions'
import { TemplateType } from '@/app/lib/reflect/datamodel/template'
import type { Reflect } from '@rocicorp/reflect/client'
import { UndoManager } from '@rocicorp/undo'
import { isHotkey } from 'is-hotkey'
import { ImageIcon } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { DraggableCore, DraggableData, DraggableEvent } from 'react-draggable'

export default function VisualEditorCanvas({
  reflect,
  undoManager,
}: {
  reflect: Reflect<M>
  undoManager: UndoManager
}) {
  const ids = useLayersIDs(reflect)
  const { selectedID, overID } = useSelectionState(reflect)
  const collaboratorIDs = useCollaboratorIDs(reflect)

  const layers = useLayers(reflect)
  const templates = useTemplates(reflect) // Will be only one template

  const ref = useRef<HTMLDivElement | null>(null)
  const [dragging, setDragging] = useState(false)

  const onMouseMove = async ({
    pageX,
    pageY,
  }: {
    pageX: number
    pageY: number
  }) => {
    if (ref && ref.current) {
      reflect.mutate.setCursor({
        x: pageX,
        y: pageY - ref.current.offsetTop,
      })
    }
  }

  const parentDivRef = useRef<any>(null)

  // Load all fonts used in the text layers
  const fontsCSS = React.useMemo(() => {
    const usedFonts = layers
      .filter((layer) => layer.type === 'text')
      .map((layer) => {
        if (layer.type === 'text') {
          return {
            fontFamily: layer.fontFamily,
            fontUrl: layer.fontUrl,
            fontWeight: layer.fontWeight,
          }
        }
      })
    // Remove duplicates
    const uniqueFonts = [...new Set(usedFonts)]

    return `
          ${uniqueFonts
            .map(
              (font) => `
            @font-face {
              font-family: '${font?.fontFamily}';
              src: url('${font?.fontUrl}') format('truetype');
              font-weight: ${font?.fontWeight};
              fallback: block;
            }
          `
            )
            .join('')}
        `
  }, [layers])

  return (
    <DraggableCore
      onStart={() => setDragging(true)}
      onStop={() => setDragging(false)}
    >
      <div
        ref={parentDivRef}
        className="relative flex w-full flex-col items-center justify-center gap-2 overflow-hidden"
        onMouseMove={onMouseMove}
      >
        <div
          className={`relative order-none flex h-full w-full items-center justify-center overflow-hidden bg-neutral-100`}
        >
          <div
            className={`absolute scale-50 overflow-hidden`}
            style={{
              width: templates[0].width,
              height: templates[0].height,
            }}
          >
            <style>{fontsCSS}</style>
            <div className="flex h-full w-full">
              {/* This is replicated with satori */}
              {ids.toReversed().map((layer, index) => (
                <LayerController
                  key={layer}
                  reflect={reflect}
                  undoManager={undoManager}
                  id={layer}
                  selectedID={selectedID}
                  overID={overID}
                  index={index}
                  layersLength={ids.length}
                  templates={templates}
                />
              ))}

              {collaboratorIDs.map((collaboratorID) => (
                <Cursor
                  key={collaboratorID}
                  r={reflect}
                  clientID={collaboratorID}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DraggableCore>
  )
}

function LayerController({
  reflect,
  undoManager,
  id,
  selectedID,
  overID,
  index,
  layersLength,
  templates,
}: {
  reflect: Reflect<M>
  undoManager: UndoManager
  id: string
  selectedID: string
  overID: string
  index: number
  layersLength: number
  templates: TemplateType[]
}) {
  const layer = useLayerByID(reflect, id)
  const isBackgroundLayer = index === layersLength

  const collaboratorIDs = useCollaboratorIDs(reflect)
  const collaboratorStates = useCollaboratorStates(reflect, collaboratorIDs)

  const isSelected =
    selectedID === id ||
    collaboratorStates.some((state) => state?.selectedID === id)
  const selectionColor = collaboratorStates.find(
    (state) => state?.selectedID === id
  )?.userInfo.color

  if (!layer) {
    return null
  }

  const onMouseEnter = async () => reflect.mutate.overLayer(id)
  const onMouseLeave = async () => reflect.mutate.overLayer('')

  const onDragStart = (_e: DraggableEvent, _d: DraggableData) => {
    // Can't mark onDragStart async because it changes return type and onDragStart
    // must return void.
    const blech = async () => {
      reflect.mutate.selectLayer(id)
    }
    blech()
  }
  const onDrag = (_e: DraggableEvent, d: DraggableData) => {
    reflect.mutate.setLayer({
      ...layer,
      positionX: layer.positionX + d.deltaX,
      positionY: layer.positionY + d.deltaY,
    })
  }

  // Handlers
  async function handleSelectedLayerKeyDown(
    e: React.KeyboardEvent<HTMLButtonElement>,
    layer: LayerType
  ) {
    e.preventDefault()
    e.stopPropagation()

    if (id === selectedID) {
      if (isHotkey(['delete', 'backspace'], e)) {
        await reflect.mutate.deleteLayer(id)
      }
      if (isHotkey('ArrowUp', e)) {
        await reflect.mutate.setLayer({
          ...layer,
          positionY: layer.positionY - 1,
        })
      }
      if (isHotkey('shift+ArrowUp', e)) {
        await reflect.mutate.setLayer({
          ...layer,
          positionY: layer.positionY - 10,
        })
      }
      if (isHotkey('ArrowDown', e)) {
        await reflect.mutate.setLayer({
          ...layer,
          positionY: layer.positionY + 1,
        })
      }
      if (isHotkey('shift+ArrowDown', e)) {
        await reflect.mutate.setLayer({
          ...layer,
          positionY: layer.positionY + 10,
        })
      }
      if (isHotkey('ArrowLeft', e)) {
        await reflect.mutate.setLayer({
          ...layer,
          positionX: layer.positionX - 1,
        })
      }
      if (isHotkey('shift+ArrowLeft', e)) {
        await reflect.mutate.setLayer({
          ...layer,
          positionX: layer.positionX - 10,
        })
      }
      if (isHotkey('ArrowRight', e)) {
        await reflect.mutate.setLayer({
          ...layer,
          positionX: layer.positionX + 1,
        })
      }
      if (isHotkey('shift+ArrowRight', e)) {
        await reflect.mutate.setLayer({
          ...layer,
          positionX: layer.positionX + 10,
        })
      }
    }
  }

  async function handleCornerControlMouseDown(
    e: React.MouseEvent<HTMLButtonElement | HTMLElement>,
    layer: LayerType,
    control: 'tl' | 'tr' | 'bl' | 'br'
  ) {
    e.preventDefault()
    e.stopPropagation()

    // Select layer
    e.currentTarget.focus()
    await reflect.mutate.selectLayer(layer.id)
    undoManager.startGroup()

    // Resize layer
    const startX = e.clientX
    const startY = e.clientY
    const startLayerX = layer.positionX
    const startLayerY = layer.positionY
    const startLayerWidth = layer.width
    const startLayerHeight = layer.height

    const onMouseMove = async (e: MouseEvent) => {
      const scaleFactor = 600 / templates[0].width

      const diffX = Math.round((e.clientX - startX) / scaleFactor)
      const diffY = Math.round((e.clientY - startY) / scaleFactor)

      let newX = startLayerX
      let newY = startLayerY
      let newWidth = startLayerWidth
      let newHeight = startLayerHeight

      if (control === 'tl' || control === 'bl') {
        newX = startLayerX + diffX
        newWidth = startLayerWidth - diffX

        // Ensure the new width does not exceed the container's width
        if (newX < 0) {
          newWidth = startLayerWidth + startLayerX
          newX = 0
        }

        // Prevent the layer from moving after reaching its minimum width
        if (newWidth <= 0) {
          newWidth = 1
          newX = startLayerX + startLayerWidth - 1
        }
      }

      if (control === 'tl' || control === 'tr') {
        newY = startLayerY + diffY
        newHeight = startLayerHeight - diffY

        // Ensure the new height does not exceed the container's height
        if (newY < 0) {
          newHeight = startLayerHeight + startLayerY
          newY = 0
        }

        // Prevent the layer from moving after reaching its minimum height
        if (newHeight <= 0) {
          newHeight = 1
          newY = startLayerY + startLayerHeight - 1
        }
      }

      if (control === 'tr' || control === 'br') {
        newWidth = startLayerWidth + diffX

        // Ensure the new width does not exceed the container's width
        if (newX + newWidth > templates[0].width) {
          newWidth = templates[0].width - newX
        }
      }

      if (control === 'bl' || control === 'br') {
        newHeight = startLayerHeight + diffY

        // Ensure the new height does not exceed the container's height
        if (newY + newHeight > templates[0].height) {
          newHeight = templates[0].height - newY
        }
      }

      const maxX = templates[0].width - newWidth
      const maxY = templates[0].height - newHeight

      reflect.mutate.setLayer({
        ...layer,
        positionX: newX < 0 ? 0 : newX > maxX ? maxX : newX,
        positionY: newY < 0 ? 0 : newY > maxY ? maxY : newY,
        width:
          newWidth <= 0
            ? 1
            : newWidth > templates[0].width
              ? templates[0].width
              : newWidth,
        height:
          newHeight <= 0
            ? 1
            : newHeight > templates[0].height
              ? templates[0].height
              : newHeight,
      })
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      undoManager.endGroup()
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  async function handleSideControlMouseDown(
    e: React.MouseEvent<HTMLButtonElement | HTMLElement>,
    layer: LayerType,
    control: 't' | 'r' | 'b' | 'l'
  ) {
    e.preventDefault()
    e.stopPropagation()

    // Select layer
    e.currentTarget.focus()
    await reflect.mutate.selectLayer(layer.id)
    undoManager.startGroup()

    // Resize layer
    const startX = e.clientX
    const startY = e.clientY
    const startLayerX = layer.positionX
    const startLayerY = layer.positionY
    const startLayerWidth = layer.width
    const startLayerHeight = layer.height

    const onMouseMove = async (e: MouseEvent) => {
      const scaleFactor = 600 / templates[0].width

      const diffX = Math.round((e.clientX - startX) / scaleFactor)
      const diffY = Math.round((e.clientY - startY) / scaleFactor)

      let newX = startLayerX
      let newY = startLayerY
      let newWidth = startLayerWidth
      let newHeight = startLayerHeight

      if (control === 't') {
        newY = startLayerY + diffY
        newHeight = startLayerHeight - diffY
        // Ensure the new height does not exceed the container's height
        if (newY < 0) {
          newHeight = startLayerHeight + startLayerY
          newY = 0
        }

        // Prevent the layer from moving after reaching its minimum height
        if (newHeight <= 0) {
          newHeight = 1
          newY = startLayerY + startLayerHeight - 1
        }
      }
      if (control === 'r') {
        newWidth = startLayerWidth + diffX
        // Ensure the new width does not exceed the container's width
        if (newX + newWidth > templates[0].width) {
          newWidth = templates[0].width - newX
        }
      }
      if (control === 'b') {
        newHeight = startLayerHeight + diffY
        // Ensure the new height does not exceed the container's height
        if (newY + newHeight > templates[0].height) {
          newHeight = templates[0].height - newY
        }
      }
      if (control === 'l') {
        newX = startLayerX + diffX
        newWidth = startLayerWidth - diffX

        // Ensure the new width does not exceed the container's width
        if (newX < 0) {
          newWidth = startLayerWidth + startLayerX
          newX = 0
        }
        // Prevent the layer from moving after reaching its minimum width
        if (newWidth <= 0) {
          newWidth = 1
          newX = startLayerX + startLayerWidth - 1
        }
      }

      const maxX = templates[0].width - newWidth
      const maxY = templates[0].height - newHeight

      reflect.mutate.setLayer({
        ...layer,
        positionX: newX < 0 ? 0 : newX > maxX ? maxX : newX,
        positionY: newY < 0 ? 0 : newY > maxY ? maxY : newY,
        width:
          newWidth <= 0
            ? 1
            : newWidth > templates[0].width
              ? templates[0].width
              : newWidth,
        height:
          newHeight <= 0
            ? 1
            : newHeight > templates[0].height
              ? templates[0].height
              : newHeight,
      })
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      undoManager.endGroup()
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  return (
    <DraggableCore onStart={onDragStart} onDrag={onDrag}>
      {isBackgroundLayer && layer.type === 'shape' ? (
        // Background Layer
        <div
          key={`${index}-backgroundLayer`}
          className="select-none appearance-none focus:outline-none"
          style={{
            position: 'absolute',
            left: layer.positionX,
            top: layer.positionY,
            transform: `rotate(${layer.rotation}deg)`,
            width: layer.width,
            height: layer.height,
            borderRadius: layer.cornerRadius,
            opacity: layer.opacity,
            backgroundColor: layer.color,
          }}
        />
      ) : layer.type === 'text' ? (
        <TextLayer
          key={`${layer.id}`}
          layer={layer}
          isSelected={isSelected}
          selectionColor={selectionColor}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          handleSelectedLayerKeyDown={handleSelectedLayerKeyDown}
          handleCornerControlMouseDown={handleCornerControlMouseDown}
          handleSideControlMouseDown={handleSideControlMouseDown}
        />
      ) : layer.type === 'image' ? (
        <ImageLayer
          key={`${layer.id}`}
          layer={layer}
          isSelected={isSelected}
          selectionColor={selectionColor}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          handleSelectedLayerKeyDown={handleSelectedLayerKeyDown}
          handleCornerControlMouseDown={handleCornerControlMouseDown}
          handleSideControlMouseDown={handleSideControlMouseDown}
        />
      ) : (
        <ShapeLayer
          key={`${layer.id}`}
          layer={layer}
          isSelected={isSelected}
          selectionColor={selectionColor}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          handleSelectedLayerKeyDown={handleSelectedLayerKeyDown}
          handleCornerControlMouseDown={handleCornerControlMouseDown}
          handleSideControlMouseDown={handleSideControlMouseDown}
        />
      )}
    </DraggableCore>
  )
}

function TextLayer({
  layer,
  isSelected,
  selectionColor,
  onMouseEnter,
  onMouseLeave,
  handleSelectedLayerKeyDown,
  handleCornerControlMouseDown,
  handleSideControlMouseDown,
}: {
  layer: TextLayerType
  isSelected: boolean
  selectionColor?: string
  onMouseEnter: () => void
  onMouseLeave: () => void
  handleSelectedLayerKeyDown: (
    e: React.KeyboardEvent<HTMLButtonElement>,
    layer: LayerType
  ) => Promise<void>
  handleCornerControlMouseDown: (
    e: React.MouseEvent<HTMLButtonElement | HTMLElement>,
    layer: LayerType,
    control: 'tl' | 'tr' | 'bl' | 'br'
  ) => Promise<void>
  handleSideControlMouseDown: (
    e: React.MouseEvent<HTMLButtonElement | HTMLElement>,
    layer: LayerType,
    control: 't' | 'r' | 'b' | 'l'
  ) => Promise<void>
}) {
  const textLayerRef = React.useRef<HTMLButtonElement>(null)
  const prevFontFamilyRef = React.useRef<string | null>(null)

  React.useEffect(() => {
    if (isSelected) {
      textLayerRef.current?.focus()
    }
  }, [isSelected])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      prevFontFamilyRef.current = layer.fontFamily
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [layer.fontFamily])

  return (
    <button
      key={layer.id + layer.type}
      ref={textLayerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={async (e) => {
        await handleSelectedLayerKeyDown(e, layer)
      }}
      className={`${
        !isSelected ? 'ring-[#4a9eff] hover:ring-[3px]' : ''
      } h-full w-full cursor-default select-none appearance-none focus:outline-none`}
      style={{
        outline: selectionColor ? `2px solid ${selectionColor}` : 'none',
        position: 'absolute',
        display: 'flex',
        justifyContent:
          layer.alignHorizontal === 'center'
            ? 'center'
            : layer.alignHorizontal === 'right'
              ? 'flex-end'
              : 'flex-start',
        alignItems:
          layer.alignVertical === 'middle'
            ? 'center'
            : layer.alignVertical === 'bottom'
              ? 'flex-end'
              : 'flex-start',
        left: layer.positionX,
        top: layer.positionY,
        width: layer.width,
        height: layer.height,
        transform: `rotate(${layer.rotation}deg)`,
      }}
    >
      <div
        className="line-clamp-1"
        style={{
          overflowWrap: 'break-word',
          opacity: layer.opacity,
          fontFamily: `${layer.fontFamily}, ${
            prevFontFamilyRef.current ? prevFontFamilyRef.current : 'sans-serif'
          }`,
          fontWeight: layer.fontWeight,
          fontSize: layer.size,
          lineHeight: `${layer.lineHeight}px`,
          WebkitLineClamp: layer.lineClamp,
          textAlign: layer.alignHorizontal,
          verticalAlign: layer.alignVertical,
          color: layer.color,
        }}
      >
        {layer.textValue}
      </div>

      {isSelected && (
        <>
          <CornerControls
            layer={layer}
            handleCornerControlMouseDown={handleCornerControlMouseDown}
          />
          <SideControls
            layer={layer}
            handleSideControlMouseDown={handleSideControlMouseDown}
          />
        </>
      )}
    </button>
  )
}

function ImageLayer({
  layer,
  isSelected,
  selectionColor,
  onMouseEnter,
  onMouseLeave,
  handleSelectedLayerKeyDown,
  handleCornerControlMouseDown,
  handleSideControlMouseDown,
}: {
  layer: ImageLayerType
  isSelected: boolean
  selectionColor?: string
  onMouseEnter: () => void
  onMouseLeave: () => void
  handleSelectedLayerKeyDown: (
    e: React.KeyboardEvent<HTMLButtonElement>,
    layer: LayerType
  ) => Promise<void>
  handleCornerControlMouseDown: (
    e: React.MouseEvent<HTMLButtonElement | HTMLElement>,
    layer: LayerType,
    control: 'tl' | 'tr' | 'bl' | 'br'
  ) => Promise<void>
  handleSideControlMouseDown: (
    e: React.MouseEvent<HTMLButtonElement | HTMLElement>,
    layer: LayerType,
    control: 't' | 'r' | 'b' | 'l'
  ) => Promise<void>
}) {
  const uploadedImageLayerRef = React.useRef<HTMLButtonElement>(null)
  const emptyImageLayerRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (isSelected) {
      emptyImageLayerRef.current?.focus()
      uploadedImageLayerRef.current?.focus()
    }
  }, [isSelected])

  return (
    <>
      {layer.imageValue &&
      layer.imageValue.type === 'static' &&
      layer.imageValue.value ? (
        <button
          key={layer.id + layer.type}
          ref={uploadedImageLayerRef}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onKeyDown={async (e) => {
            await handleSelectedLayerKeyDown(e, layer)
          }}
          className={`${
            !isSelected ? 'ring-[#4a9eff] hover:ring-[3px]' : ''
          } cursor-default select-none appearance-none focus:outline-none`}
          style={{
            outline: selectionColor ? `2px solid ${selectionColor}` : 'none',
            position: 'absolute',
            left: layer.positionX,
            top: layer.positionY,
            width: layer.width,
            height: layer.height,
            transform: `rotate(${layer.rotation}deg)`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={layer.imageValue.value}
            width={layer.width}
            height={layer.height}
            alt=""
            className="select-none"
            style={{
              width: layer.width,
              height: layer.height,
              borderRadius: layer.cornerRadius,
              opacity: layer.opacity,
              objectFit: layer.objectFit,
              objectPosition: 'center',
            }}
          />

          {isSelected && (
            <>
              <CornerControls
                layer={layer}
                handleCornerControlMouseDown={handleCornerControlMouseDown}
              />
              <SideControls
                layer={layer}
                handleSideControlMouseDown={handleSideControlMouseDown}
              />
            </>
          )}
        </button>
      ) : (
        <button
          key={layer.id + layer.type}
          ref={emptyImageLayerRef}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onKeyDown={async (e) => {
            await handleSelectedLayerKeyDown(e, layer)
          }}
          className={`${
            !isSelected ? 'ring-[#4a9eff] hover:ring-[3px]' : ''
          } flex cursor-default select-none appearance-none items-center justify-center focus:outline-none `}
          style={{
            outline: selectionColor ? `2px solid ${selectionColor}` : 'none',
            position: 'absolute',
            left: layer.positionX,
            top: layer.positionY,
            transform: `rotate(${layer.rotation}deg)`,
            width: layer.width,
            height: layer.height,
            opacity: layer.opacity,
          }}
        >
          <div
            className=" border-dark-border-solid flex items-center justify-center border-4 border-dashed bg-black"
            style={{
              width: layer.width,
              height: layer.height,
              borderRadius: layer.cornerRadius,
            }}
          >
            <ImageIcon
              width={layer.width < 100 || layer.height < 100 ? 32 : 64}
              height={layer.width < 100 || layer.height < 100 ? 32 : 64}
              color="#252525"
            />
          </div>

          {isSelected && (
            <>
              <CornerControls
                layer={layer}
                handleCornerControlMouseDown={handleCornerControlMouseDown}
              />
              <SideControls
                layer={layer}
                handleSideControlMouseDown={handleSideControlMouseDown}
              />
            </>
          )}
        </button>
      )}
    </>
  )
}

function ShapeLayer({
  layer,
  isSelected,
  selectionColor,
  onMouseEnter,
  onMouseLeave,
  handleSelectedLayerKeyDown,
  handleCornerControlMouseDown,
  handleSideControlMouseDown,
}: {
  layer: ShapeLayerType
  isSelected: boolean
  selectionColor?: string
  onMouseEnter: () => void
  onMouseLeave: () => void
  handleSelectedLayerKeyDown: (
    e: React.KeyboardEvent<HTMLButtonElement>,
    layer: LayerType
  ) => Promise<void>
  handleCornerControlMouseDown: (
    e: React.MouseEvent<HTMLButtonElement | HTMLElement>,
    layer: LayerType,
    control: 'tl' | 'tr' | 'bl' | 'br'
  ) => Promise<void>
  handleSideControlMouseDown: (
    e: React.MouseEvent<HTMLButtonElement | HTMLElement>,
    layer: LayerType,
    control: 't' | 'r' | 'b' | 'l'
  ) => Promise<void>
}) {
  const shapeLayerRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (isSelected) {
      shapeLayerRef.current?.focus()
    }
  }, [isSelected])

  return (
    <button
      key={layer.id}
      ref={shapeLayerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={async (e) => {
        await handleSelectedLayerKeyDown(e, layer)
      }}
      className={`${
        !isSelected ? 'ring-[#4a9eff] hover:ring-[3px]' : ''
      } cursor-default select-none appearance-none focus:outline-none`}
      style={{
        outline: selectionColor ? `2px solid ${selectionColor}` : 'none',
        position: 'absolute',
        left: layer.positionX,
        top: layer.positionY,
        transform: `rotate(${layer.rotation}deg)`,
        width: layer.width,
        height: layer.height,
        opacity: layer.opacity,
      }}
    >
      <div
        style={{
          width: layer.width,
          height: layer.height,
          borderRadius: layer.cornerRadius,
          backgroundColor: layer.color,
        }}
      />

      {isSelected && (
        <>
          <CornerControls
            layer={layer}
            handleCornerControlMouseDown={handleCornerControlMouseDown}
          />
          <SideControls
            layer={layer}
            handleSideControlMouseDown={handleSideControlMouseDown}
          />
        </>
      )}
    </button>
  )
}

function CornerControls({
  layer,
  handleCornerControlMouseDown,
}: {
  layer: LayerType
  handleCornerControlMouseDown: (
    e: React.MouseEvent<HTMLButtonElement | HTMLElement>,
    layer: LayerType,
    control: 'tl' | 'tr' | 'bl' | 'br'
  ) => Promise<void>
}) {
  return (
    <>
      <div
        onMouseDown={(e) => handleCornerControlMouseDown(e, layer, 'tl')}
        className="absolute border-2 border-[#4a9eff] bg-black"
        style={{
          width: 12,
          height: 12,
          cursor: `nwse-resize`,
          top: -7,
          left: -7,
        }}
      />
      <div
        onMouseDown={(e) => handleCornerControlMouseDown(e, layer, 'tr')}
        className="absolute border-2 border-[#4a9eff] bg-black"
        style={{
          width: 12,
          height: 12,
          cursor: `nesw-resize`,
          top: -7,
          right: -7,
        }}
      />
      <div
        onMouseDown={(e) => handleCornerControlMouseDown(e, layer, 'bl')}
        className="absolute border-2 border-[#4a9eff] bg-black"
        style={{
          width: 12,
          height: 12,
          cursor: 'nesw-resize',
          bottom: -7,
          left: -7,
        }}
      />
      <div
        onMouseDown={(e) => handleCornerControlMouseDown(e, layer, 'br')}
        className="absolute border-2 border-[#4a9eff] bg-black"
        style={{
          width: 12,
          height: 12,
          cursor: `nwse-resize`,
          bottom: -7,
          right: -7,
        }}
      />
    </>
  )
}

function SideControls({
  layer,
  handleSideControlMouseDown,
}: {
  layer: LayerType
  handleSideControlMouseDown: (
    e: React.MouseEvent<HTMLButtonElement | HTMLElement>,
    layer: LayerType,
    control: 't' | 'r' | 'b' | 'l'
  ) => Promise<void>
}) {
  return (
    <>
      <div
        onMouseDown={(e) => handleSideControlMouseDown(e, layer, 'l')}
        className="bg-dark-control-base absolute"
        style={{
          top: 5,
          left: -2,
          width: 2,
          height: 'calc(100% - 10px)',
          cursor: 'ew-resize',
        }}
      />
      <div
        onMouseDown={(e) => handleSideControlMouseDown(e, layer, 'r')}
        className="bg-dark-control-base absolute"
        style={{
          top: 5,
          right: -2,
          width: 2,
          height: 'calc(100% - 10px)',
          cursor: 'ew-resize',
        }}
      />
      <div
        onMouseDown={(e) => handleSideControlMouseDown(e, layer, 't')}
        className="bg-dark-control-base absolute"
        style={{
          top: -2,
          left: 5,
          width: 'calc(100% - 10px)',
          height: 2,
          cursor: 'ns-resize',
        }}
      />
      <div
        onMouseDown={(e) => handleSideControlMouseDown(e, layer, 'b')}
        className="bg-dark-control-base absolute"
        style={{
          bottom: -2,
          left: 5,
          width: 'calc(100% - 10px)',
          height: 2,
          cursor: 'ns-resize',
        }}
      />
    </>
  )
}
