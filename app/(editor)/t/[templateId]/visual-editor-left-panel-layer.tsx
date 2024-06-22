import { M } from '@/app/lib/reflect/datamodel/mutators'
import {
  useCollaboratorIDs,
  useCollaboratorStates,
  useLayerByID,
} from '@/app/lib/reflect/datamodel/subscriptions'
import { Button } from '@/app/ui/components/Button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/ui/components/Tooltip'
import DeleteLayerDialog from '@/app/ui/dialogs/delete-layer-dialog'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Reflect } from '@rocicorp/reflect/client'
import {
  CopyPlus,
  GripHorizontal,
  Image,
  Square,
  Trash2,
  Type,
} from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

export default function VisualEditorLeftPanelLayer({
  reflect,
  id,
  index,
  layersLength,
  selectedID,
}: {
  reflect: Reflect<M>
  id: string
  index: number
  layersLength: number
  selectedID: string
}) {
  const layer = useLayerByID(reflect, id)

  const collaboratorIDs = useCollaboratorIDs(reflect)
  const collaboratorStates = useCollaboratorStates(reflect, collaboratorIDs)

  const selectionColor = collaboratorStates.find(
    (state) => state?.selectedID === id
  )?.userInfo.color

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    borderColor: isDragging
      ? 'hsl(var(--ring))'
      : selectedID === id
        ? 'hsl(var(--background))'
        : selectionColor
          ? selectionColor
          : 'hsl(var(--background))',
    backgroundColor:
      selectedID === id
        ? 'hsl(var(--accent))'
        : selectionColor
          ? selectionColor
          : 'hsl(var(--background)',
  }

  if (!layer) return null

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={(event) => {
        event.stopPropagation()
        reflect.mutate.selectLayer(id)
      }}
      className={`flex select-none items-center justify-between gap-2 rounded-sm border-2 p-1.5`}
    >
      <div className="flex items-center justify-start gap-2">
        {layer.type === 'text' ? (
          <Type
            className={`${
              selectedID === id
                ? 'stroke-foreground'
                : 'stroke-neutral-300 dark:stroke-secondary'
            } h-5 w-5 shrink-0`}
          />
        ) : layer.type === 'image' ? (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image
            className={`${
              selectedID === id
                ? 'stroke-foreground'
                : 'stroke-neutral-300 dark:stroke-secondary'
            } h-5 w-5 shrink-0`}
          />
        ) : (
          layer.type === 'shape' && (
            <Square
              className={`${
                selectedID === id
                  ? 'stroke-foreground'
                  : 'stroke-neutral-300 dark:stroke-secondary'
              } h-5 w-5 shrink-0`}
            />
          )
        )}
        <span className="line-clamp-1 break-all text-sm">{layer.name}</span>
      </div>
      <TooltipProvider>
        <div className="flex">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={`${selectedID === id ? '' : 'hidden'} aspect-square h-8 p-0 hover:bg-neutral-200 dark:hover:bg-neutral-600`}
                onClick={(e) => {
                  e.stopPropagation()
                  // Duplicate layer
                  const newLayer = {
                    ...layer,
                    id: uuidv4(),
                    name: `${layer.name} copy`,
                  }
                  reflect.mutate.setLayer(newLayer)
                  reflect.mutate.selectLayer(newLayer.id)
                }}
              >
                <CopyPlus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span className="font-normal">Duplicate layer</span>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <DeleteLayerDialog
              trigger={
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`${selectedID === id ? '' : 'hidden'} aspect-square h-8 p-0 hover:bg-neutral-200 dark:hover:bg-neutral-600`}
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
              }
              reflect={reflect}
              layerId={id}
            />
            <TooltipContent>
              <span className="font-normal">Delete layer</span>
            </TooltipContent>
          </Tooltip>

          <Button
            {...attributes}
            {...listeners}
            variant="ghost"
            className={`${selectedID === id || selectionColor ? 'hover:bg-neutral-200 dark:hover:bg-neutral-600' : ''} ${
              isDragging ? 'cursor-grabbing ' : 'cursor-grab'
            } aspect-square h-8 p-0`}
          >
            <GripHorizontal className="h-4 w-4 fill-muted-foreground" />
          </Button>
        </div>
      </TooltipProvider>
    </div>
  )
}
