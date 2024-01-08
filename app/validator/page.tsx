import { TypographyH1, TypographyP } from '@/app/ui/components/Typography'
import PreviewValidator from '@/app/ui/preview-validator'

export default function Validator() {
  return (
    <div className="flex w-full max-w-7xl flex-col items-start justify-center gap-8 px-4 py-4 lg:px-12">
      <div className="flex flex-col items-start justify-center gap-2">
        <TypographyH1 className="text-balance text-left">
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
