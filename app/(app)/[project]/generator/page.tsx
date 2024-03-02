import { db } from '@/app/db'
import { projects } from '@/app/db/schema'
import { getUser } from '@/app/lib/workos'
import { Button } from '@/app/ui/components/Button'
import { Separator } from '@/app/ui/components/Separator'
import NewTemplateDialog from '@/app/ui/dialogs/new-template-dialog'
import { eq } from 'drizzle-orm'

export default async function GeneratorPage() {
  const { user } = await getUser()
  const userProjects = await db.query['projects'].findMany({
    where: eq(projects.userId, user?.id!),
  })

  return (
    <div className="flex w-full max-w-7xl flex-col items-center justify-center gap-4 p-4 lg:p-12">
      <div className="flex w-full items-center justify-between">
        <span className="text-2xl">Your templates</span>
        <NewTemplateDialog
          trigger={<Button>New template</Button>}
          userProjects={userProjects}
        />
      </div>
      <Separator />
    </div>
  )
}
