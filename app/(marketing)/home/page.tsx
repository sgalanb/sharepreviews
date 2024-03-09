import Home from '@/app/(marketing)/page'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'sharepreviews | Boost your links engagement with stunning preview cards',
  description:
    'Create auto-generated open graph images for your website. Check how your links look when shared on social media.',
  alternates: {
    canonical: 'https://sharepreviews.com',
  },
  openGraph: {
    url: 'https://sharepreviews.com',
    type: 'website',
    siteName: 'sharepreviews',
  },
  twitter: {
    site: '@sgalanb',
    creator: '@sgalanb',
    card: 'summary_large_image',
  },
  robots: 'noindex, nofollow',
}

export default async function NoIndexHome() {
  return <Home />
}
