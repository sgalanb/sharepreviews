import { ValidatedMetatagsType } from '@/app/api/metatags/validate/utils'

export default function DiscordMockup({
  metatags,
}: {
  metatags: ValidatedMetatagsType
}) {
  return (
    <div className="flex w-full max-w-[432px] flex-col rounded-[4px] border-l-4 border-[#e3e5e8] bg-[#f2f3f5] pb-4 pl-3 pr-4 pt-2 font-[Noto_Sans] dark:border-[#1e1f22] dark:bg-[#2b2d31]">
      {metatags['og:site_name'] && (
        <span className="mt-2 text-xs font-normal text-[#313338] dark:text-[#dbdee1]">
          {metatags['og:site_name']}
        </span>
      )}
      <span className="mt-2 cursor-pointer break-words text-base font-semibold leading-[22px] text-[#006ce7] hover:underline dark:text-[#00a8fc]">
        {metatags['og:title'] || metatags['twitter:title'] || metatags.title}
      </span>
      <span className="mt-2 whitespace-pre-line text-sm leading-[18px] text-[#313338] dark:text-[#dbdee1]">
        {metatags['og:description'] ||
          metatags['twitter:description'] ||
          metatags.description}
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={metatags['og:image']}
        alt="Preview"
        className="mt-3 aspect-[1.91/1] w-full cursor-pointer rounded-[4px] object-cover"
      />
    </div>
  )
}
