import { db } from '@/app/db'
import { templates } from '@/app/db/schema'
import { eq } from 'drizzle-orm'

export async function getProjectsTemplates(projectId: string) {
  return await db.query['templates'].findMany({
    where: eq(templates.projectId, projectId),
  })
}

export async function getTemplateById(id: string) {
  return await db.query['templates'].findFirst({
    where: eq(templates.id, id),
  })
}

export async function createTemplate({
  id,
  name,
  projectId,
  layersData,
}: {
  id: string
  name: string
  projectId: string
  layersData: string
}) {
  return await db.insert(templates).values({
    id,
    name,
    projectId,
    layersData,
    updatedAt: new Date(),
  })
}

export async function updateTemplate({
  id,
  name,
  layersData,
}: {
  id: string
  name: string
  layersData: string
}) {
  return await db
    .update(templates)
    .set({
      name: name,
      layersData: layersData,
      updatedAt: new Date(),
    })
    .where(eq(templates.id, id))
}
