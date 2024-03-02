import { db } from '@/app/db'
import { projects } from '@/app/db/schema'
import { getUser } from '@/app/lib/workos'
import { Button } from '@/app/ui/components/Button'
import { Separator } from '@/app/ui/components/Separator'
import NewProjectDialog from '@/app/ui/dialogs/new-project-dialog'
import { eq } from 'drizzle-orm'

export default async function Overview() {
  const { user } = await getUser()
  const userProjects = await db.query['projects'].findMany({
    where: eq(projects.userId, user?.id!),
  })

  return (
    <div
      className={`flex w-full max-w-7xl flex-col items-center justify-center gap-4 p-4 lg:p-12`}
    >
      <div className="flex w-full items-center justify-between">
        <span className="text-2xl">Your projects</span>
        <NewProjectDialog
          trigger={<Button>New project</Button>}
          userId={user?.id!}
        />
      </div>
      <Separator />
      <div className="flex w-full flex-col items-start justify-center gap-2">
        {userProjects.map((project) => (
          <span key={project.id}>{project.name}</span>
        ))}
      </div>
      <Separator />
      <div className="flex w-full flex-col items-center justify-center gap-8 p-4">
        <div className="flex flex-col gap-2">
          <p>Your projects</p>
          <div className="flex gap-2">
            <p>dolarya.info</p>
            <span>2 dynamic images</span>
            <span>10 static images</span>
          </div>
        </div>
      </div>
    </div>
  )
}
