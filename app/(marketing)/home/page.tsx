import Home from '@/app/(marketing)/page'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'sharepreviews | Boost your links engagement with stunning social cards',
  robots: 'noindex, nofollow',
}

export default async function NoIndexHome() {
  return <Home />
}
