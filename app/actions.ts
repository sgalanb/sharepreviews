'use server'

import { createProject } from '@/app/db/operations/projects'
import {
  createTemplate,
  deleteTemplate,
  updateTemplate,
} from '@/app/db/operations/templates'
import { createUploadedImage } from '@/app/db/operations/uploaded_images'
import {
  createOrUpdateTemplateRedis,
  deleteTemplateRedis,
} from '@/app/lib/upstash'
import { logOutUser } from '@/app/lib/workos'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Resend } from 'resend'
import { v4 as uuidv4 } from 'uuid'

export async function addContactToGeneralAudience(formData: FormData) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  const rawFormData = {
    email: formData.get('email') as string,
  }

  await resend.contacts.create({
    email: rawFormData.email,
    audienceId: '814b11f0-62c3-4187-a593-4d8e94bf3fd9', // General audience id
  })
}

export async function redirectAction(href: string) {
  return redirect(href)
}

export async function logout() {
  logOutUser()
  redirect('/')
}

export async function createProjectAction({
  name,
  userId,
}: {
  name: string
  userId: string
}) {
  await createProject({
    name,
    userId,
  })

  revalidatePath('/', 'layout')
}

export async function createTemplateAction({
  name,
  projectId,
  projectPathname,
  layersData,
}: {
  name: string
  projectId: string
  projectPathname: string
  layersData: string
}) {
  const newId = uuidv4()

  const createPostgres = await createTemplate({
    id: newId,
    name,
    projectId,
    layersData,
  })

  const createRedis = createOrUpdateTemplateRedis({
    templateId: newId,
    layersData,
  })

  await Promise.all([createPostgres, createRedis]).then(() => {
    redirect(`/${projectPathname}/templates/${newId}/edit`)
  })
}

export async function updateTemplateAction({
  id,
  name,
  projectPathname,
  layersData,
}: {
  id: string
  name: string
  projectPathname: string
  layersData: string
}) {
  const updatePostgres = await updateTemplate({
    id,
    name,
    layersData,
  })

  const updateRedis = createOrUpdateTemplateRedis({
    templateId: id,
    layersData,
  })

  await Promise.all([updatePostgres, updateRedis]).then(() => {
    redirect(`/${projectPathname}/templates`)
  })
}

export async function deleteTemplateAction({ id }: { id: string }) {
  const deletePostgres = await deleteTemplate(id)
  const deleteRedis = deleteTemplateRedis(id)

  await Promise.all([deletePostgres, deleteRedis])
}

export async function createUploadedImageAction({
  key,
  url,
  userId,
}: {
  key: string
  url: string
  userId: string
}) {
  await createUploadedImage({
    key,
    url,
    userId,
  })
}

export async function suscribeToProAction({
  userId,
  email,
  name,
}: {
  userId: string
  email: string
  name: string
}) {
  const checkout = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
    },
    body: JSON.stringify({
      data: {
        type: 'checkouts',
        attributes: {
          checkout_data: {
            email: email,
            name: name,
            custom: {
              userId: userId, // WorkOS user id
            },
          },
        },
        relationships: {
          store: {
            data: {
              type: 'stores',
              id: process.env.LEMON_SQUEEZY_STORE_ID,
            },
          },
          variant: {
            data: {
              type: 'variants',
              id: process.env.LEMON_SQUEEZY_PRO_VARIANT_ID,
            },
          },
        },
      },
    }),
  }).then((response) => response.json())

  const checkoutUrl = checkout.data.attributes.url
  redirect(checkoutUrl)
}
