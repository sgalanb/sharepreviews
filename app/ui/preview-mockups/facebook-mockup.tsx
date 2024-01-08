import { ValidatedMetatagsType } from '@/app/api/metatags/validate/utils'
import { getDomainWithoutWWW } from '@/app/utils'

export default function FacebookMockup({
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
        <div className="flex max-h-32 w-full cursor-pointer border-b border-t border-[#cfd9de] font-['Helvetica'] antialiased dark:border-[#2f3336]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={metatags['og:image']}
            alt="Preview"
            className="aspect-square w-full max-w-32 object-cover"
          />
          <div className="flex w-full flex-col items-start justify-center gap-0.5 bg-[#F0F2F5] p-3 transition dark:bg-[#3A3B3B]">
            <span className="pointer-events-none select-none break-words text-[13px] uppercase leading-4 text-[#65676b] dark:text-[#b0b3b8]">
              {getDomainWithoutWWW(normalizedUrl ?? '')}
            </span>
            <span className="pointer-events-none line-clamp-2 select-none break-words text-[17px] font-semibold leading-5 text-black dark:text-[#E4E6EA]">
              {metatags['twitter:title'] ||
                metatags['og:title'] ||
                metatags.title}
            </span>
            <span className="pointer-events-none line-clamp-3 select-none break-words text-[15px] leading-5 text-[#65676b] dark:text-[#b0b3b8]">
              {metatags['twitter:description'] ||
                metatags['og:description'] ||
                metatags.description}
            </span>
          </div>
        </div>
      ) : (
        <div className="relative w-full cursor-pointer font-['Helvetica'] antialiased shadow-[0_1px_2px_rgb(0_0_0_/_0.2)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={metatags['og:image']}
            alt="Preview"
            className="aspect-[1.91/1] w-full object-cover"
          />
          <div className="flex flex-col items-start justify-center bg-[#EBECED] px-3 py-2.5 dark:bg-[#3a3b3c]">
            <span className="text-left text-xs font-normal uppercase leading-[11px] text-[#606770] dark:text-[#b0b3b8]">
              {getDomainWithoutWWW(normalizedUrl ?? '')}
            </span>
            <span className="mt-1.5 line-clamp-1 text-ellipsis text-left text-base font-semibold leading-5 text-[#1d2129] dark:text-[#e4e6eb]">
              {metatags['og:title'] || metatags.title}
            </span>
            <span className="leading-[18px ] line-clamp-1 text-ellipsis text-left text-sm font-normal text-[#606770] dark:text-[#b0b3b8]">
              {metatags['og:description'] || metatags.description}
            </span>
          </div>
        </div>
      )}
    </>
  )
}
