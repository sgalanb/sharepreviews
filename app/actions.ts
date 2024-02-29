'use server'

import { logOutUser } from '@/app/lib/workos'
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
}
