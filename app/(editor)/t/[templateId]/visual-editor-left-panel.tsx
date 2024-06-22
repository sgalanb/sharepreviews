'use client'

import VisualEditorLeftPanelLayersList from '@/app/(editor)/t/[templateId]/visual-editor-left-panel-layers-list'
import { ShapeLayerType } from '@/app/lib/reflect/datamodel/layers'
import { M } from '@/app/lib/reflect/datamodel/mutators'
import {
  useLayers,
  useSelectionState,
} from '@/app/lib/reflect/datamodel/subscriptions'
import { Input } from '@/app/ui/components/Input'
import { Label } from '@/app/ui/components/Label'
import { Separator } from '@/app/ui/components/Separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/ui/components/Tooltip'
import type { Reflect } from '@rocicorp/reflect/client'
import { Info } from 'lucide-react'

export default function VisualEditorLeftPanel({
  reflect,
}: {
  reflect: Reflect<M>
}) {
  const { selectedID, overID } = useSelectionState(reflect)
  const layers = useLayers(reflect)

  const backgroundLayer = layers.find(
    (layer) => layer.positionZ === 0 && layer.type === 'shape'
  ) as ShapeLayerType

  return (
    <div
      className="flex h-full w-full flex-col items-start justify-between rounded-l-lg border-r"
      onClick={() => {
        selectedID && reflect.mutate.selectLayer('')
      }}
    >
      {/* LAYERS */}
      <VisualEditorLeftPanelLayersList reflect={reflect} />

      {/* BACKGROUND */}
      <div className="h-28 w-full">
        <Separator />
        <div className="flex h-fit w-full flex-col items-start justify-start gap-2 p-4">
          <div className="flex h-8 w-full items-center justify-start gap-2">
            <span className="text-lg font-semibold">Background</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent className="w-64">
                  <span className="font-normal">
                    For more complex backgrounds you can add a full size{' '}
                    <strong>image layer</strong> and drag it to the bottom of
                    the layers list.
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="grid w-full grid-cols-2 items-center gap-2">
            <Input
              type="color"
              id="background-color"
              value={backgroundLayer.color}
              onChange={(e) =>
                reflect.mutate.setLayer({
                  ...backgroundLayer,
                  color: e.target.value,
                })
              }
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
  )
}
