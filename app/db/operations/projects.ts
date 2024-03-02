import { db } from '@/app/db'
import { projects } from '@/app/db/schema'
import { eq } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'

export const getProjectById = unstable_cache(
  async (id: string) =>
    await db.query['projects'].findMany({
      where: eq(projects.userId, id),
    }),
  ['projects'],
  { tags: ['projects'] }
)

async function generateUniqueProjectPathname(
  projectName: string
): Promise<string> {
  const basePathname = projectName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  let uniquePathname = basePathname
  let counter = 1

  while (await projectPathnameExists(uniquePathname)) {
    uniquePathname = `${basePathname}-${counter}`
    counter++
  }

  return uniquePathname
}

async function projectPathnameExists(pathname: string): Promise<boolean> {
  const project = await db.query['projects'].findFirst({
    where: eq(projects.pathname, pathname),
  })
  return !!project
}

export async function createProject({
  name,
  userId,
}: {
  name: string
  userId: string
}) {
  return await db.insert(projects).values({
    name: name,
    userId: userId,
    pathname: await generateUniqueProjectPathname(name),
    updatedAt: new Date(),
  })
}
