import { ValidatedMetatagsType } from '@/app/api/metatags/validate/utils'
import EmptyMockup from '@/app/ui/preview-mockups/empty-mockup'
import { getDomainWithoutWWW } from '@/app/utils'

export default function LinkedInMockup({
  metatags,
  normalizedUrl,
  isSquare = false,
}: {
  metatags?: ValidatedMetatagsType
  normalizedUrl: string
  isSquare?: boolean
}) {
  const isValid =
    metatags &&
    (metatags.title || metatags['og:title'] || metatags['twitter:title'])

  return (
    <>
      {isValid ? (
        isSquare ? (
          <div className="relative w-full">
            {(metatags['og:image'] || metatags['twitter:image']) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={metatags['og:image'] || metatags['twitter:image']}
                alt="Preview"
                className="aspect-square w-full cursor-pointer object-cover"
              />
            )}
            <div className="flex flex-col items-start justify-center bg-[#EEF3F7] px-3 py-2 dark:bg-[#3A434E]">
              <span className="mb-2 line-clamp-2 w-full cursor-pointer text-ellipsis text-left text-sm font-semibold leading-5 text-[#000000e6] dark:text-[#ffffffe6]">
                {metatags['og:title'] || metatags.title}
              </span>
              <span className="w-full cursor-pointer text-left text-xs font-normal leading-[15px] text-[#00000099] dark:text-[#ffffff99]">
                {getDomainWithoutWWW(normalizedUrl ?? '') + ' • 1 min read'}
              </span>
            </div>
          </div>
        ) : (
          <div className="relative w-full">
            {(metatags['og:image'] || metatags['twitter:image']) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={metatags['og:image'] || metatags['twitter:image']}
                alt="Preview"
                className="aspect-[1.91/1] w-full cursor-pointer object-cover"
              />
            )}
            <div className="flex flex-col items-start justify-center bg-[#EEF3F7] px-3 py-2 dark:bg-[#3A434E]">
              <span className="mb-2 line-clamp-2 w-full cursor-pointer text-ellipsis text-left text-sm font-semibold leading-5 text-[#000000e6] dark:text-[#ffffffe6]">
                {metatags['og:title'] || metatags.title}
              </span>
              <span className="w-full cursor-pointer text-left text-xs font-normal leading-[15px] text-[#00000099] dark:text-[#ffffff99]">
                {getDomainWithoutWWW(normalizedUrl ?? '') + ' • 1 min read'}
              </span>
            </div>
          </div>
        )
      ) : (
        <EmptyMockup />
      )}
    </>
  )
}
