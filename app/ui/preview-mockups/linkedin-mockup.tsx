import { ValidatedMetatagsType } from '@/app/api/metatags/validate/utils'
import { getDomainWithoutWWW } from '@/app/utils'

export default function LinkedInMockup({
  metatags,
  normalizedUrl,
  isSquare = false,
}: {
  metatags: ValidatedMetatagsType
  normalizedUrl: string
  isSquare?: boolean
}) {
  return (
    <>
      {isSquare ? (
        <div className="flex w-full bg-[#EEF3F7] px-4 py-3 dark:bg-[#3A434E]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={metatags['og:image']}
            alt="Preview"
            className="aspect-[1.91/1] w-full max-w-32 cursor-pointer object-cover"
          />
          <div className="flex flex-col items-start justify-center px-3 py-2">
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={metatags['og:image']}
            alt="Preview"
            className="aspect-[1.91/1] w-full cursor-pointer object-cover"
          />
          <div className="flex flex-col items-start justify-center bg-[#EEF3F7] px-3 py-2 dark:bg-[#3A434E]">
            <span className="mb-2 line-clamp-2 w-full cursor-pointer text-ellipsis text-left text-sm font-semibold leading-5 text-[#000000e6] dark:text-[#ffffffe6]">
              {metatags['og:title'] || metatags.title}
            </span>
            <span className="w-full cursor-pointer text-left text-xs font-normal leading-[15px] text-[#00000099] dark:text-[#ffffff99]">
              {getDomainWithoutWWW(normalizedUrl ?? '') + ' • 1 min read'}
            </span>
          </div>
        </div>
      )}
    </>
  )
}
