import { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'sharepreviews | Boost your links engagement with stunning social cards',
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
}

export default async function Home() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 p-4"></div>
  )
}
