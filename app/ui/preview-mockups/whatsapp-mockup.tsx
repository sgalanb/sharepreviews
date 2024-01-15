import { ValidatedMetatagsType } from '@/app/api/metatags/validate/utils'
import EmptyMockup from '@/app/ui/preview-mockups/empty-mockup'
import { getDomainWithoutWWW } from '@/app/utils'

export default function WhatsAppMockup({
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
          <div
            className="flex w-full flex-col rounded-[7.5px] bg-[#d9fdd3] px-1 pb-2 pt-1  dark:bg-[#005c4b]"
            style={{
              boxShadow: 'rgba(11, 20, 26, 0.13) 0px 1px 0.5px 0px',
            }}
          >
            <div className="mb-1.5 flex max-h-[90px]">
              {(metatags['og:image'] || metatags['twitter:image']) && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={metatags['og:image'] || metatags['twitter:image']}
                  alt="Preview"
                  className="aspect-square w-full max-w-[90px] shrink-0 cursor-pointer rounded-l-[6px] object-cover"
                />
              )}
              <div className="flex w-full cursor-pointer flex-col rounded-r-[4px] bg-[#d1f4cc] px-2.5 py-1.5 dark:bg-[#025144]">
                <span className="mb-0.5 line-clamp-1 cursor-pointer text-ellipsis break-words text-[13px] font-normal leading-[19px] text-black dark:text-[#e9edefe0]">
                  {metatags['og:title'] ||
                    metatags['twitter:title'] ||
                    metatags.title}
                </span>
                {(metatags['og:description'] ||
                  metatags['twitter:description'] ||
                  metatags.description) && (
                  <span className="line-clamp-2 whitespace-pre-line text-xs font-normal leading-[19px] text-black dark:text-[#e9edefe0]">
                    {metatags['og:description'] ||
                      metatags['twitter:description'] ||
                      metatags.description}
                  </span>
                )}
                <span className="pt-[1px] text-xs font-normal leading-[19px] text-[#111b214d] hover:underline dark:text-[#e9edef4d]">
                  {getDomainWithoutWWW(normalizedUrl ?? '')}
                </span>
              </div>
            </div>
            <span className="cursor-pointer overflow-clip break-words px-1 text-[14px] font-normal leading-[19px] text-[#027eb5] underline dark:text-[#53bdeb]">
              {normalizedUrl}
            </span>
          </div>
        ) : (
          <div
            className="flex w-full flex-col rounded-[7.5px] bg-[#d9fdd3] px-1 pb-2 pt-1  dark:bg-[#005c4b]"
            style={{
              boxShadow: 'rgba(11, 20, 26, 0.13) 0px 1px 0.5px 0px',
            }}
          >
            {(metatags['og:image'] || metatags['twitter:image']) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={metatags['og:image'] || metatags['twitter:image']}
                alt="Preview"
                className="aspect-[1.91/1] w-full cursor-pointer rounded-t-[6px] object-cover"
              />
            )}
            <div className="mb-1.5 flex w-full cursor-pointer flex-col rounded-[4px] bg-[#d1f4cc] px-2.5 py-1.5 dark:bg-[#025144]">
              <span className="mb-0.5 line-clamp-2 cursor-pointer text-ellipsis break-words text-[13px] font-normal leading-[19px] text-black dark:text-[#e9edefe0]">
                {metatags['og:title'] ||
                  metatags['twitter:title'] ||
                  metatags.title}
              </span>
              {(metatags['og:description'] ||
                metatags['twitter:description'] ||
                metatags.description) && (
                <span className="whitespace-pre-line text-xs font-normal leading-[19px] text-black dark:text-[#e9edefe0]">
                  {metatags['og:description'] ||
                    metatags['twitter:description'] ||
                    metatags.description}
                </span>
              )}
              <span className="pt-[1px] text-xs font-normal leading-[19px] text-[#111b214d] hover:underline dark:text-[#e9edef4d]">
                {getDomainWithoutWWW(normalizedUrl ?? '')}
              </span>
            </div>
            <span className="cursor-pointer overflow-clip break-words px-1 text-[14px] font-normal leading-[19px] text-[#027eb5] underline dark:text-[#53bdeb]">
              {normalizedUrl}
            </span>
          </div>
        )
      ) : (
        <EmptyMockup />
      )}
    </>
  )
}
