'use client'

import { LayerType } from '@/app/lib/reflect/datamodel/layers'
import { M } from '@/app/lib/reflect/datamodel/mutators'
import {
  useLayerByID,
  useSelectionState,
  useTemplates,
} from '@/app/lib/reflect/datamodel/subscriptions'
import { Button } from '@/app/ui/components/Button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
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
import { cn } from '@/app/utils'
import type { Reflect } from '@rocicorp/reflect/client'
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  ArrowDownToLine,
  ArrowUpToLine,
  BlendIcon,
  Check,
  ChevronsUpDown,
  FoldVertical,
  RotateCw,
  Spline,
} from 'lucide-react'
import { useEffect, useState } from 'react'

export default function VisualEditorRightPanel({
  reflect,
  availableFonts,
}: {
  reflect: Reflect<M>
  availableFonts: any[]
}) {
  const { selectedID, overID } = useSelectionState(reflect)
  const selectedLayer = useLayerByID(reflect, selectedID)

  const templates = useTemplates(reflect) // Will be only one template

  const [openFontsCombobox, setOpenFontsCombobox] = useState<boolean>(false)
  const [fontsComboboxValue, setFontsComboboxValue] = useState<string>()

  useEffect(() => {
    setFontsComboboxValue(
      selectedLayer?.type === 'text' ? selectedLayer?.fontFamily || '' : ''
    )
  }, [selectedLayer])

  return (
    <div className="flex h-full w-full flex-col items-start justify-between overflow-hidden border-l">
      {selectedLayer ? (
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

                    reflect.mutate.setLayer(newLayerName)
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
                  step={1}
                  value={selectedLayer.positionX}
                  onChange={(e) => {
                    if (e.target.value === '') return
                    reflect.mutate.setLayer({
                      ...selectedLayer,
                      positionX: parseInt(e.target.value),
                    })
                  }}
                  onBlur={(e) => {
                    if (e.target.value === '') {
                      e.target.value = selectedLayer.positionX.toString()
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
                  step={1}
                  value={selectedLayer.positionY}
                  onChange={(e) => {
                    if (e.target.value === '') return
                    reflect.mutate.setLayer({
                      ...selectedLayer,
                      positionY: parseInt(e.target.value),
                    })
                  }}
                  onBlur={(e) => {
                    if (e.target.value === '') {
                      e.target.value = selectedLayer.positionY.toString()
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
                  id="widthFixed"
                  type="number"
                  step={10}
                  value={selectedLayer.width}
                  onChange={(e) => {
                    if (e.target.value === '') return
                    reflect.mutate.setLayer({
                      ...selectedLayer,
                      width: parseInt(e.target.value),
                    })
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
                {selectedLayer.type !== 'text' ? (
                  <Input
                    id="heightFixed"
                    type="number"
                    step={10}
                    value={selectedLayer.height}
                    onChange={(e) => {
                      if (e.target.value === '') return
                      reflect.mutate.setLayer({
                        ...selectedLayer,
                        height: parseInt(e.target.value),
                      })
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
                        reflect.mutate.setLayer({
                          ...selectedLayer,
                          rotation: parseInt(e.target.value),
                        })
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
                        reflect.mutate.setLayer({
                          ...selectedLayer,
                          opacity: parseFloat(e.target.value),
                        })
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
                          reflect.mutate.setLayer({
                            ...selectedLayer,
                            cornerRadius: parseInt(e.target.value),
                          })
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
                      reflect.mutate.setLayer({
                        ...selectedLayer,
                        objectFit: value as 'fill' | 'contain' | 'cover',
                      })
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
                {selectedLayer.type === 'shape' && (
                  <Input
                    id="color"
                    type="color"
                    defaultValue={selectedLayer.color}
                    onChange={(e) => {
                      if (e.target.value === '') return
                      reflect.mutate.setLayer({
                        ...selectedLayer,
                        color: e.target.value,
                      })
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
            {/* VALUE */}
            {selectedLayer?.type === 'text' && (
              <>
                <Separator />
                <div className="flex w-full items-center justify-between">
                  <span className="text-lg font-semibold">Value</span>
                </div>
                <Input
                  type="text"
                  id="value"
                  defaultValue={selectedLayer.textValue}
                  onChange={(e) => {
                    reflect.mutate.setLayer({
                      ...selectedLayer,
                      textValue: e.target.value,
                    })
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
                <span>
                  <span className="text-sm text-muted-foreground">Use </span>
                  <span className="text-sm text-primary">
                    {'${variableName}'}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {' '}
                    to add a variable.
                  </span>
                </span>
              </>
            )}
            {selectedLayer?.type === 'image' && (
              <>
                <Separator />
                <Tabs
                  defaultValue={
                    selectedLayer.imageValue.type === 'dynamic' ? 'yes' : 'no'
                  }
                  onValueChange={(value) => {
                    reflect.mutate.setLayer({
                      ...selectedLayer,
                      imageValue: {
                        type: value === 'yes' ? 'dynamic' : 'static',
                        value: value === 'yes' ? '' : '',
                      },
                    })
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
                      defaultValue={
                        selectedLayer.imageValue.type === 'static'
                          ? selectedLayer.imageValue.value
                          : ''
                      }
                      onChange={(e) => {
                        reflect.mutate.setLayer({
                          ...selectedLayer,
                          imageValue: {
                            type: 'static',
                            value: e.target.value,
                          },
                        })
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
                              (font) => font.family === fontsComboboxValue
                            )?.family
                          }
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="h-80 w-[247px] p-0"
                        align="end"
                        sideOffset={8}
                      >
                        <Command>
                          <CommandInput placeholder="Search fonts..." />
                          <CommandEmpty>No font found.</CommandEmpty>
                          <CommandList>
                            <CommandGroup>
                              {availableFonts?.map((font, index) => (
                                <CommandItem
                                  key={index}
                                  value={font.family}
                                  onSelect={() => {
                                    setFontsComboboxValue(font.family)
                                    reflect.mutate.setLayer({
                                      ...selectedLayer,
                                      fontFamily: font.family,
                                      fontWeight: 400,
                                      fontUrl:
                                        font.files.regular ?? font.files['400'],
                                    })
                                    setOpenFontsCombobox(false)
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      fontsComboboxValue === font.family
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                  {font.family}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <Select
                      value={selectedLayer.fontWeight.toString()}
                      onValueChange={(variant: string) => {
                        reflect.mutate.setLayer({
                          ...selectedLayer,
                          fontWeight:
                            variant === 'regular' ? 400 : Number(variant),
                          fontUrl: availableFonts?.find(
                            (font) => font.family === fontsComboboxValue
                          )?.files[variant],
                        })
                      }}
                    >
                      <SelectTrigger className="col-span-2 font-medium">
                        <SelectValue placeholder="Weight" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {availableFonts
                            ?.find((font) => font.family === fontsComboboxValue)
                            ?.variants // filter all the variants that contain the word 'italic'
                            .filter(
                              (variant: string) => !variant.includes('italic')
                            )
                            .map((variant: string, index: number) => (
                              <SelectItem
                                key={index}
                                value={variant === 'regular' ? '400' : variant}
                                className={
                                  variant === '100'
                                    ? 'font-thin'
                                    : variant === '200'
                                      ? 'font-extralight'
                                      : variant === '300'
                                        ? 'font-light'
                                        : variant === 'regular' ||
                                            variant === '400'
                                          ? 'font-normal'
                                          : variant === '500'
                                            ? 'font-medium'
                                            : variant === '600'
                                              ? 'font-semibold'
                                              : variant === '700'
                                                ? 'font-bold'
                                                : variant === '800'
                                                  ? 'font-extrabold'
                                                  : variant === '900'
                                                    ? 'font-black'
                                                    : ''
                                }
                              >
                                {variant === '100'
                                  ? 'Thin'
                                  : variant === '200'
                                    ? 'Extra Light'
                                    : variant === '300'
                                      ? 'Light'
                                      : variant === 'regular' ||
                                          variant === '400'
                                        ? 'Regular'
                                        : variant === '500'
                                          ? 'Medium'
                                          : variant === '600'
                                            ? 'Semi Bold'
                                            : variant === '700'
                                              ? 'Bold'
                                              : variant === '800'
                                                ? 'Extra Bold'
                                                : variant === '900'
                                                  ? 'Black'
                                                  : ''}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {/* Size */}
                    <Input
                      id="size"
                      type="number"
                      step={1}
                      min={1}
                      defaultValue={selectedLayer.size}
                      onChange={(e) => {
                        if (e.target.value === '') return
                        reflect.mutate.setLayer({
                          ...selectedLayer,
                          size: parseInt(e.target.value),
                        })
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
                        reflect.mutate.setLayer({
                          ...selectedLayer,
                          lineHeight: Math.round(parseFloat(e.target.value)),
                        })
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
                        reflect.mutate.setLayer({
                          ...selectedLayer,
                          alignHorizontal: value as
                            | 'left'
                            | 'center'
                            | 'right'
                            | 'justify',
                        })
                      }}
                      className="flex h-full w-full flex-col items-start justify-start"
                    >
                      <TabsList className="h-full w-full border">
                        <TabsTrigger
                          value="left"
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
                          value="right"
                          className="h-full w-full px-1"
                        >
                          <AlignRight className="h-4 w-4" />
                        </TabsTrigger>
                        <TabsTrigger
                          value="justify"
                          className="h-full w-full px-1"
                        >
                          <AlignJustify className="h-4 w-4" />
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                    {/* Align vertical */}
                    <Tabs
                      defaultValue={selectedLayer.alignVertical}
                      onValueChange={(value) => {
                        reflect.mutate.setLayer({
                          ...selectedLayer,
                          alignVertical: value as 'top' | 'middle' | 'bottom',
                        })
                      }}
                      className="flex h-full w-full flex-col items-start justify-start"
                    >
                      <TabsList className="h-full w-full border">
                        <TabsTrigger value="top" className="h-full w-full px-1">
                          <ArrowUpToLine className="h-4 w-4" />
                        </TabsTrigger>
                        <TabsTrigger
                          value="middle"
                          className="h-full w-full px-1"
                        >
                          <FoldVertical className="h-4 w-4" />
                        </TabsTrigger>
                        <TabsTrigger
                          value="bottom"
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
                        reflect.mutate.setLayer({
                          ...selectedLayer,
                          color: e.target.value,
                        })
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
              </>
            )}
          </TooltipProvider>
        </ScrollArea>
      ) : (
        <ScrollArea className="flex h-full w-full flex-col items-start justify-start">
          {/* Template properties */}
          <div className="flex h-fit w-full flex-col items-start justify-start gap-2 p-4">
            <span className="h-8 text-lg font-semibold">Template</span>
            <div className="grid w-full grid-cols-2 items-center gap-2">
              {templates && (
                <>
                  <Input
                    id="name"
                    type="text"
                    value={templates[0].name}
                    onChange={(e) => {
                      if (e.target.value === '') return
                      reflect.mutate.setTemplate({
                        ...templates[0],
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
                    value={templates[0].width.toString() + 'px'}
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
                    type="number"
                    value={templates[0].height.toString() + 'px'}
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
