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
  multiSelectedLayers,
  setMultiSelectedLayers,
}: {
  trigger: React.ReactNode
  layers: LayerType[]
  setLayers: Dispatch<SetStateAction<LayerType[]>>
  selectedLayer: LayerType | undefined
  setSelectedLayer: Dispatch<SetStateAction<LayerType | undefined>>
  multiSelectedLayers: LayerType[]
  setMultiSelectedLayers: Dispatch<SetStateAction<LayerType[]>>
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Delete{' '}
            {multiSelectedLayers.length > 1
              ? `${multiSelectedLayers.length} layers`
              : 'layer'}
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{' '}
            {multiSelectedLayers.length > 1
              ? `these ${multiSelectedLayers.length} layers?`
              : 'this layer?'}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose>
            <Button
              onClick={() => {
                if (multiSelectedLayers.length > 0) {
                  setLayers(
                    layers.filter(
                      (layer) =>
                        !multiSelectedLayers.find(
                          (selectedLayer) => selectedLayer.id === layer.id
                        )
                    )
                  )
                  setMultiSelectedLayers([])
                } else if (selectedLayer) {
                  setLayers(
                    layers.filter((layer) => layer.id !== selectedLayer?.id)
                  )
                  setSelectedLayer(undefined)
                  setMultiSelectedLayers([])
                }
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
