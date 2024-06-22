import { M } from '@/app/lib/reflect/datamodel/mutators'
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
import type { Reflect } from '@rocicorp/reflect/client'

export default function DeleteLayerDialog({
  trigger,
  reflect,
  layerId,
}: {
  trigger: React.ReactNode
  reflect: Reflect<M>
  layerId: string
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
                reflect.mutate.deleteLayer(layerId)
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
