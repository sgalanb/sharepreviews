'use client'

import { Button } from '@/app/ui/components/Button'
import { Input } from '@/app/ui/components/Input'
import { TypographyH2, TypographyH3 } from '@/app/ui/components/typography'
import { fetcher, getDomainWithoutWWW, getUrlFromString } from '@/app/utils'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'

export default function PreviewValidator() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const inputUrl = searchParams?.get('url') || ''
  const normalizedUrl = getUrlFromString(inputUrl)

  const {
    data,
    isLoading,
  }: {
    data: {
      title: string
      description: string
      'og:title': string
      'og:description': string
      'og:image': string
      'og:image:width': string
      'og:image:height': string
      'og:image:type': string
      'og:url': string
      'twitter:title': string
      'twitter:description': string
      'twitter:image': string
      'twitter:image:width': string
      'twitter:image:height': string
      'twitter:image:type': string
      'twitter:site': string
    }
    isLoading: boolean
  } = useSWR<any>(
    normalizedUrl && `/api/metatags/validate?url=${normalizedUrl}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  const [inputError, setInputError] = useState<boolean>(false)

  const onSubmitSite = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const eventUrl = e.currentTarget.url.value
    const normalizedUrl = getUrlFromString(eventUrl)

    if (!!normalizedUrl) {
      router.replace(`${eventUrl ? `?url=${eventUrl}` : ''}`)
    } else {
      setInputError(true)
      console.log('error')
    }
  }

  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef?.current?.select()
  }, [])

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-20">
      <form
        onSubmit={onSubmitSite}
        className="flex w-full flex-col gap-4 xl:w-1/2"
      >
        <div className="flex w-full gap-4">
          <Input
            ref={inputRef}
            name="url"
            id="url"
            type="text"
            autoFocus
            defaultValue={inputUrl}
            placeholder="Enter your site URL"
            aria-invalid="true"
            onChange={() => setInputError(false)}
          />
          <Button type="submit">Validate</Button>
        </div>
        {inputError && (
          <div className="text-sm text-red-500">Please enter a valid URL.</div>
        )}
      </form>
      <div className="flex flex-col items-center justify-center gap-4">
        <TypographyH2>Previews</TypographyH2>
        {data && data['og:image'] && (
          <div className="flex flex-col items-center justify-center gap-8 xl:flex-row xl:items-start xl:gap-4">
            {/* Twitter/X */}
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <div className="flex items-center justify-center gap-4">
                <Image
                  src="/social-icons/x-icon.svg"
                  alt="icono de x/twitter"
                  width={20}
                  height={20}
                  className="h-5 w-5 dark:invert"
                />
                <TypographyH3 className="">Twitter/X</TypographyH3>
              </div>

              <div className="relative">
                <div className="absolute bottom-3 left-3">
                  <div className="flex h-5 items-center justify-center self-start rounded bg-black/30 px-1">
                    <span className="text-center text-[13px] font-normal leading-4 text-white">
                      {getDomainWithoutWWW(normalizedUrl ?? '')}
                    </span>
                  </div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data['og:image']}
                  alt="Preview"
                  className="aspect-[1.91/1] w-full rounded-2xl border border-[#38444d]"
                />
              </div>
            </div>
            {/* Facebook */}
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <div className="flex items-center justify-center gap-4">
                <Image
                  src="/social-icons/facebook-icon.svg"
                  alt="icono de x/twitter"
                  width={24}
                  height={24}
                  className="h-6 w-6 dark:invert"
                />
                <TypographyH3 className="">Facebook</TypographyH3>
              </div>

              <div className="relative font-[Helvetica]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data['og:image']}
                  alt="Preview"
                  className="aspect-[1.91/1] w-full"
                />
                <div className="flex flex-col items-start justify-center gap-1.5 bg-[#EBECED] px-3 py-2.5">
                  <span className="text-left text-xs font-normal uppercase leading-[11px] text-[#606770]">
                    {getDomainWithoutWWW(normalizedUrl ?? '')}
                  </span>
                  <span className="text-left text-base font-semibold leading-5 text-[#1d2129]">
                    {data['og:title'] || data.title}
                  </span>
                  <span className="line-clamp-1 text-ellipsis text-left text-sm font-normal text-[#606770]">
                    {data['og:description'] || data.description}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <TypographyH2>Metatags</TypographyH2>
    </div>
  )
}
