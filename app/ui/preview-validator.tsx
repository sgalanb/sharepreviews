'use client'

import { ValidatedMetatagsType } from '@/app/api/metatags/validate/utils'
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
import { TypographyH2 } from '@/app/ui/components/typography'
import DiscordMockup from '@/app/ui/preview-mockups/discord-mockup'
import FacebookMockup from '@/app/ui/preview-mockups/facebook-mockup'
import LinkedInMockup from '@/app/ui/preview-mockups/linkedin-mockup'
import SlackMockup from '@/app/ui/preview-mockups/slack-mockup'
import TelegramMockup from '@/app/ui/preview-mockups/telegram-mockup'
import TwitterMockup from '@/app/ui/preview-mockups/twitter-mockup'
import WhatsAppMockup from '@/app/ui/preview-mockups/whatsapp-mockup'
import { fetcher, getUrlFromString } from '@/app/utils'
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
              <div className="flex flex-col gap-4">
                {/* Twitter/X */}
                <TwitterMockup
                  metatags={metatags}
                  normalizedUrl={normalizedUrl || ''}
                />
                {/* Facebook */}
                <FacebookMockup
                  metatags={metatags}
                  normalizedUrl={normalizedUrl || ''}
                />
                {/* LinkedIn */}
                <LinkedInMockup
                  metatags={metatags}
                  normalizedUrl={normalizedUrl || ''}
                />
                {/* Slack */}
                <SlackMockup
                  metatags={metatags}
                  normalizedUrl={normalizedUrl || ''}
                />
                {/* Discord */}
                <DiscordMockup metatags={metatags} />
                {/* Telegram */}
                <TelegramMockup
                  metatags={metatags}
                  normalizedUrl={normalizedUrl || ''}
                />
                {/* WhatsApp */}
                <WhatsAppMockup
                  metatags={metatags}
                  normalizedUrl={normalizedUrl || ''}
                />
              </div>
            )}
          </div>

          <div className="flex w-3/4 flex-col items-center justify-center gap-4">
            <TypographyH2 className="w-full">Metatags</TypographyH2>
            <Table className="rounded-xl">
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Property</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell>{item.status}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.value}</TableCell>
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
