import { ValidatedMetatagsType } from '@/app/api/metatags/validate/utils'
import { GOOGLE_FAVICON_URL } from '@/app/constants'
import { getApexDomain } from '@/app/utils'

export default function SlackMockup({
  metatags,
  normalizedUrl,
  isSquare = false,
}: {
  metatags: ValidatedMetatagsType
  normalizedUrl: string
  isSquare?: boolean
}) {
  return (
    <div className="flex w-full font-[Slack-Lato,Slack-Fractions,appleLogo,sans-serif] antialiased">
      <div className="w-1 min-w-1 rounded-[8px] bg-[#dddddd] dark:bg-[#35373b]" />
      <div className="flex h-full flex-col items-start justify-center break-words px-3 text-[15px] leading-[22px]">
        <div className="flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${GOOGLE_FAVICON_URL}${getApexDomain(normalizedUrl ?? '')}`}
            alt=""
            className="mr-2 aspect-square h-4 w-4 rounded-[2px]"
          />
          <span className="font-black text-[#1d1c1d] dark:text-[#d1d2d3]">
            {metatags['og:site_name'] || getApexDomain(normalizedUrl ?? '')}
          </span>
        </div>
        <span className="cursor-pointer font-bold text-[#1264a3] hover:text-[#224B88] hover:underline dark:text-[#1d9bd1] dark:hover:text-[#62B0DF]">
          {metatags['og:title'] || metatags['twitter:title'] || metatags.title}
        </span>
        <span className="mb-[5px] font-normal text-[#1d1c1d] dark:text-[#d1d2d3]">
          {metatags['og:description'] ||
            metatags['twitter:description'] ||
            metatags.description}
        </span>
        {!isSquare && (
          <div
            style={{
              backgroundImage: `url(${metatags['og:image']})`,
            }}
            className="aspect-[1.91/1] h-full w-full max-w-[360px] cursor-zoom-in rounded-[8px] bg-cover bg-center bg-no-repeat shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]"
          />
        )}
      </div>
    </div>
  )
}
