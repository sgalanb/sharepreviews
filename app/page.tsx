import { getAuthorizationUrl } from '@/app/lib/workos'
import { TypographyH1, TypographyH2 } from '@/app/ui/components/typography'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'sharepreviews | Boost your links engagement with stunning previews',
  description:
    'Stand out from a sea of links with auto-generated previews. Manage your presence across the web.',
}

export default async function Home() {
  const authorizationUrl = getAuthorizationUrl()

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 p-4">
      <TypographyH1>Boost your links engagement</TypographyH1>
      <TypographyH2>
        Manage your presence across the web and stand out from the sea of links
      </TypographyH2>

      <a href={authorizationUrl}>Log In</a>
    </div>
  )
}
