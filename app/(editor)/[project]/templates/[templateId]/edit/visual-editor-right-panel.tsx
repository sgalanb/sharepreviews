'use client'

import { LayerType } from '@/app/(editor)/[project]/templates/[templateId]/edit/page'
import { createUploadedImageAction } from '@/app/actions/actions'
import { TemplateType } from '@/app/db/schema'
import { Button } from '@/app/ui/components/Button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/app/ui/components/Command'
import { Input } from '@/app/ui/components/Input'
import { Label } from '@/app/ui/components/Label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/ui/components/Popover'
import { ScrollArea } from '@/app/ui/components/ScrollArea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/ui/components/Select'
import { Separator } from '@/app/ui/components/Separator'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/ui/components/Tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/ui/components/Tooltip'
import { UploadButton } from '@/app/ui/components/UploadThingComponents'
import FixedSizeIcon from '@/app/ui/svgs/FixedSizeIcon'
import {
  availableFonts,
  cn,
  getConditionalValueVariableName,
  getConditionalVisibilityVariableName,
} from '@/app/utils'
import {
  AlignCenter,
  AlignHorizontalSpaceAround,
  AlignLeft,
  AlignRight,
  AlignVerticalSpaceAround,
  ArrowDownToLine,
  ArrowUpToLine,
  BlendIcon,
  Check,
  ChevronsDownUp,
  ChevronsRightLeft,
  ChevronsUpDown,
  FoldVertical,
  RotateCw,
  Spline,
} from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export default function VisualEditorRightPanel({
  userId,
  template,
  setTemplate,
  layers,
  setLayers,
  selectedLayer,
  setSelectedLayer,
  multiSelectedLayers,
  setMultiSelectedLayers,
}: {
  userId: string
  template: TemplateType | undefined
  setTemplate: Dispatch<SetStateAction<TemplateType | undefined>>
  layers: LayerType[]
  setLayers: Dispatch<SetStateAction<LayerType[]>>
  selectedLayer?: LayerType
  setSelectedLayer: Dispatch<SetStateAction<LayerType | undefined>>
  multiSelectedLayers: LayerType[]
  setMultiSelectedLayers: Dispatch<SetStateAction<LayerType[]>>
}) {
  const [openFontsCombobox, setOpenFontsCombobox] = useState<boolean>(false)
  const [fontsComboboxValue, setFontsComboboxValue] = useState<string>()

  useEffect(() => {
    setFontsComboboxValue(
      selectedLayer?.type === 'text'
        ? selectedLayer?.family.toLowerCase() || ''
        : ''
    )
  }, [selectedLayer])

  const [selectionX, setSelectionX] = useState<number>(0)
  const [selectionY, setSelectionY] = useState<number>(0)

  useEffect(() => {
    if (multiSelectedLayers.length > 1) {
      // Find the smallest X value of the all selected layers
      const xValues = multiSelectedLayers.map((layer) => layer.x)
      setSelectionX(Math.min(...xValues))
      // Find the smallest Y value of the all selected layers
      const yValues = multiSelectedLayers.map((layer) => layer.y)
      setSelectionY(Math.min(...yValues))
    }
  }, [multiSelectedLayers])

  return (
    <div className="flex h-full w-full flex-col items-start justify-between overflow-hidden border-l">
      {selectedLayer && multiSelectedLayers.length < 2 ? (
        <ScrollArea
          key={selectedLayer.id} // Force the component to re-render when the selected layer changes
          className="flex h-full w-full flex-col items-start justify-start"
        >
          <TooltipProvider>
            {/* PROPERTIES */}
            <div className="flex h-fit w-full flex-col items-start justify-start gap-2 p-4">
              <span className="h-8 text-lg font-semibold">Properties</span>
              <div className="grid w-full grid-cols-2 items-center gap-2">
                <Input
                  id="name"
                  type="text"
                  defaultValue={selectedLayer.name}
                  onChange={(e) => {
                    const newLayerName = {
                      ...selectedLayer,
                      name: e.target.value,
                    } as LayerType
                    const newLayer = {
                      ...newLayerName,
                      conditionalValueVariableName:
                        selectedLayer.type !== 'rectangle'
                          ? selectedLayer.conditionalValue
                            ? getConditionalValueVariableName(newLayerName)
                            : ''
                          : '',
                      conditionalVisibilityVariableName:
                        selectedLayer.type !== 'rectangle'
                          ? selectedLayer.conditionalVisibility
                            ? getConditionalVisibilityVariableName(newLayerName)
                            : ''
                          : '',
                    } as LayerType

                    setSelectedLayer(newLayer)

                    setLayers(
                      layers.map((layer) =>
                        layer.id === selectedLayer.id ? newLayer : layer
                      )
                    )
                  }}
                  leftLabel={
                    <Label
                      htmlFor="name"
                      className="w-[2.75rem] text-center text-muted-foreground"
                    >
                      Name
                    </Label>
                  }
                  className="py-1.5 pl-[4.25rem]"
                  containerClassName="col-span-2"
                />
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
                {selectedLayer.type === 'text' &&
                selectedLayer.widthType === 'fixed' ? (
                  <Input
                    id="widthFixed"
                    type="number"
                    step={10}
                    min={0}
                    max={1200}
                    value={selectedLayer.width}
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
                ) : (
                  <Input
                    id="widthFit"
                    type="text"
                    value="Hug"
                    disabled
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
                )}
                {selectedLayer.type === 'text' &&
                selectedLayer.heightType === 'fixed' ? (
                  <Input
                    id="heightFixed"
                    type="number"
                    step={10}
                    min={0}
                    max={630}
                    value={selectedLayer.height}
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
                ) : (
                  <Input
                    id="heightFit"
                    type="text"
                    value="Hug"
                    disabled
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
                )}
                {/* Text widthType and heightType */}
                {selectedLayer.type === 'text' && (
                  <>
                    <Select
                      defaultValue={selectedLayer.widthType}
                      onValueChange={(value) => {
                        if (value === 'fit') {
                          setSelectedLayer({
                            ...selectedLayer,
                            widthType: value as 'fixed' | 'fit',
                            width: 100,
                          })
                          setLayers(
                            layers.map((layer) =>
                              layer.id === selectedLayer.id
                                ? {
                                    ...layer,
                                    widthType: value as 'fixed' | 'fit',
                                    width: 100,
                                  }
                                : layer
                            )
                          )
                        } else {
                          setSelectedLayer({
                            ...selectedLayer,
                            widthType: value as 'fixed' | 'fit',
                          })
                          setLayers(
                            layers.map((layer) =>
                              layer.id === selectedLayer.id
                                ? {
                                    ...layer,
                                    widthType: value as 'fixed' | 'fit',
                                  }
                                : layer
                            )
                          )
                        }
                      }}
                    >
                      <SelectTrigger className="flex justify-start gap-0 p-0 pr-2">
                        <Label className="mr-2 flex h-full w-[2.0625rem] shrink-0 items-center justify-center border-r text-muted-foreground">
                          {selectedLayer.widthType === 'fixed' ? (
                            <FixedSizeIcon className="h-4 w-4" />
                          ) : (
                            <ChevronsRightLeft className="h-4 w-4" />
                          )}
                        </Label>
                        <div className="flex w-20 items-center justify-start">
                          <SelectValue placeholder="Width" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="fixed">Fixed</SelectItem>
                          <SelectItem value="fit">Hug</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <Select
                      defaultValue={selectedLayer.heightType}
                      onValueChange={(value) => {
                        if (value === 'fit') {
                          setSelectedLayer({
                            ...selectedLayer,
                            heightType: value as 'fixed' | 'fit',
                            height: 100,
                          })
                          setLayers(
                            layers.map((layer) =>
                              layer.id === selectedLayer.id
                                ? {
                                    ...layer,
                                    heightType: value as 'fixed' | 'fit',
                                    height: 100,
                                  }
                                : layer
                            )
                          )
                        } else {
                          setSelectedLayer({
                            ...selectedLayer,
                            heightType: value as 'fixed' | 'fit',
                          })
                          setLayers(
                            layers.map((layer) =>
                              layer.id === selectedLayer.id
                                ? {
                                    ...layer,
                                    heightType: value as 'fixed' | 'fit',
                                  }
                                : layer
                            )
                          )
                        }
                      }}
                    >
                      <SelectTrigger className="flex justify-start gap-0 p-0 pr-2">
                        <Label className="mr-2 flex h-full w-[2.125rem] shrink-0 items-center justify-center border-r text-muted-foreground">
                          {selectedLayer.heightType === 'fixed' ? (
                            <FixedSizeIcon className="h-4 w-4 rotate-90" />
                          ) : (
                            <ChevronsDownUp className="h-4 w-4" />
                          )}
                        </Label>
                        <div className="flex w-20 items-center justify-start">
                          <SelectValue placeholder="Height" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="fixed">Fixed</SelectItem>
                          <SelectItem value="fit">Hug</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </>
                )}
                {/* Rotation */}
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
                </Tooltip>
                {/* Opacity */}
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
                {selectedLayer.type !== 'text' && (
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
                {selectedLayer.type === 'image' && (
                  <Select
                    defaultValue="cover"
                    onValueChange={(value) => {
                      setSelectedLayer({
                        ...selectedLayer,
                        objectFit: value as 'fill' | 'contain' | 'cover',
                      })
                      setLayers(
                        layers.map((layer) =>
                          layer.id === selectedLayer.id
                            ? {
                                ...layer,
                                objectFit: value as
                                  | 'fill'
                                  | 'contain'
                                  | 'cover',
                              }
                            : layer
                        )
                      )
                    }}
                  >
                    <SelectTrigger className="flex justify-start gap-0 p-0 pr-2">
                      <Label className="mr-2 flex h-full w-[2.125rem] shrink-0 items-center justify-center border-r text-muted-foreground">
                        Fit
                      </Label>
                      <div className="flex w-20 items-center justify-start">
                        <SelectValue placeholder="Fit" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="cover">Cover</SelectItem>
                        <SelectItem value="fill">Fill</SelectItem>
                        <SelectItem value="contain">Contain</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
                {selectedLayer.type === 'rectangle' && (
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
                        htmlFor="fill-color"
                        className="w-6 text-center text-muted-foreground"
                      >
                        Fill
                      </Label>
                    }
                    className="py-1.5 pl-12"
                  />
                )}
              </div>
            </div>
            {/* VARIABLE VALUE */}
            {selectedLayer?.type === 'text' && (
              <>
                <Separator />
                <Tabs
                  defaultValue={selectedLayer.conditionalValue ? 'yes' : 'no'}
                  onValueChange={(value) => {
                    setSelectedLayer({
                      ...selectedLayer,
                      conditionalValue: value === 'yes',
                      conditionalValueVariableName:
                        value === 'yes'
                          ? getConditionalValueVariableName(selectedLayer)
                          : '',
                    })
                    setLayers(
                      layers.map((layer) =>
                        layer.id === selectedLayer.id
                          ? {
                              ...layer,
                              conditionalValue: value === 'yes',
                              conditionalValueVariableName:
                                value === 'yes'
                                  ? getConditionalValueVariableName(
                                      selectedLayer
                                    )
                                  : '',
                            }
                          : layer
                      )
                    )
                  }}
                  className="flex h-fit w-full flex-col items-start justify-start p-4"
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="text-lg font-semibold">
                      Variable value
                    </span>
                    <TabsList className="h-fit w-fit border">
                      <TabsTrigger value="no" className="h-fit w-full py-0.5">
                        No
                      </TabsTrigger>
                      <TabsTrigger value="yes" className="h-fit w-full py-0.5">
                        Yes
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="no" className="w-full">
                    <Input
                      type="text"
                      id="value"
                      defaultValue={selectedLayer.value}
                      onChange={(e) => {
                        setSelectedLayer({
                          ...selectedLayer,
                          value: e.target.value,
                        })
                        setLayers(
                          layers.map((layer) =>
                            layer.id === selectedLayer.id
                              ? { ...layer, value: e.target.value }
                              : layer
                          )
                        )
                      }}
                      leftLabel={
                        <Label
                          htmlFor="value"
                          className="w-12 text-center text-muted-foreground"
                        >
                          Text
                        </Label>
                      }
                      className="w-full pl-[4.5rem]"
                      containerClassName="mt-2"
                    />
                  </TabsContent>
                  <TabsContent value="yes" className="w-full">
                    <div className="mt-2 flex w-full flex-col gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            type="text"
                            id="exampleValue"
                            defaultValue={selectedLayer.exampleValue}
                            onChange={(e) => {
                              setSelectedLayer({
                                ...selectedLayer,
                                exampleValue: e.target.value,
                              })
                              setLayers(
                                layers.map((layer) =>
                                  layer.id === selectedLayer.id
                                    ? { ...layer, exampleValue: e.target.value }
                                    : layer
                                )
                              )
                            }}
                            leftLabel={
                              <Label
                                htmlFor="exampleValue"
                                className="w-20 text-center text-muted-foreground"
                              >
                                Placeholder
                              </Label>
                            }
                            className="w-full pl-[6.5rem]"
                          />
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="w-[247px]">
                          <span className="font-medium">
                            This text will be used in previews and as a default
                            when no variable is provided.
                          </span>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            )}
            {selectedLayer?.type === 'image' && (
              <>
                <Separator />
                <Tabs
                  defaultValue={selectedLayer.conditionalValue ? 'yes' : 'no'}
                  onValueChange={(value) => {
                    setSelectedLayer({
                      ...selectedLayer,
                      conditionalValue: value === 'yes',
                      conditionalValueVariableName:
                        value === 'yes'
                          ? getConditionalValueVariableName(selectedLayer)
                          : '',
                    })
                    setLayers(
                      layers.map((layer) =>
                        layer.id === selectedLayer.id
                          ? {
                              ...layer,
                              conditionalValue: value === 'yes',
                              conditionalValueVariableName:
                                value === 'yes'
                                  ? getConditionalValueVariableName(
                                      selectedLayer
                                    )
                                  : '',
                            }
                          : layer
                      )
                    )
                  }}
                  className="flex h-fit w-full flex-col items-start justify-start p-4"
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="text-lg font-semibold">
                      Variable value
                    </span>
                    <TabsList className="h-fit w-fit border">
                      <TabsTrigger value="no" className="h-fit w-full py-0.5">
                        No
                      </TabsTrigger>
                      <TabsTrigger value="yes" className="h-fit w-full py-0.5">
                        Yes
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="no" className="w-full">
                    <Input
                      type="text"
                      id="src"
                      defaultValue={selectedLayer.src}
                      onChange={(e) => {
                        setSelectedLayer({
                          ...selectedLayer,
                          src: e.target.value,
                        })
                        setLayers(
                          layers.map((layer) =>
                            layer.id === selectedLayer.id
                              ? { ...layer, src: e.target.value }
                              : layer
                          )
                        )
                      }}
                      leftLabel={
                        <Label
                          htmlFor="src"
                          className="w-10 text-center text-muted-foreground"
                        >
                          URL
                        </Label>
                      }
                      className="w-full pl-[4rem]"
                      containerClassName="mt-2"
                    />
                  </TabsContent>
                  <TabsContent value="yes" className="w-full">
                    <div className="mt-2 flex w-full flex-col gap-2">
                      <Input
                        type="text"
                        id="exampleSrc"
                        defaultValue={selectedLayer.exampleSrc}
                        onChange={(e) => {
                          setSelectedLayer({
                            ...selectedLayer,
                            exampleSrc: e.target.value,
                          })
                          setLayers(
                            layers.map((layer) =>
                              layer.id === selectedLayer.id
                                ? { ...layer, exampleSrc: e.target.value }
                                : layer
                            )
                          )
                        }}
                        leftLabel={
                          <Label
                            htmlFor="exampleSrc"
                            className="w-24 text-center text-muted-foreground"
                          >
                            Example URL
                          </Label>
                        }
                        className="w-full pl-[7.5rem]"
                      />
                      <span className="text-sm text-muted-foreground">
                        This URL will be used in previews and when no variable
                        is provided.
                      </span>
                    </div>
                  </TabsContent>
                  <UploadButton
                    className="mt-2 w-full ut-button:w-full ut-button:border-primary ut-button:bg-primary ut-button:ring-primary"
                    endpoint="imageUploader"
                    onBeforeUploadBegin={(files) => {
                      // Rename the file to include the user id for easier manual manipulation
                      return files.map(
                        (f) =>
                          new File([f], `${userId}-${f.name}`, { type: f.type })
                      )
                    }}
                    onClientUploadComplete={async (res: any) => {
                      const imageKey = res[0].key
                      const imageUrl = res[0].url

                      await createUploadedImageAction({
                        key: imageKey,
                        url: imageUrl,
                        userId: userId,
                      })

                      if (!selectedLayer.conditionalValue) {
                        setSelectedLayer({
                          ...selectedLayer,
                          src: imageUrl,
                        })
                        setLayers(
                          layers.map((layer) =>
                            layer.id === selectedLayer.id
                              ? { ...layer, src: imageUrl }
                              : layer
                          )
                        )
                      } else {
                        setSelectedLayer({
                          ...selectedLayer,
                          exampleSrc: imageUrl,
                        })
                        setLayers(
                          layers.map((layer) =>
                            layer.id === selectedLayer.id
                              ? { ...layer, exampleSrc: imageUrl }
                              : layer
                          )
                        )
                      }
                    }}
                    onUploadError={(error: Error) => {
                      console.log(`ERROR! ${error.message}`)
                    }}
                  />
                </Tabs>
              </>
            )}
            {/* TEXT PROPERTIES */}
            {selectedLayer?.type === 'text' && (
              <>
                <Separator />
                <div className="flex h-fit w-full flex-col items-start justify-start gap-2 p-4">
                  <span className="h-8 text-lg font-semibold">Text</span>
                  <div className="grid w-full grid-cols-2 items-center gap-2">
                    {/* Font selector */}
                    <Popover
                      open={openFontsCombobox}
                      onOpenChange={setOpenFontsCombobox}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openFontsCombobox}
                          className="col-span-2 justify-between"
                        >
                          {
                            availableFonts?.find(
                              (font) => font.value === fontsComboboxValue
                            )?.label
                          }
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-[247px] p-0"
                        align="end"
                        sideOffset={8}
                      >
                        <Command>
                          <CommandInput placeholder="Search fonts..." />
                          <CommandEmpty>No font found.</CommandEmpty>
                          <CommandGroup>
                            {availableFonts?.map((font, index) => (
                              <CommandItem
                                key={index}
                                value={font.value}
                                onSelect={(newValue) => {
                                  setFontsComboboxValue(newValue)
                                  setSelectedLayer({
                                    ...selectedLayer,
                                    family: newValue,
                                  })
                                  setLayers(
                                    layers.map((layer) =>
                                      layer.id === selectedLayer.id
                                        ? { ...layer, family: newValue }
                                        : layer
                                    )
                                  )
                                  setOpenFontsCombobox(false)
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    fontsComboboxValue === font.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {font.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {/* Size */}
                    <Input
                      id="size"
                      type="number"
                      step={1}
                      min={1}
                      defaultValue={selectedLayer.size}
                      onChange={(e) => {
                        if (e.target.value === '') return
                        setSelectedLayer({
                          ...selectedLayer,
                          size: parseInt(e.target.value),
                        })
                        setLayers(
                          layers.map((layer) =>
                            layer.id === selectedLayer.id
                              ? { ...layer, size: parseInt(e.target.value) }
                              : layer
                          )
                        )
                      }}
                      onBlur={(e) => {
                        if (e.target.value === '') {
                          e.target.value = selectedLayer.size.toString()
                        }
                      }}
                      leftLabel={
                        <Label
                          htmlFor="size"
                          className="w-7 text-center text-muted-foreground"
                        >
                          Size
                        </Label>
                      }
                      className="pl-[3.25rem]"
                    />
                    {/* Line Height */}
                    <Input
                      id="line-height"
                      type="number"
                      step={0.1}
                      min={1}
                      max={100}
                      defaultValue={selectedLayer.lineHeight}
                      onChange={(e) => {
                        if (e.target.value === '') return
                        setSelectedLayer({
                          ...selectedLayer,
                          lineHeight: parseFloat(e.target.value),
                        })
                        setLayers(
                          layers.map((layer) =>
                            layer.id === selectedLayer.id
                              ? {
                                  ...layer,
                                  lineHeight: parseFloat(e.target.value),
                                }
                              : layer
                          )
                        )
                      }}
                      onBlur={(e) => {
                        if (e.target.value === '') {
                          e.target.value = selectedLayer.lineHeight.toString()
                        }
                      }}
                      leftLabel={
                        <Label
                          htmlFor="line-height"
                          className="w-12 text-left text-muted-foreground"
                        >
                          Line height
                        </Label>
                      }
                      className="pl-[4.5rem]"
                    />
                    {/* Align horizontal */}
                    <Tabs
                      defaultValue={selectedLayer.alignHorizontal}
                      onValueChange={(value) => {
                        setSelectedLayer({
                          ...selectedLayer,
                          alignHorizontal: value as
                            | 'flex-start'
                            | 'center'
                            | 'flex-end',
                        })
                        setLayers(
                          layers.map((layer) =>
                            layer.id === selectedLayer.id
                              ? {
                                  ...layer,
                                  alignHorizontal: value as
                                    | 'flex-start'
                                    | 'center'
                                    | 'flex-end',
                                }
                              : layer
                          )
                        )
                      }}
                      className="flex h-full w-full flex-col items-start justify-start"
                    >
                      <TabsList className="h-full w-full border">
                        <TabsTrigger
                          value="flex-start"
                          className="h-full w-full px-1"
                        >
                          <AlignLeft className="h-4 w-4" />
                        </TabsTrigger>
                        <TabsTrigger
                          value="center"
                          className="h-full w-full px-1"
                        >
                          <AlignCenter className="h-4 w-4" />
                        </TabsTrigger>
                        <TabsTrigger
                          value="flex-end"
                          className="h-full w-full px-1"
                        >
                          <AlignRight className="h-4 w-4" />
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                    {/* Align vertical */}
                    <Tabs
                      defaultValue={selectedLayer.alignVertical}
                      onValueChange={(value) => {
                        setSelectedLayer({
                          ...selectedLayer,
                          alignVertical: value as
                            | 'flex-start'
                            | 'center'
                            | 'flex-end',
                        })
                        setLayers(
                          layers.map((layer) =>
                            layer.id === selectedLayer.id
                              ? {
                                  ...layer,
                                  alignVertical: value as
                                    | 'flex-start'
                                    | 'center'
                                    | 'flex-end',
                                }
                              : layer
                          )
                        )
                      }}
                      className="flex h-full w-full flex-col items-start justify-start"
                    >
                      <TabsList className="h-full w-full border">
                        <TabsTrigger
                          value="flex-start"
                          className="h-full w-full px-1"
                        >
                          <ArrowUpToLine className="h-4 w-4" />
                        </TabsTrigger>
                        <TabsTrigger
                          value="center"
                          className="h-full w-full px-1"
                        >
                          <FoldVertical className="h-4 w-4" />
                        </TabsTrigger>
                        <TabsTrigger
                          value="flex-end"
                          className="h-full w-full px-1"
                        >
                          <ArrowDownToLine className="h-4 w-4" />
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                    {/* Color */}
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
                          htmlFor="fill-color"
                          className="w-6 text-center text-muted-foreground"
                        >
                          Fill
                        </Label>
                      }
                      className="py-1.5 pl-12"
                    />
                  </div>
                </div>
                <Separator />
                {/* TEXT BACKGROUND */}
                <div className="flex h-fit w-full flex-col items-start justify-start gap-2 p-4">
                  <Tabs
                    defaultValue={selectedLayer.background ? 'yes' : 'no'}
                    onValueChange={(value) => {
                      setSelectedLayer({
                        ...selectedLayer,
                        background: value === 'yes',
                      })
                      setLayers(
                        layers.map((layer) =>
                          layer.id === selectedLayer.id
                            ? { ...layer, background: value === 'yes' }
                            : layer
                        )
                      )
                    }}
                    className="flex h-fit w-full flex-col items-start justify-start"
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className="text-lg font-semibold">Background</span>
                      <TabsList className="h-fit w-fit border">
                        <TabsTrigger value="no" className="h-fit w-full py-0.5">
                          No
                        </TabsTrigger>
                        <TabsTrigger
                          value="yes"
                          className="h-fit w-full py-0.5"
                        >
                          Yes
                        </TabsTrigger>
                      </TabsList>
                    </div>
                    <TabsContent value="no" className="w-full"></TabsContent>
                    <TabsContent value="yes" className="w-full">
                      <div className="grid w-full grid-cols-2 items-center gap-2">
                        {/* BG Padding X */}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Input
                              id="bgPaddingX"
                              type="number"
                              step={1}
                              min={0}
                              defaultValue={selectedLayer.bgPaddingX}
                              onChange={(e) => {
                                if (e.target.value === '') return
                                setSelectedLayer({
                                  ...selectedLayer,
                                  bgPaddingX: parseInt(e.target.value),
                                })
                                setLayers(
                                  layers.map((layer) =>
                                    layer.id === selectedLayer.id
                                      ? {
                                          ...layer,
                                          bgPaddingX: parseInt(e.target.value),
                                        }
                                      : layer
                                  )
                                )
                              }}
                              onBlur={(e) => {
                                if (e.target.value === '') {
                                  e.target.value =
                                    selectedLayer.bgPaddingX.toString()
                                }
                              }}
                              leftLabel={
                                <Label
                                  htmlFor="bgPaddingX"
                                  className="w-4 text-center text-muted-foreground"
                                >
                                  <AlignHorizontalSpaceAround className="h-4 w-4" />
                                </Label>
                              }
                              className="pl-10"
                            />
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <span className="font-medium">
                              Horizontal Padding
                            </span>
                          </TooltipContent>
                        </Tooltip>
                        {/* BG Padding Y */}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Input
                              id="bgPaddingY"
                              type="number"
                              step={1}
                              min={0}
                              defaultValue={selectedLayer.bgPaddingY}
                              onChange={(e) => {
                                if (e.target.value === '') return
                                setSelectedLayer({
                                  ...selectedLayer,
                                  bgPaddingY: parseInt(e.target.value),
                                })
                                setLayers(
                                  layers.map((layer) =>
                                    layer.id === selectedLayer.id
                                      ? {
                                          ...layer,
                                          bgPaddingY: parseInt(e.target.value),
                                        }
                                      : layer
                                  )
                                )
                              }}
                              onBlur={(e) => {
                                if (e.target.value === '') {
                                  e.target.value =
                                    selectedLayer.bgPaddingY.toString()
                                }
                              }}
                              leftLabel={
                                <Label
                                  htmlFor="bgPaddingY"
                                  className="w-4 text-center text-muted-foreground"
                                >
                                  <AlignVerticalSpaceAround className="h-4 w-4" />
                                </Label>
                              }
                              className="pl-10"
                            />
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <span className="font-medium">
                              Vertical Padding
                            </span>
                          </TooltipContent>
                        </Tooltip>
                        {/* BG Corner radius */}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Input
                              id="bgCornerRadius"
                              type="number"
                              step={1}
                              min={0}
                              max={999}
                              defaultValue={selectedLayer.bgCornerRadius}
                              onChange={(e) => {
                                if (e.target.value === '') return
                                setSelectedLayer({
                                  ...selectedLayer,
                                  bgCornerRadius: parseInt(e.target.value),
                                })
                                setLayers(
                                  layers.map((layer) =>
                                    layer.id === selectedLayer.id
                                      ? {
                                          ...layer,
                                          bgCornerRadius: parseInt(
                                            e.target.value
                                          ),
                                        }
                                      : layer
                                  )
                                )
                              }}
                              onBlur={(e) => {
                                if (e.target.value === '') {
                                  e.target.value =
                                    selectedLayer.bgCornerRadius.toString()
                                }
                              }}
                              leftLabel={
                                <Label
                                  htmlFor="bgCornerRadius"
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
                        {/* BG Opacity */}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Input
                              id="bgOpacity"
                              type="number"
                              step={0.1}
                              min={0}
                              max={1}
                              defaultValue={selectedLayer.bgOpacity}
                              onChange={(e) => {
                                if (e.target.value === '') return
                                setSelectedLayer({
                                  ...selectedLayer,
                                  bgOpacity: parseFloat(e.target.value),
                                })
                                setLayers(
                                  layers.map((layer) =>
                                    layer.id === selectedLayer.id
                                      ? {
                                          ...layer,
                                          bgOpacity: parseFloat(e.target.value),
                                        }
                                      : layer
                                  )
                                )
                              }}
                              onBlur={(e) => {
                                if (e.target.value === '') {
                                  e.target.value =
                                    selectedLayer.bgOpacity.toString()
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
                        {/* BG Color */}
                        <Input
                          id="bgColor"
                          type="color"
                          defaultValue={selectedLayer.bgColor}
                          onChange={(e) => {
                            if (e.target.value === '') return
                            setSelectedLayer({
                              ...selectedLayer,
                              bgColor: e.target.value,
                            })
                            setLayers(
                              layers.map((layer) =>
                                layer.id === selectedLayer.id
                                  ? { ...layer, bgColor: e.target.value }
                                  : layer
                              )
                            )
                          }}
                          leftLabel={
                            <Label
                              htmlFor="bg-color"
                              className="w-6 text-center text-muted-foreground"
                            >
                              Fill
                            </Label>
                          }
                          className="py-1.5 pl-12"
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </>
            )}
            {/* CONDITIONAL VISIBILITY */}
            <>
              <Separator />
              <Tabs
                defaultValue={
                  selectedLayer.conditionalVisibility ? 'yes' : 'no'
                }
                onValueChange={(value) => {
                  setSelectedLayer({
                    ...selectedLayer,
                    conditionalVisibility: value === 'yes',
                    conditionalVisibilityVariableName:
                      value === 'yes'
                        ? getConditionalVisibilityVariableName(selectedLayer)
                        : '',
                  })
                  setLayers(
                    layers.map((layer) =>
                      layer.id === selectedLayer.id
                        ? {
                            ...layer,
                            conditionalVisibility: value === 'yes',
                            conditionalVisibilityVariableName:
                              value === 'yes'
                                ? getConditionalVisibilityVariableName(
                                    selectedLayer
                                  )
                                : '',
                          }
                        : layer
                    )
                  )
                }}
                className="flex h-fit w-full flex-col items-start justify-start p-4"
              >
                <span className="text-lg font-semibold">
                  Conditional visibility
                </span>
                <TabsList className="mt-2 w-full border">
                  <TabsTrigger value="no" className="h-full w-full py-[5px]">
                    No
                  </TabsTrigger>
                  <TabsTrigger value="yes" className="h-full w-full py-[5px]">
                    Yes
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="no">
                  <span className="text-sm text-muted-foreground">
                    The layer will always be visible.
                  </span>
                </TabsContent>
                <TabsContent value="yes">
                  <span className="text-sm text-muted-foreground">
                    {`The layer will be visible only when the variable "${selectedLayer.name
                      .replace(/[^a-zA-Z0-9]/g, '_')
                      .toLowerCase()}_isVisible" is true.`}
                  </span>
                </TabsContent>
              </Tabs>
            </>
          </TooltipProvider>
        </ScrollArea>
      ) : multiSelectedLayers.length >= 2 ? (
        <>
          <ScrollArea className="flex h-full w-full flex-col items-start justify-start">
            {/* Selection */}
            <div className="flex h-fit w-full flex-col items-start justify-start gap-2 p-4">
              <span className="h-8 text-lg font-semibold">Selection</span>
              <div className="grid w-full grid-cols-2 items-center gap-2">
                {template && (
                  <>
                    <Input
                      key="selctionX"
                      id="selectionX"
                      type="number"
                      step={10}
                      min={0}
                      max={1200}
                      value={selectionX}
                      onChange={(e) => {
                        if (e.target.value === '') return
                        setSelectionX(parseInt(e.target.value))
                        // move all selected layers by the difference
                        const diff = parseInt(e.target.value) - selectionX
                        setMultiSelectedLayers(
                          multiSelectedLayers.map((layer) => ({
                            ...layer,
                            x: layer.x + diff,
                          }))
                        )
                        setLayers(
                          layers.map((layer) =>
                            multiSelectedLayers.find((l) => l.id === layer.id)
                              ? { ...layer, x: layer.x + diff }
                              : layer
                          )
                        )
                      }}
                      onBlur={(e) => {
                        if (e.target.value === '') {
                          e.target.value = selectionX.toString()
                        }
                      }}
                      leftLabel={
                        <Label
                          htmlFor="selectionX"
                          className="w-4 text-center text-muted-foreground"
                        >
                          X
                        </Label>
                      }
                      className="pl-10"
                    />
                    <Input
                      key="selctionY"
                      id="selectionY"
                      type="number"
                      step={10}
                      min={0}
                      max={630}
                      value={selectionY}
                      onChange={(e) => {
                        if (e.target.value === '') return
                        setSelectionY(parseInt(e.target.value))
                        // move all selected layers by the difference
                        const diff = parseInt(e.target.value) - selectionY
                        setMultiSelectedLayers(
                          multiSelectedLayers.map((layer) => ({
                            ...layer,
                            y: layer.y + diff,
                          }))
                        )
                        setLayers(
                          layers.map((layer) =>
                            multiSelectedLayers.find((l) => l.id === layer.id)
                              ? { ...layer, y: layer.y + diff }
                              : layer
                          )
                        )
                      }}
                      onBlur={(e) => {
                        if (e.target.value === '') {
                          e.target.value = selectionY.toString()
                        }
                      }}
                      leftLabel={
                        <Label
                          htmlFor="selectionY"
                          className="w-4 text-center text-muted-foreground"
                        >
                          Y
                        </Label>
                      }
                      className="pl-10"
                    />
                  </>
                )}
              </div>
            </div>
          </ScrollArea>
        </>
      ) : (
        <ScrollArea className="flex h-full w-full flex-col items-start justify-start">
          {/* PROPERTIES */}
          <div className="flex h-fit w-full flex-col items-start justify-start gap-2 p-4">
            <span className="h-8 text-lg font-semibold">Template</span>
            <div className="grid w-full grid-cols-2 items-center gap-2">
              {template && (
                <>
                  <Input
                    id="name"
                    type="text"
                    defaultValue={template?.name}
                    onChange={(e) => {
                      setTemplate({
                        ...template,
                        name: e.target.value,
                      })
                    }}
                    leftLabel={
                      <Label
                        htmlFor="name"
                        className="w-[2.75rem] text-center text-muted-foreground"
                      >
                        Name
                      </Label>
                    }
                    className="py-1.5 pl-[4.25rem]"
                    containerClassName="col-span-2"
                  />
                  <Input
                    id="width"
                    type="text"
                    value="1200px"
                    disabled
                    leftLabel={
                      <Label
                        htmlFor="width"
                        className="w-[2.75rem] text-center text-muted-foreground"
                      >
                        Width
                      </Label>
                    }
                    className="py-1.5 pl-[4.25rem]"
                    containerClassName="col-span-2"
                  />
                  <Input
                    id="height"
                    type="text"
                    value="630px"
                    disabled
                    leftLabel={
                      <Label
                        htmlFor="height"
                        className="w-[2.75rem] text-center text-muted-foreground"
                      >
                        Height
                      </Label>
                    }
                    className="py-1.5 pl-[4.25rem]"
                    containerClassName="col-span-2"
                  />
                </>
              )}
            </div>
          </div>
        </ScrollArea>
      )}
    </div>
  )
}
