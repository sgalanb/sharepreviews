'use server'

import { redirect } from 'next/navigation'

export async function redirectAction(href: string) {
  return redirect(href)
}
