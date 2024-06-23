import { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'SharePreviews: Dynamic Open Graph images Generator. No-code & Open-source.',
  description:
    'Increase click-through rates using a Figma-like editor to design your dynamic OG images.',

  alternates: {
    canonical: 'https://sharepreviews.com',
  },
  openGraph: {
    url: 'https://sharepreviews.com',
    type: 'website',
    siteName: 'SharePreviews',
    images: [
      'https://utfs.io/f/23b3b4dd-700f-45de-bb17-81ad985db1ed-k3d9cr.png',
    ],
  },
  twitter: {
    site: '@sgalanb',
    creator: '@sgalanb',
    card: 'summary_large_image',
    images: [
      'https://utfs.io/f/23b3b4dd-700f-45de-bb17-81ad985db1ed-k3d9cr.png',
    ],
  },
}

export default async function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-10">
      sharepreviews.com
    </div>
  )
}
