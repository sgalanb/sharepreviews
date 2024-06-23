import {
  initClientState,
  overLayer,
  selectLayer,
  setCursor,
} from '@/app/lib/reflect/datamodel/client-state'
import {
  deleteLayer,
  initLayer,
  setLayer,
} from '@/app/lib/reflect/datamodel/layers'
import { initTemplate, setTemplate } from '@/app/lib/reflect/datamodel/template'
import type { WriteTransaction } from '@rocicorp/reflect'

export type M = typeof serverMutators

export const serverMutators = {
  initClientState,
  setCursor,
  initTemplate,
  setTemplate,
  initLayer,
  setLayer,
  overLayer,
  selectLayer,
  deleteLayer,
  nop: async (_: WriteTransaction) => {},
}

export const clientMutators: M = {
  ...serverMutators,
}
