import { LayerType } from '@/app/(editor)/[project]/templates/[templateId]/edit/page'
import { Button } from '@/app/ui/components/Button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/ui/components/Dialog'
import { Dispatch, SetStateAction } from 'react'

export default function DeleteLayerDialog({
  trigger,
  layers,
  setLayers,
  selectedLayer,
  setSelectedLayer,
}: {
  trigger: React.ReactNode
  layers: LayerType[]
  setLayers: Dispatch<SetStateAction<LayerType[]>>
  selectedLayer: LayerType | undefined
  setSelectedLayer: Dispatch<SetStateAction<LayerType | undefined>>
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete layer</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this layer?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose>
            <Button
              onClick={() => {
                setLayers(
                  layers.filter((layer) => layer.id !== selectedLayer?.id)
                )
                setSelectedLayer(undefined)
              }}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
