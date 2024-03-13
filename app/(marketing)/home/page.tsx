import Home from '@/app/(marketing)/page'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home | sharepreviews',
  robots: 'noindex, nofollow',
}

export default async function NoIndexHome() {
  return <Home />
}
