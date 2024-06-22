import { getParse } from '@/app/lib/reflect/datamodel/zod'
import { randomInt } from '@/app/utils'
import { generatePresence } from '@rocicorp/rails'
import type { WriteTransaction } from '@rocicorp/reflect'
import { z } from 'zod'

const colors = [
  '#f94144',
  '#f3722c',
  '#f8961e',
  '#f9844a',
  '#f9c74f',
  '#90be6d',
  '#43aa8b',
  '#4d908e',
  '#577590',
  '#277da1',
]

export const userInfoSchema = z.object({
  color: z.string(),
})

export const clientStateSchema = z.object({
  clientID: z.string(),
  cursor: z.union([
    z.object({
      x: z.number(),
      y: z.number(),
    }),
    z.null(),
  ]),
  overID: z.string(),
  selectedID: z.string(),
  userInfo: userInfoSchema,
})

export type UserInfo = z.infer<typeof userInfoSchema>
export type ClientState = z.infer<typeof clientStateSchema>

export const {
  init: initClientState,
  get: getClientState,
  mustGet: mustGetClientState,
  set: setClientState,
  update: updateClientState,
} = generatePresence('client-state', getParse(clientStateSchema))

export async function setCursor(
  tx: WriteTransaction,
  { x, y }: { x: number; y: number }
): Promise<void> {
  await updateClientState(tx, { cursor: { x, y } })
}

export async function overLayer(
  tx: WriteTransaction,
  shapeID: string
): Promise<void> {
  await updateClientState(tx, { overID: shapeID })
}

export async function selectLayer(
  tx: WriteTransaction,
  shapeID: string
): Promise<void> {
  await updateClientState(tx, { selectedID: shapeID })
}

export function randUserInfo(): UserInfo {
  return {
    color: colors[randomInt(0, colors.length - 1)],
  }
}
