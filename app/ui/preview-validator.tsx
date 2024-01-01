'use client'

import { Button } from '@/app/ui/components/Button'
import { Input } from '@/app/ui/components/Input'
import Spinner from '@/app/ui/components/Spinner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/ui/components/Table'
import { TypographyH2, TypographyH3 } from '@/app/ui/components/typography'
import { fetcher, getDomainWithoutWWW, getUrlFromString } from '@/app/utils'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'

export default function PreviewValidator({
  inputOnly,
}: {
  inputOnly?: boolean
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const inputUrl = searchParams?.get('url') || ''
  const normalizedUrl = getUrlFromString(inputUrl)

  const {
    data: metatags,
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
      router.replace(`${eventUrl ? `/validator?url=${eventUrl}` : ''}`)
    } else {
      setInputError(true)
      console.log('error')
    }
  }

  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef?.current?.select()
  }, [])

  const tableData = [
    {
      name: 'title',
      value: metatags?.title,
      status: metatags?.title.length > 60 ? 'Long' : 'Good',
    },
    {
      name: 'description',
      value: metatags?.description,
      status: metatags?.description.length > 160 ? 'Long' : 'Good',
    },
    {
      name: 'og:title',
      value: metatags?.['og:title'],
      status: metatags?.['og:title'].length > 60 ? 'Long' : 'Good',
    },
    {
      name: 'og:description',
      value: metatags?.['og:description'],
      status: metatags?.['og:description'].length > 160 ? 'Long' : 'Good',
    },
    {
      name: 'og:image',
      value: metatags?.['og:image'],
      status: metatags?.['og:image'] ? 'Good' : 'Missing',
    },
    {
      name: 'og:image:width',
      value: metatags?.['og:image:width'],
      status: metatags?.['og:image:width'] ? 'Good' : 'Missing',
    },
    {
      name: 'og:image:height',
      value: metatags?.['og:image:height'],
      status: metatags?.['og:image:height'] ? 'Good' : 'Missing',
    },
    {
      name: 'og:image:type',
      value: metatags?.['og:image:type'],
      status: metatags?.['og:image:type'] ? 'Good' : 'Missing',
    },
    {
      name: 'og:url',
      value: metatags?.['og:url'],
      status: metatags?.['og:url'] ? 'Good' : 'Missing',
    },
    {
      name: 'twitter:title',
      value: metatags?.['twitter:title'],
      status: metatags?.['twitter:title'].length > 60 ? 'Long' : 'Good',
    },
    {
      name: 'twitter:description',
      value: metatags?.['twitter:description'],
      status: metatags?.['twitter:description'].length > 160 ? 'Long' : 'Good',
    },
    {
      name: 'twitter:image',
      value: metatags?.['twitter:image'],
      status: metatags?.['twitter:image'] ? 'Good' : 'Missing',
    },
    {
      name: 'twitter:image:width',
      value: metatags?.['twitter:image:width'],
      status: metatags?.['twitter:image:width'] ? 'Good' : 'Missing',
    },
    {
      name: 'twitter:image:height',
      value: metatags?.['twitter:image:height'],
      status: metatags?.['twitter:image:height'] ? 'Good' : 'Missing',
    },
    {
      name: 'twitter:image:type',
      value: metatags?.['twitter:image:type'],
      status: metatags?.['twitter:image:type'] ? 'Good' : 'Missing',
    },
    {
      name: 'twitter:site',
      value: metatags?.['twitter:site'],
      status: metatags?.['twitter:site'] ? 'Good' : 'Missing',
    },
  ]

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
          <Button type="submit" className="!w-24">
            {isLoading ? <Spinner /> : 'Validate'}
          </Button>
        </div>
        {inputError && (
          <div className="text-sm text-red-500">Please enter a valid URL.</div>
        )}
      </form>
      {!inputOnly && (
        <>
          <div className="flex flex-col items-center justify-center gap-4">
            <TypographyH2 className="w-full">Previews</TypographyH2>
            {metatags && metatags['og:image'] && (
              <div className="grid grid-flow-col items-start justify-center gap-8 xl:grid-cols-4 xl:gap-4">
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
                      src={metatags['og:image']}
                      alt="Preview"
                      className="aspect-[1.91/1] w-full rounded-2xl border border-[#cfd9de] object-cover dark:border-[#38444d]"
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
                      src={metatags['og:image']}
                      alt="Preview"
                      className="aspect-[1.91/1] w-full object-cover"
                    />
                    <div className="flex flex-col items-start justify-center border-b border-[#dddfe2] bg-[#EBECED] px-3 py-2.5 dark:border-[#3e4042] dark:bg-[#3a3b3c]">
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
                </div>
                {/* LinkedIn */}
                <div className="flex w-full flex-col items-center justify-center gap-4">
                  <div className="flex items-center justify-center gap-4">
                    <Image
                      src="/social-icons/linkedin-icon.svg"
                      alt="icono de x/twitter"
                      width={24}
                      height={24}
                      className="h-6 w-6 dark:invert"
                    />
                    <TypographyH3 className="">LinkedIn</TypographyH3>
                  </div>

                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={metatags['og:image']}
                      alt="Preview"
                      className="aspect-[1.91/1] w-full object-cover"
                    />
                    <div className="flex flex-col items-start justify-center gap-2 border-b border-[#dddfe2] bg-[#EEF3F7] px-3 py-2 dark:border-[#3e4042] dark:bg-[#3A434E]">
                      <span className="line-clamp-2 text-ellipsis text-left text-sm font-semibold leading-5 text-[#000000e6] dark:text-[#ffffffe6]">
                        {metatags['og:title'] || metatags.title}
                      </span>
                      <span className="text-left text-xs font-normal leading-[15px] text-[#00000099] dark:text-[#ffffff99]">
                        {getDomainWithoutWWW(normalizedUrl ?? '') +
                          ' • 1 min read'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex w-3/4 flex-col items-center justify-center gap-4">
            <TypographyH2 className="w-full">Metatags</TypographyH2>
            <Table className="rounded-xl">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Property</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.value}</TableCell>
                    <TableCell>{item.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  )
}
