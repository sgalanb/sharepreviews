import { db } from '@/app/db'
import { projects } from '@/app/db/schema'
import { eq, sql } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'

export const getUserProjects = unstable_cache(
  async (userId: string) =>
    await db.query['projects'].findMany({
      where: eq(projects.userId, userId),
    }),
  ['projects'],
  { tags: ['projects'] }
)

export async function getProjectByPathname(pathname: string) {
  return await db.query['projects'].findFirst({
    where: eq(projects.pathname, pathname),
  })
}

async function generateUniqueProjectPathname(
  projectName: string
): Promise<string> {
  // Lowercase the project name and replace spaces and specific special characters with '-'
  const basePathname = projectName
    .toLowerCase()
    .replace(/[\s\?:@&=+$,\/%#<>\^\*|`!{};\\[\]"'~()]+/g, '-') // Replaces these special characters with '-'
    .replace(/^-+|-+$/g, '') // Remove leading and trailing dashes

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
  return await db
    .insert(projects)
    .values({
      name: name,
      userId: userId,
      pathname: await generateUniqueProjectPathname(name),
      updatedAt: new Date(),
    })
    .returning({
      insertId: projects.id,
      name: projects.name,
      userId: projects.userId,
      pathname: projects.pathname,
    })
}

export async function updateProjectSubscription({
  projectId,
  plan,
  productId,
  variantId,
  suscriptionId,
  suscriptionItemId,
}: {
  projectId: string
  plan: string
  productId: string | null
  variantId: string | null
  suscriptionId: string | null
  suscriptionItemId: string | null
}) {
  return await db
    .update(projects)
    .set({
      plan,
      productId,
      variantId,
      suscriptionId,
      suscriptionItemId,
      updatedAt: new Date(),
    })
    .where(eq(projects.id, projectId))
}

export async function incrementProjectImagesCreated({
  projectId,
  quantity,
}: {
  projectId: string
  quantity: number
}) {
  return await db
    .update(projects)
    .set({
      imagesCreated: sql`${projects.imagesCreated} + ${quantity}`,
      updatedAt: new Date(),
    })
    .where(eq(projects.id, projectId))
}
