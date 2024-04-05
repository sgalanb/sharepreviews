import { getUser } from '@/app/lib/workos'
import CreateFirstProjectDialog from '@/app/ui/dialogs/create-first-project-dialog'
import { get } from '@vercel/edge-config'

export default async function CreateProject() {
  const { user } = await getUser()
  const reservedNames = (await get('reserved-project-names')) as string[]

  return (
    <CreateFirstProjectDialog
      userId={user?.id ?? ''}
      trigger={<></>}
      reservedNames={reservedNames}
    />
  )
}
