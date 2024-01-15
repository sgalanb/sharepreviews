import { getAuthorizationUrl } from '@/app/lib/workos'
import { TypographyH1, TypographyH2 } from '@/app/ui/components/typography'

export default async function Home() {
  const authorizationUrl = getAuthorizationUrl()

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 p-4">
      <TypographyH1>Improve your links conversion</TypographyH1>
      <TypographyH2>
        Stand out from the sea of links with a proper preview.
      </TypographyH2>

      <a href={authorizationUrl}>Log In</a>
    </div>
  )
}
