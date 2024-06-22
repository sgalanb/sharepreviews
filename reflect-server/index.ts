import { M, serverMutators } from '@/app/lib/reflect/datamodel/mutators'
import type { ReflectServerOptions } from '@rocicorp/reflect/server'

function makeOptions(): ReflectServerOptions<M> {
  return {
    mutators: serverMutators,
  }
}

export { makeOptions as default }
