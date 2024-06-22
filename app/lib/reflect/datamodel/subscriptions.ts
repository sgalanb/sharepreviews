import {
  getClientState,
  mustGetClientState,
} from '@/app/lib/reflect/datamodel/client-state'
import { getLayer, listLayersIDs } from '@/app/lib/reflect/datamodel/layers'
import { M } from '@/app/lib/reflect/datamodel/mutators'
import type { Reflect } from '@rocicorp/reflect/client'
import { usePresence, useSubscribe } from '@rocicorp/reflect/react'

export function useLayersIDs(reflect: Reflect<M>) {
  return useSubscribe(reflect, listLayersIDs, [])
}

export function useLayerByID(reflect: Reflect<M>, id: string) {
  return useSubscribe(reflect, (tx) => getLayer(tx, id), null)
}

export function useCollaboratorIDs(reflect: Reflect<M>) {
  const clientIDs = usePresence(reflect)
  return clientIDs.filter((id) => id !== reflect.clientID)
}

export function useCollaboratorStates(
  reflect: Reflect<M>,
  clientIDs: string[]
) {
  return useSubscribe(
    reflect,
    async (tx) => {
      return Promise.all(
        clientIDs.map((id) => getClientState(tx, { clientID: id }))
      )
    },
    []
  )
}

export function useMyUserInfo(reflect: Reflect<M>) {
  return useSubscribe(
    reflect,
    async (tx) => {
      const cs = await mustGetClientState(tx)
      return cs.userInfo
    },
    null
  )
}

export function useSelectionState(reflect: Reflect<M>) {
  return useSubscribe(
    reflect,
    async (tx) => {
      const cs = await mustGetClientState(tx)
      const { selectedID, overID } = cs
      return { selectedID, overID }
    },
    { selectedID: '', overID: '' }
  )
}

export function useClientState(reflect: Reflect<M>, clientID: string) {
  return useSubscribe(
    reflect,
    async (tx) => {
      return await getClientState(tx, { clientID })
    },
    null
  )
}
