import Home from '@/app/(marketing)/page'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'SharePreviews | Boost your links engagement with stunning social cards',
  robots: {
    index: false,
  },
}

export default async function NoIndexHome() {
  return <Home />
}
