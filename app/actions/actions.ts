'use server'

import { createProject } from '@/app/db/operations/projects'
import {
  createTemplate,
  deleteTemplate,
  getTemplateById,
  updateTemplate,
} from '@/app/db/operations/templates'
import { createUploadedImage } from '@/app/db/operations/uploaded_images'
import {
  createOrUpdateProjectRedis,
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
  const createdProject = await createProject({
    name,
    userId,
  })

  await createOrUpdateProjectRedis({
    id: createdProject[0].insertId,
    name: name,
    pathname: createdProject[0].pathname,
    plan: 'free',
    ownerUserId: userId,
  })

  revalidatePath('/', 'layout')
  redirect(`/${createdProject[0].pathname}`)
}

// This creates creates a project for users that pay at sign up (because a project is required at checkout)
export async function createStartWithProProject({
  userId,
}: {
  userId: string
}) {
  const name = 'Project 1'
  const createdProject = await createProject({
    name,
    userId,
  })

  await createOrUpdateProjectRedis({
    id: createdProject[0].insertId,
    name: name,
    pathname: createdProject[0].pathname,
    plan: 'free',
    ownerUserId: userId,
  })

  revalidatePath('/', 'layout')
  return { id: createdProject[0].insertId, name }
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
    canvasBackgroundColor: '#ffffff',
  })

  const createRedis = createOrUpdateTemplateRedis({
    templateId: newId,
    layersData,
    projectId,
    canvasBackgroundColor: '#ffffff',
  })

  await Promise.all([createPostgres, createRedis]).then(() => {
    redirect(`/${projectPathname}/templates/${newId}/edit`)
  })
}

export async function duplicateTemplateAction({
  templateToDuplicateId,
  targetProjectId,
  targetProjectPathname,
}: {
  templateToDuplicateId: string
  targetProjectId: string
  targetProjectPathname: string
}) {
  const templateToDuplicate = await getTemplateById(templateToDuplicateId)

  const newId = uuidv4()

  if (!templateToDuplicate) {
    return
  }

  const createPostgres = await createTemplate({
    id: newId,
    name: templateToDuplicate?.name,
    projectId: targetProjectId,
    layersData: templateToDuplicate?.layersData,
    canvasBackgroundColor: templateToDuplicate.canvasBackgroundColor,
  })

  const createRedis = createOrUpdateTemplateRedis({
    templateId: newId,
    layersData: templateToDuplicate?.layersData,
    projectId: targetProjectId,
    canvasBackgroundColor: templateToDuplicate.canvasBackgroundColor,
  })

  await Promise.all([createPostgres, createRedis]).then(() => {
    redirect(`/${targetProjectPathname}/templates/${newId}/edit`)
  })
}

export async function updateTemplateAction({
  id,
  name,
  projectId,
  projectPathname,
  layersData,
  canvasBackgroundColor,
}: {
  id: string
  name: string
  projectId: string
  projectPathname: string
  layersData: string
  canvasBackgroundColor: string
}) {
  const updatePostgres = await updateTemplate({
    id,
    name,
    layersData,
    canvasBackgroundColor,
  })

  const updateRedis = createOrUpdateTemplateRedis({
    templateId: id,
    layersData,
    projectId,
    canvasBackgroundColor,
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
