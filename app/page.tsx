import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'sharepreviews | Boost your links engagement with stunning previews',
  description:
    'Check how your links look when shared on social media. Create auto-generated open graph images for your website. Manage all your links previews in one place.',
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
  redirect('/validator')

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 p-4">
      {/* <TypographyH1>Boost your links engagement</TypographyH1>
      <TypographyH2>
        Manage your presence across the web and stand out from the sea of links
      </TypographyH2>

      <a href={authorizationUrl}>Log In</a> */}
    </div>
  )
}
