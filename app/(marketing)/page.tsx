import StarOnGithubButton from '@/app/(marketing)/StarOnGithubButton'
import Footer from '@/app/(marketing)/footer'
import { Separator } from '@/app/ui/components/Separator'
import ValidatorInput from '@/app/ui/validator-input'
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
      {/* Validator */}
      <div className="flex w-full flex-col items-center justify-center gap-2 p-4 px-8">
        <h2 className="marketing-second-title text-balance text-center">
          Social Card Validator
        </h2>
        <p className="marketing-subtitle text-balance text-center text-muted-foreground lg:px-40">
          Check how your links look when shared. Validate that you have the
          right metatags in place so your cards are displayed correctly.
        </p>
        <div className="mt-8 flex w-full items-center justify-center">
          <ValidatorInput />
        </div>
      </div>

      <Separator />

      {/* Open Source */}
      <div className="flex w-full flex-col items-center justify-center gap-2 p-4 px-8">
        <h2 className="marketing-second-title text-balance text-center">
          Open-source
        </h2>
        <p className="marketing-subtitle text-balance text-center text-muted-foreground">
          Source code is available on GitHub. <br />
          Feel free to read, review, or contribute to it however you want!
        </p>
        <StarOnGithubButton variant="long" />
      </div>

      <Footer />
    </div>
  )
}
