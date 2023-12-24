'use client'

import { Button } from '@/app/ui/components/Button'
import { Input } from '@/app/ui/components/Input'
import { fetcher, getDomainWithoutWWW, getUrlFromString } from '@/app/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'

export default function EnterURL() {
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

    console.log(normalizedUrl)

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
    <div className="flex h-full w-1/2 flex-col gap-20">
      <form onSubmit={onSubmitSite} className="flex w-full flex-col gap-4">
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
      {data && data['og:image'] && (
        <div className="relative">
          <span className="absolute bottom-3 left-3">
            <div className="flex h-5 items-center justify-center self-start rounded bg-black/30 px-1">
              <div className="text-center text-[13px] font-normal leading-4 text-white">
                {getDomainWithoutWWW(normalizedUrl ?? '')}
              </div>
            </div>
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data['og:image']}
            alt="Preview"
            className="aspect-[1.91/1] w-full rounded-2xl border border-[#38444d]"
          />
        </div>
      )}
    </div>
  )
}
