import { ValidatedMetatagsType } from '@/app/api/metatags/validate/utils'
import EmptyMockup from '@/app/ui/preview-mockups/empty-mockup'
import { getDomainWithoutWWW } from '@/app/utils'

export default function TwitterWebMockup({
  metatags,
  normalizedUrl,
}: {
  metatags: ValidatedMetatagsType
  normalizedUrl: string
}) {
  const isValid =
    metatags &&
    metatags['twitter:card'] &&
    (metatags['twitter:image'] || metatags['og:image'])

  return (
    <>
      {isValid ? (
        <div className="flex w-full flex-col gap-2">
          <div className="relative w-full cursor-pointer">
            <div className="absolute bottom-3 left-3 right-3 line-clamp-1 w-fit">
              <div className="flex h-5 items-center justify-center self-start rounded bg-black/30 px-1">
                <span className="line-clamp-1 break-words break-all text-left text-[13px] font-normal leading-4 text-white">
                  {metatags['twitter:title'] ||
                    metatags['og:title'] ||
                    metatags.title}
                </span>
              </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={metatags['twitter:image'] || metatags['og:image']}
              alt="Preview"
              className="aspect-[1.91/1] w-full rounded-2xl border border-[#cfd9de] object-cover dark:border-[#38444d]"
            />
          </div>
          <span className="cursor-pointer break-words text-[15px] font-normal leading-5 tracking-tight text-[#536471] hover:underline dark:text-[#71767b]">
            {'From ' + getDomainWithoutWWW(normalizedUrl ?? '')}
          </span>
        </div>
      ) : (
        <EmptyMockup />
      )}
    </>
  )
}
