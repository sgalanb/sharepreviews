import {
  initClientState,
  overLayer,
  selectLayer,
  setCursor,
} from '@/app/lib/reflect/datamodel/client-state'
import { deleteLayer, setLayer } from '@/app/lib/reflect/datamodel/layers'
import type { WriteTransaction } from '@rocicorp/reflect'

export type M = typeof serverMutators

export const serverMutators = {
  setLayer,
  initClientState,
  setCursor,
  overLayer,
  selectLayer,
  deleteLayer,
  nop: async (_: WriteTransaction) => {},
}

export const clientMutators: M = {
  ...serverMutators,
}
