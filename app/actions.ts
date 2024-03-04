'use server'

import { createProject } from '@/app/db/operations/projects'
import { logOutUser } from '@/app/lib/workos'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Resend } from 'resend'

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
  formData,
  userId,
}: {
  formData: FormData
  userId: string
}) {
  const rawFormData = {
    name: formData.get('name') as string,
  }

  await createProject({
    name: rawFormData.name,
    userId: userId,
  })

  revalidatePath('/', 'layout')
}

export async function createTemplate(formData: FormData) {}
