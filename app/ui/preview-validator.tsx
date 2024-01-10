'use client'

import { ValidatedMetatagsType } from '@/app/api/metatags/validate/utils'
import { Button } from '@/app/ui/components/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/ui/components/Card'

import { Input } from '@/app/ui/components/Input'
import { Label } from '@/app/ui/components/Label'
import Spinner from '@/app/ui/components/Spinner'
import { Switch } from '@/app/ui/components/Switch'
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
import DiscordMockup from '@/app/ui/preview-mockups/discord-mockup'
import FacebookMockup from '@/app/ui/preview-mockups/facebook-mockup'
import LinkedInMockup from '@/app/ui/preview-mockups/linkedin-mockup'
import SlackMockup from '@/app/ui/preview-mockups/slack-mockup'
import TelegramMockup from '@/app/ui/preview-mockups/telegram-mockup'
import TwitterMockup from '@/app/ui/preview-mockups/twitter-mockup'
import TwitterWebMockup from '@/app/ui/preview-mockups/twitter-web-mockup'
import WhatsAppMockup from '@/app/ui/preview-mockups/whatsapp-mockup'
import Discord from '@/app/ui/svgs/social-icons/Discord'
import Facebook from '@/app/ui/svgs/social-icons/Facebook'
import LinkedIn from '@/app/ui/svgs/social-icons/LinkedIn'
import Telegram from '@/app/ui/svgs/social-icons/Telegram'
import WhatsApp from '@/app/ui/svgs/social-icons/WhatsApp'
import X from '@/app/ui/svgs/social-icons/X'
import Slack from '@/app/ui/svgs/social-icons/slack'
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

  async function getImageSizeFromUrl(url: string) {
    try {
      const image = new Image()
      image.src = url
      await new Promise((resolve, reject) => {
        image.onload = resolve
        image.onerror = reject
      })
      return { width: image.width, height: image.height }
    } catch (e) {
      console.error(e)
      throw new Error('Error getting image size')
    }
  }

  const getImageSquare = async () => {
    const dimensions = await getImageSizeFromUrl(
      metatags['og:image'] || metatags['twitter:image']
    )
    return dimensions.width === dimensions.height
  }

  const [isImageSquare, setIsImageSquare] = useState<boolean | undefined>(
    undefined
  )

  useEffect(() => {
    if (metatags && metatags['og:image']) {
      getImageSquare().then((result) => {
        setIsImageSquare(result)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metatags])

  const previewsData = [
    {
      title: 'Twitter/X',
      icon: <X className="h-4 w-4 shrink-0" />,
      previewComponent: (
        <TwitterMockup
          metatags={metatags}
          normalizedUrl={normalizedUrl || ''}
          // Use twitter:card to determine if square
          isSquare={metatags && metatags['twitter:card'] === 'summary'}
        />
      ),
    },
    {
      title: 'Facebook',
      icon: <Facebook className="h-5 w-5 shrink-0" />,
      previewComponent: (
        <FacebookMockup
          metatags={metatags}
          normalizedUrl={normalizedUrl || ''}
          // Use image height and width to determine if square
          isSquare={!!isImageSquare}
        />
      ),
    },
    {
      title: 'LinkedIn',
      icon: <LinkedIn className="h-5 w-5 shrink-0" />,
      previewComponent: (
        <LinkedInMockup
          metatags={metatags}
          normalizedUrl={normalizedUrl || ''}
          // Use image height and width to determine if square
          isSquare={!!isImageSquare}
        />
      ),
    },
    {
      title: 'Slack',
      icon: <Slack className="h-5 w-5 shrink-0" />,
      previewComponent: (
        <SlackMockup
          metatags={metatags}
          normalizedUrl={normalizedUrl || ''}
          // Use twitter:card to determine if square
          isSquare={metatags && metatags['twitter:card'] === 'summary'}
        />
      ),
    },
    {
      title: 'Discord',
      icon: <Discord className="h-5 w-5 shrink-0" />,
      previewComponent: (
        <DiscordMockup
          metatags={metatags}
          // Use twitter:card and image height and width to determine if square
          isSquare={
            !!isImageSquare &&
            metatags &&
            metatags['twitter:card'] === 'summary'
          }
        />
      ),
    },
    {
      title: 'Telegram',
      icon: <Telegram className="h-5 w-5 shrink-0" />,
      previewComponent: (
        <TelegramMockup
          metatags={metatags}
          normalizedUrl={normalizedUrl || ''}
          // Use image height and width to determine if square
          isSquare={!!isImageSquare}
        />
      ),
    },
    {
      title: 'WhatsApp',
      icon: <WhatsApp className="h-5 w-5 shrink-0" />,
      previewComponent: (
        <WhatsAppMockup
          metatags={metatags}
          normalizedUrl={normalizedUrl || ''}
          // Use image height and width to determine if square
          isSquare={!!isImageSquare}
        />
      ),
    },
  ]

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

  const [twitterPreview, setTwitterPreview] = useState<'app' | 'web'>('app')

  return (
    <div className="flex w-full flex-col items-start justify-center gap-8">
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
          <Button type="submit" className="w-full max-w-24">
            {inputUrl && (isLoading || isImageSquare === undefined) ? (
              <Spinner className="h-7 w-7 fill-primary-foreground text-primary-foreground/25" />
            ) : (
              'Validate'
            )}
          </Button>
        </div>
        {inputError && (
          <div className="text-sm text-red-500">Please enter a valid URL.</div>
        )}
      </form>
      {!inputOnly && !isLoading && isImageSquare !== undefined && (
        <Tabs defaultValue="previews" className="w-full">
          <TabsList className="grid w-60 grid-cols-2">
            <TabsTrigger value="previews">Previews</TabsTrigger>
            <TabsTrigger value="metatags">Metatags</TabsTrigger>
          </TabsList>
          <TabsContent value="previews">
            <div
              className={`${
                isImageSquare
                  ? 'lg:grid-cols-[repeat(auto-fill,minmax(420px,1fr))]'
                  : 'lg:grid-cols-[repeat(auto-fill,minmax(320px,1fr))]'
              } grid w-full gap-6`}
            >
              {metatags &&
                metatags['og:image'] &&
                previewsData.map((item, index) => (
                  <Card
                    className={`${
                      item.title === 'Twitter/X' &&
                      !isImageSquare &&
                      metatags['twitter:card'] === 'summary'
                        ? 'col-span-2'
                        : ''
                    } flex flex-col rounded-md`}
                    key={index}
                  >
                    <CardHeader className="flex-row !items-center justify-between gap-4 !space-y-0 p-4 pb-0">
                      <span className="h-[1px] w-full bg-border" />
                      <div className="flex items-center justify-center gap-2">
                        {item.icon}
                        <p className="text-foreground">{`${item.title}`}</p>
                      </div>
                      <span className="h-[1px] w-full bg-border" />
                    </CardHeader>
                    <CardContent className="flex h-full flex-col items-center justify-between p-4">
                      {item.title === 'Twitter/X' &&
                      twitterPreview === 'web' ? (
                        <TwitterWebMockup
                          metatags={metatags}
                          normalizedUrl={normalizedUrl || ''}
                        />
                      ) : (
                        item.previewComponent
                      )}
                      {item.title === 'Twitter/X' &&
                        metatags['twitter:card'] !== 'summary' && (
                          <div className="flex w-full items-center justify-center gap-2 border-t pt-4">
                            <Label
                              htmlFor="app-web"
                              className={`${
                                twitterPreview == 'app'
                                  ? 'font-medium text-foreground'
                                  : 'font-normal text-muted-foreground'
                              }`}
                            >
                              App
                            </Label>
                            <Switch
                              id="app-web"
                              name="app-web"
                              checked={twitterPreview === 'web'}
                              onCheckedChange={() =>
                                setTwitterPreview(
                                  twitterPreview === 'web' ? 'app' : 'web'
                                )
                              }
                              className="!bg-input"
                            />
                            <Label
                              htmlFor="app-web"
                              className={`${
                                twitterPreview == 'web'
                                  ? 'font-medium text-foreground'
                                  : 'font-normal text-muted-foreground'
                              }`}
                            >
                              Web
                            </Label>
                          </div>
                        )}
                    </CardContent>
                  </Card>
                ))}
            </div>
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
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
