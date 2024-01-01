import { TypographyH1, TypographyP } from '@/app/ui/components/typography'
import PreviewValidator from '@/app/ui/preview-validator'

export default function Validator() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 p-4">
      <div className="flex flex-col items-center justify-center gap-2">
        <TypographyH1 className="text-balance text-center">
          Preview Validator
        </TypographyH1>
        <TypographyP className="!mt-0 text-balance text-center">
          Check how your links looks when shared. Validate you have the correct
          meta tags in place.
        </TypographyP>
      </div>
      <PreviewValidator />
    </div>
  )
}
