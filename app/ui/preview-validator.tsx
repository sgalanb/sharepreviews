'use client'

import { ValidatedMetatagsType } from '@/app/api/metatags/validate/utils'
import { GOOGLE_FAVICON_URL } from '@/app/constants'
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
import {
  fetcher,
  getApexDomain,
  getDomainWithoutWWW,
  getUrlFromString,
} from '@/app/utils'
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
    data: ValidatedMetatagsType
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
      router.push(`${eventUrl ? `/validator?url=${eventUrl}` : ''}`)
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
      name: 'og:site_name',
      value: metatags?.['og:site_name'],
      status: metatags?.['og:site_name'] ? 'Good' : 'Missing',
    },
    {
      name: 'og:type',
      value: metatags?.['og:type'],
      status: metatags?.['og:type'] ? 'Good' : 'Missing',
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
      name: 'twitter:card',
      value: metatags?.['twitter:card'],
      status: metatags?.['twitter:card'] ? 'Good' : 'Missing',
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
    {
      name: 'twitter:creator',
      value: metatags?.['twitter:creator'],
      status: metatags?.['twitter:creator'] ? 'Good' : 'Missing',
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
              <div
                className="grid grid-flow-row items-start justify-center gap-8 xl:gap-4"
                style={{
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                }}
              >
                {/* Twitter/X */}
                <div className="flex w-full flex-col items-center justify-center gap-4">
                  <div className="flex items-center justify-center gap-4">
                    <Image
                      src="/social-icons/x-icon.svg"
                      alt=""
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
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6 dark:invert"
                    />
                    <TypographyH3 className="">Facebook</TypographyH3>
                  </div>

                  <div className="relative font-['Helvetica'] shadow-[0_1px_2px_rgb(0_0_0_/_0.2)]">
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
                </div>
                {/* LinkedIn */}
                <div className="flex w-full flex-col items-center justify-center gap-4">
                  <div className="flex items-center justify-center gap-4">
                    <Image
                      src="/social-icons/linkedin-icon.svg"
                      alt=""
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
                    <div className="flex flex-col items-start justify-center gap-2 bg-[#EEF3F7] px-3 py-2 dark:bg-[#3A434E]">
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
                {/* Slack */}
                <div className="flex w-full flex-col items-center justify-center gap-4">
                  <div className="flex items-center justify-center gap-4">
                    <Image
                      src="/social-icons/slack-icon.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6 dark:invert"
                    />
                    <TypographyH3 className="">Slack</TypographyH3>
                  </div>
                  <div className="flex font-[Slack-Lato,Slack-Fractions,appleLogo,sans-serif] antialiased">
                    <div className="w-1 min-w-1 rounded-[8px] bg-[#dddddd] dark:bg-[#35373b]" />
                    <div className="flex h-full flex-col items-start justify-center break-words px-3 text-[15px] leading-[22px]">
                      <div className="flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`${GOOGLE_FAVICON_URL}${getApexDomain(
                            normalizedUrl ?? ''
                          )}`}
                          alt=""
                          className="mr-2 aspect-square h-4 w-4 rounded-[2px]"
                        />
                        <span className="font-black text-[#1d1c1d] dark:text-[#d1d2d3]">
                          {metatags['og:site_name'] ||
                            getApexDomain(normalizedUrl ?? '')}
                        </span>
                      </div>
                      <span className="cursor-pointer font-bold text-[#1264a3] hover:text-[#224B88] hover:underline dark:text-[#1d9bd1] dark:hover:text-[#62B0DF]">
                        {metatags['og:title'] ||
                          metatags['twitter:title'] ||
                          metatags.title}
                      </span>
                      <span className="mb-[5px] font-normal text-[#1d1c1d] dark:text-[#d1d2d3]">
                        {metatags['og:description'] ||
                          metatags['twitter:description'] ||
                          metatags.description}
                      </span>
                      <a
                        style={{
                          backgroundImage: `url(${metatags['og:image']})`,
                        }}
                        className="aspect-[1.91/1] h-full w-full max-w-[360px] cursor-zoom-in rounded-[8px] bg-cover bg-center bg-no-repeat shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]"
                      />
                    </div>
                  </div>
                </div>
                {/* Discord */}
                <div className="flex w-full flex-col items-center justify-center gap-4">
                  <div className="flex items-center justify-center gap-4">
                    <Image
                      src="/social-icons/discord-icon.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6 dark:invert"
                    />
                    <TypographyH3 className="">Discord</TypographyH3>
                  </div>
                  <div className="flex w-full max-w-[432px] flex-col rounded-[4px] border-l-4 border-[#e3e5e8] bg-[#f2f3f5] pb-4 pl-3 pr-4 pt-2 font-[Noto_Sans] dark:border-[#1e1f22] dark:bg-[#2b2d31]">
                    {metatags['og:site_name'] && (
                      <span className="mt-2 text-xs font-normal text-[#313338] dark:text-[#dbdee1]">
                        {metatags['og:site_name']}
                      </span>
                    )}
                    <span className="mt-2 cursor-pointer break-words text-base font-semibold leading-[22px] text-[#006ce7] hover:underline dark:text-[#00a8fc]">
                      {metatags['og:title'] ||
                        metatags['twitter:title'] ||
                        metatags.title}
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
