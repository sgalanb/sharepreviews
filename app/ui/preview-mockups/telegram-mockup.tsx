import { ValidatedMetatagsType } from '@/app/api/metatags/validate/utils'

export default function TelegramMockup({
  metatags,
  normalizedUrl,
}: {
  metatags: ValidatedMetatagsType
  normalizedUrl: string
}) {
  return (
    <div
      className="flex w-full max-w-[451px] flex-col rounded-[15px] bg-[#e3fee0] px-2 pb-[5px] pt-1 font-[Roboto] antialiased dark:bg-[#8774e1]"
      style={{
        boxShadow: 'rgba(16, 35, 47, 0.15) 0px 1px 2px 0px',
      }}
    >
      <span className="cursor-pointer overflow-clip break-words text-base font-normal leading-[21px] text-[#5ca853] underline dark:text-white">
        {normalizedUrl}
      </span>
      <div className="my-1 flex w-full cursor-pointer flex-col rounded-[4px] border-l-[3px] border-[#5ca853] bg-[#5ca8531a] py-1 pl-1.5 pr-1.5 hover:bg-[rgba(92,168,83,0.2)] dark:border-white dark:bg-[#ffffff1a] dark:hover:bg-[rgba(255,255,255,0.2)]">
        {metatags['og:site_name'] && (
          <span className="text-sm font-medium leading-[18px] text-[#5ca853] hover:underline dark:text-white">
            {metatags['og:site_name']}
          </span>
        )}
        <span className="cursor-pointer break-words text-sm font-medium leading-[18px] text-black dark:text-white">
          {metatags['og:title'] || metatags['twitter:title'] || metatags.title}
        </span>
        <span className="whitespace-pre-line text-sm font-normal leading-[18px] text-black dark:text-white">
          {metatags['og:description'] ||
            metatags['twitter:description'] ||
            metatags.description}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={metatags['og:image']}
          alt="Preview"
          className="my-[3px] aspect-[1.91/1] w-full cursor-pointer rounded-[4px] object-cover"
        />
      </div>
    </div>
  )
}
