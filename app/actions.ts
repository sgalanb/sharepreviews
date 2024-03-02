'use server'

import { db } from '@/app/db'
import { projects } from '@/app/db/schema'
import { logOutUser } from '@/app/lib/workos'
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

export async function logout() {
  logOutUser()
  redirect('/')
}

export async function createProject({
  formData,
  userId,
}: {
  formData: FormData
  userId: string
}) {
  const rawFormData = {
    name: formData.get('name') as string,
  }

  await db.insert(projects).values({
    name: rawFormData.name,
    userId: userId,
    updatedAt: new Date(),
  })
}

export async function createTemplate(formData: FormData) {}
