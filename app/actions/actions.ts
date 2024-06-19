'use server'

import {
  createOrUpdateTemplateRedis,
  deleteTemplateRedis,
  getTemplateInfoRedis,
  getTemplateRedis,
} from '@/app/lib/upstash'
import { redirect } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

export async function redirectAction(href: string) {
  return redirect(href)
}

export async function createOrUpdateTemplateAction({
  action,
  name,
  layersData,
}: {
  action: 'create' | 'update'
  name: string
  layersData: string
}) {
  const newId = uuidv4()

  const createOrUpdateRedis = createOrUpdateTemplateRedis({
    templateId: newId,
    layersData,
    name,
  })

  await createOrUpdateRedis
    .then(() => {
      if (action === 'create') {
        redirect(`/t/${newId}`)
      } else return 'Template updated'
    })
    .catch((e) => {
      console.error(e)
      throw new Error('Error creating template')
    })
}

export async function duplicateTemplateAction({
  templateId,
}: {
  templateId: string
}) {
  const templateToDuplicateInfo = await getTemplateInfoRedis(templateId)
  const templateToDuplicate = await getTemplateRedis(templateId)

  const newId = uuidv4()

  if (templateToDuplicate && templateToDuplicateInfo) {
    const createRedis = createOrUpdateTemplateRedis({
      templateId: newId,
      name: templateToDuplicateInfo.name,
      layersData: JSON.stringify(templateToDuplicate),
    })

    await createRedis
      .then(() => {
        redirect(`/t/${templateId}t`)
      })
      .catch((e) => {
        console.error(e)
        throw new Error('Error duplicating template')
      })
  } else {
    throw new Error('Template not found')
  }
}

export async function deleteTemplateAction({ id }: { id: string }) {
  await deleteTemplateRedis(id)
}
