'use client'

import { ValidatedMetatagsType } from '@/app/api/metatags/validate/utils'
import { Button } from '@/app/ui/components/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/ui/components/Card'

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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/ui/components/Tabs'
import { TypographyP } from '@/app/ui/components/typography'
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
      status: metatags?.title ? '✅' : '❌',
    },
    {
      name: 'description',
      value: metatags?.description,
      status: metatags?.description ? '✅' : '❌',
    },
    {
      name: 'og:title',
      value: metatags?.['og:title'],
      status: metatags?.['og:title'] ? '⚠️' : '❌',
    },
    {
      name: 'og:description',
      value: metatags?.['og:description'],
      status: metatags?.['og:description'] ? '✅' : '❌',
    },
    {
      name: 'og:image',
      value: metatags?.['og:image'],
      status: metatags?.['og:image'] ? '✅' : '❌',
    },
    {
      name: 'og:image:width',
      value: metatags?.['og:image:width'],
      status: metatags?.['og:image:width'] ? '✅' : '❌',
    },
    {
      name: 'og:image:height',
      value: metatags?.['og:image:height'],
      status: metatags?.['og:image:height'] ? '✅' : '❌',
    },
    {
      name: 'og:image:type',
      value: metatags?.['og:image:type'],
      status: metatags?.['og:image:type'] ? '✅' : '❌',
    },
    {
      name: 'og:url',
      value: metatags?.['og:url'],
      status: metatags?.['og:url'] ? '✅' : '❌',
    },
    {
      name: 'og:site_name',
      value: metatags?.['og:site_name'],
      status: metatags?.['og:site_name'] ? '✅' : '❌',
    },
    {
      name: 'og:type',
      value: metatags?.['og:type'],
      status: metatags?.['og:type'] ? '✅' : '❌',
    },
    {
      name: 'twitter:title',
      value: metatags?.['twitter:title'],
      status: metatags?.['twitter:title'] ? '✅' : '❌',
    },
    {
      name: 'twitter:description',
      value: metatags?.['twitter:description'],
      status: metatags?.['twitter:description'] ? '✅' : '❌',
    },
    {
      name: 'twitter:card',
      value: metatags?.['twitter:card'],
      status: metatags?.['twitter:card'] ? '✅' : '❌',
    },
    {
      name: 'twitter:image',
      value: metatags?.['twitter:image'],
      status: metatags?.['twitter:image'] ? '✅' : '❌',
    },
    {
      name: 'twitter:image:width',
      value: metatags?.['twitter:image:width'],
      status: metatags?.['twitter:image:width'] ? '✅' : '❌',
    },
    {
      name: 'twitter:image:height',
      value: metatags?.['twitter:image:height'],
      status: metatags?.['twitter:image:height'] ? '✅' : '❌',
    },
    {
      name: 'twitter:image:type',
      value: metatags?.['twitter:image:type'],
      status: metatags?.['twitter:image:type'] ? '✅' : '❌',
    },
    {
      name: 'twitter:site',
      value: metatags?.['twitter:site'],
      status: metatags?.['twitter:site'] ? '✅' : '❌',
    },
    {
      name: 'twitter:creator',
      value: metatags?.['twitter:creator'],
      status: metatags?.['twitter:creator'] ? '✅' : '❌',
    },
  ]

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8">
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
        <Tabs defaultValue="previews" className="w-full">
          <TabsList className="grid w-60 grid-cols-2">
            <TabsTrigger value="previews">Previews</TabsTrigger>
            <TabsTrigger value="metatags">Metatags</TabsTrigger>
          </TabsList>
          <TabsContent value="previews">
            <Card className="rounded-md">
              <CardHeader className="">
                <CardTitle>Previews</CardTitle>
                <CardDescription>
                  Description description description
                </CardDescription>
              </CardHeader>
              <CardContent className="">
                {metatags && metatags['og:image'] && (
                  <div className="grid grid-cols-3 gap-20">
                    <div className="flex w-full flex-col">
                      <TypographyP className="text-sm">Twitter/X</TypographyP>
                      <TwitterMockup
                        metatags={metatags}
                        normalizedUrl={normalizedUrl || ''}
                      />
                    </div>
                    <div className="flex w-full flex-col">
                      <TypographyP className="text-sm">Facebook</TypographyP>
                      <FacebookMockup
                        metatags={metatags}
                        normalizedUrl={normalizedUrl || ''}
                      />
                    </div>
                    <div className="flex w-full flex-col">
                      <TypographyP className="text-sm">LinkedIn</TypographyP>
                      <LinkedInMockup
                        metatags={metatags}
                        normalizedUrl={normalizedUrl || ''}
                      />
                    </div>
                    <div className="flex w-full flex-col">
                      <TypographyP className="text-sm">Slack</TypographyP>
                      <SlackMockup
                        metatags={metatags}
                        normalizedUrl={normalizedUrl || ''}
                      />
                    </div>
                    <div className="flex w-full flex-col">
                      <TypographyP className="text-sm">Discord</TypographyP>
                      <DiscordMockup metatags={metatags} />
                    </div>
                    <div className="flex w-full flex-col">
                      <TypographyP className="text-sm">Telegram</TypographyP>
                      <TelegramMockup
                        metatags={metatags}
                        normalizedUrl={normalizedUrl || ''}
                      />
                    </div>
                    <div className="flex w-full flex-col">
                      <TypographyP className="text-sm">WhatsApp</TypographyP>
                      <WhatsAppMockup
                        metatags={metatags}
                        normalizedUrl={normalizedUrl || ''}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="metatags">
            <Card className="h-fit w-full">
              <CardHeader>
                <CardTitle>Metatags</CardTitle>
                <CardDescription>5 errors, 2 warnings</CardDescription>
              </CardHeader>
              <CardContent className="">
                <Table className="">
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
                        <TableCell className="font-medium">
                          {item.name}
                        </TableCell>
                        <TableCell>{item.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="">footer</CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
