import { TypographyH1, TypographyH2 } from '@/app/ui/components/typography'
import PreviewValidator from '@/app/ui/preview-validator'

export default async function Home() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 p-4">
      <TypographyH1>Improve your links conversion</TypographyH1>
      <TypographyH2>
        Stand out from the sea of links with a proper preview.
      </TypographyH2>

      <PreviewValidator inputOnly />
    </div>
  )
}
