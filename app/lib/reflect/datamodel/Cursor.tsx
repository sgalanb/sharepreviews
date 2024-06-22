import { M } from '@/app/lib/reflect/datamodel/mutators'
import { useClientState } from '@/app/lib/reflect/datamodel/subscriptions'
import type { Reflect } from '@rocicorp/reflect/client'

export function Cursor({ r, clientID }: { r: Reflect<M>; clientID: string }) {
  const clientState = useClientState(r, clientID)

  if (!clientState || !clientState.cursor) {
    return null
  }

  const { userInfo, cursor } = clientState

  return (
    <div className="pointer-events-none absolute left-0 top-0 h-full w-full transition-opacity duration-100">
      <div
        className="absolute cursor-pointer"
        style={{
          left: cursor.x,
          top: cursor.y,
          overflow: 'auto',
        }}
      >
        <div
          className="inline-block rotate-[-127deg] text-base"
          style={{ color: userInfo.color }}
        >
          ➤
        </div>
      </div>
    </div>
  )
}
