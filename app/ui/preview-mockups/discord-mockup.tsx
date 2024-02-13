'use client'

import { ValidatedMetatagsType } from '@/app/api/metatags/validate/utils'
import EmptyMockup from '@/app/ui/preview-mockups/empty-mockup'
import { getImageSizeFromUrl } from '@/app/utils'
import { useEffect, useState } from 'react'

export default function DiscordMockup({
  metatags,
}: {
  metatags?: ValidatedMetatagsType
}) {
  const isValid =
    metatags &&
    (metatags.title.value ||
      metatags['og:title'].value ||
      metatags['twitter:title'].value)

  const [isSquare, setIsSquare] = useState<boolean>(false)

  useEffect(() => {
    if (metatags && metatags['twitter:card'].value === 'summary') {
      setIsSquare(true)
    } else if (
      metatags &&
      (metatags['og:image'].value || metatags['twitter:image'].value)
    ) {
      getImageSizeFromUrl(
        metatags['og:image'].value || metatags['twitter:image'].value
      ).then((size) => {
        if (size) {
          setIsSquare(size.width === size.height)
        }
      })
    }
  }, [metatags])

  return (
    <>
      {isValid ? (
        isSquare ? (
          <div className="flex w-full items-center justify-between rounded-[4px] border-l-4 border-[#e3e5e8] bg-[#f2f3f5] pb-4 pl-3 pr-4 pt-2 font-[Noto_Sans] dark:border-[#1e1f22] dark:bg-[#2b2d31]">
            <div className="flex w-full flex-col">
              {metatags['og:site_name'].value && (
                <span className="mt-2 text-xs font-normal text-[#313338] dark:text-[#dbdee1]">
                  {metatags['og:site_name'].value}
                </span>
              )}
              <span className="mt-2 cursor-pointer break-words text-base font-semibold leading-[22px] text-[#006ce7] hover:underline dark:text-[#00a8fc]">
                {metatags['og:title'].value ||
                  metatags['twitter:title'].value ||
                  metatags.title.value}
              </span>
              {(metatags['og:description'].value ||
                metatags['twitter:description'].value ||
                metatags.description.value) && (
                <span className="mt-2 whitespace-pre-line text-sm leading-[18px] text-[#313338] dark:text-[#dbdee1]">
                  {metatags['og:description'].value ||
                    metatags['twitter:description'].value ||
                    metatags.description.value}
                </span>
              )}
            </div>
            {(metatags['og:image'].value ||
              metatags['twitter:image'].value) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={
                  metatags['og:image'].value || metatags['twitter:image'].value
                }
                alt="Preview"
                className="mt-3 aspect-square w-full max-w-20 cursor-pointer rounded-[4px] object-cover"
              />
            )}
          </div>
        ) : (
          <div className="flex w-full flex-col rounded-[4px] border-l-4 border-[#e3e5e8] bg-[#f2f3f5] pb-4 pl-3 pr-4 pt-2 font-[Noto_Sans] dark:border-[#1e1f22] dark:bg-[#2b2d31]">
            {metatags['og:site_name'].value && (
              <span className="mt-2 text-xs font-normal text-[#313338] dark:text-[#dbdee1]">
                {metatags['og:site_name'].value}
              </span>
            )}
            <span className="mt-2 cursor-pointer break-words text-base font-semibold leading-[22px] text-[#006ce7] hover:underline dark:text-[#00a8fc]">
              {metatags['og:title'].value ||
                metatags['twitter:title'].value ||
                metatags.title.value}
            </span>
            {(metatags['og:description'].value ||
              metatags['twitter:description'].value ||
              metatags.description.value) && (
              <span className="mt-2 whitespace-pre-line text-sm leading-[18px] text-[#313338] dark:text-[#dbdee1]">
                {metatags['og:description'].value ||
                  metatags['twitter:description'].value ||
                  metatags.description.value}
              </span>
            )}
            {(metatags['og:image'].value ||
              metatags['twitter:image'].value) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={
                  metatags['og:image'].value || metatags['twitter:image'].value
                }
                alt="Preview"
                className="mt-3 aspect-[1.91/1] w-full cursor-pointer rounded-[4px] object-cover"
              />
            )}
          </div>
        )
      ) : (
        <EmptyMockup />
      )}
    </>
  )
}
