import { ValidatedMetatagsType } from '@/app/api/metatags/validate/utils'
import { getDomainWithoutWWW } from '@/app/utils'

export default function FacebookMockup({
  metatags,
  normalizedUrl,
}: {
  metatags: ValidatedMetatagsType
  normalizedUrl: string
}) {
  return (
    <div className="relative cursor-pointer font-['Helvetica'] shadow-[0_1px_2px_rgb(0_0_0_/_0.2)]">
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
  )
}
