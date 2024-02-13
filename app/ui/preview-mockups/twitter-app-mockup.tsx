import { ValidatedMetatagsType } from '@/app/api/metatags/validate/utils'
import EmptyMockup from '@/app/ui/preview-mockups/empty-mockup'
import { getDomainWithoutWWW } from '@/app/utils'

export default function TwitterAppMockup({
  metatags,
  normalizedUrl,
}: {
  metatags?: ValidatedMetatagsType
  normalizedUrl: string
}) {
  const isValid =
    metatags &&
    metatags['twitter:card'].value &&
    (metatags['twitter:image'].value || metatags['og:image'].value)

  const isSquare = metatags && metatags['twitter:card'].value === 'summary'

  return (
    <>
      {isValid ? (
        isSquare ? (
          <div className="flex max-h-32 w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                metatags['twitter:image'].value || metatags['og:image'].value
              }
              alt="Preview"
              className="aspect-square w-full max-w-32 rounded-l-2xl border-b border-l border-t border-[#cfd9de] object-cover dark:border-[#2f3336]"
            />
            <div className="flex w-full flex-col items-start justify-center gap-0.5 rounded-r-2xl border-b border-r  border-t border-[#cfd9de] p-3 transition hover:bg-[#f7f9f9] active:bg-[#e6ecf0]/70 dark:border-[#2f3336] dark:hover:bg-[#16181c] dark:active:bg-[rgba(18,27,23,0.7)]">
              <span className="pointer-events-none select-none break-words text-[15px] leading-5 text-[#536471] dark:text-[#71767b]">
                {getDomainWithoutWWW(normalizedUrl ?? '')}
              </span>
              <span className="pointer-events-none line-clamp-1 select-none break-words text-[15px] leading-5 text-black dark:text-white">
                {metatags['twitter:title'].value ||
                  metatags['og:title'].value ||
                  metatags.title.value}
              </span>
              <span className="pointer-events-none line-clamp-2 select-none break-words text-[15px] leading-5 text-[#536471] dark:text-[#71767b]">
                {metatags['twitter:description'].value ||
                  metatags['og:description'].value ||
                  metatags.description.value}
              </span>
            </div>
          </div>
        ) : (
          <div className="relative w-full cursor-pointer">
            <div className="absolute bottom-3 left-3 right-3 line-clamp-1 w-fit">
              <div className="flex h-5 items-center justify-center self-start rounded bg-black/30 px-1">
                <span className="line-clamp-1 break-words break-all text-left text-[13px] font-normal leading-4 text-white">
                  {getDomainWithoutWWW(normalizedUrl ?? '')}
                </span>
              </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                metatags['twitter:image'].value || metatags['og:image'].value
              }
              alt="Preview"
              className="aspect-[1.91/1] w-full rounded-2xl border border-[#cfd9de] object-cover dark:border-[#38444d]"
            />
          </div>
        )
      ) : (
        <EmptyMockup />
      )}
    </>
  )
}
