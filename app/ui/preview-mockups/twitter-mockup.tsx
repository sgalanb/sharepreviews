import { ValidatedMetatagsType } from '@/app/api/metatags/validate/utils'
import { getDomainWithoutWWW } from '@/app/utils'

export default function TwitterMockup({
  metatags,
  normalizedUrl,
}: {
  metatags: ValidatedMetatagsType
  normalizedUrl: string
}) {
  return (
    <div className="relative cursor-pointer">
      <div className="absolute bottom-3 left-3">
        <div className="flex h-5 items-center justify-center self-start rounded bg-black/30 px-1">
          <span className="text-center text-[13px] font-normal leading-4 text-white">
            {getDomainWithoutWWW(normalizedUrl ?? '')}
          </span>
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={metatags['og:image']}
        alt="Preview"
        className="aspect-[1.91/1] w-full rounded-2xl border border-[#cfd9de] object-cover dark:border-[#38444d]"
      />
    </div>
  )
}
