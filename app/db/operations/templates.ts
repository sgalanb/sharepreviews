import { db } from '@/app/db'
import { templates } from '@/app/db/schema'
import { eq, inArray } from 'drizzle-orm'

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

export async function getTemplateByArrayOfIds(ids: string[]) {
  return await db.query['templates'].findMany({
    where: inArray(templates.id, ids),
  })
}

export async function createTemplate({
  id,
  name,
  projectId,
  layersData,
  canvasBackgroundColor,
}: {
  id: string
  name: string
  projectId: string
  layersData: string
  canvasBackgroundColor: string
}) {
  return await db.insert(templates).values({
    id,
    name,
    projectId,
    layersData,
    canvasBackgroundColor,
    updatedAt: new Date(),
  })
}

export async function updateTemplate({
  id,
  name,
  layersData,
  canvasBackgroundColor,
}: {
  id: string
  name: string
  layersData: string
  canvasBackgroundColor: string
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

export async function deleteTemplate(id: string) {
  return await db.delete(templates).where(eq(templates.id, id))
}
