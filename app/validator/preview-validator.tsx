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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/ui/components/DropdownMenu'

import { Label } from '@/app/ui/components/Label'
import { Switch } from '@/app/ui/components/Switch'
import {
  Table,
  TableBody,
  TableCell,
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
import Slack from '@/app/ui/svgs/social-icons/Slack'
import Telegram from '@/app/ui/svgs/social-icons/Telegram'
import WhatsApp from '@/app/ui/svgs/social-icons/WhatsApp'
import X from '@/app/ui/svgs/social-icons/X'
import ValidatorInput from '@/app/ui/validator-input'
import {
  fetcher,
  getImageSizeFromUrl,
  getUrlFromStringWithoutWWW,
} from '@/app/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, MoreHorizontal, ShieldAlert } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function PreviewValidator() {
  const searchParams = useSearchParams()
  const inputUrl = searchParams?.get('url') || ''
  const normalizedUrl = getUrlFromStringWithoutWWW(inputUrl)
  const titleUrl = normalizedUrl?.replace(/^https?:\/\//, '') || ''

  const {
    data: metatags,
    isLoading,
    error,
  }: {
    data: ValidatedMetatagsType
    isLoading: boolean
    error: any
  } = useSWR<any>(
    normalizedUrl && `/api/metatags/validate?url=${normalizedUrl}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  // Previews
  const getImageIsSquare = async () => {
    try {
      const dimensions = await getImageSizeFromUrl(
        metatags['og:image'] || metatags['twitter:image']
      )
      return dimensions.width === dimensions.height
    } catch (error) {
      return false
    }
  }

  const [isImageSquare, setIsImageSquare] = useState<boolean | undefined>(
    undefined
  )

  useEffect(() => {
    if (metatags && metatags['og:image']) {
      getImageIsSquare().then((result) => {
        setIsImageSquare(result)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metatags])

  const previewsData = [
    {
      title: 'Twitter/X',
      icon: <X className="h-4 w-4 shrink-0 dark:invert" />,
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
          // Use twitter:card and image height and width to determine if square
          isSquare={
            metatags &&
            metatags['twitter:card'] === 'summary' &&
            !!isImageSquare
          }
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
          // Use twitter:card or image height and width to determine if square
          isSquare={
            metatags &&
            (metatags['twitter:card'] === 'summary' || !!isImageSquare)
          }
        />
      ),
    },
    {
      title: 'Discord',
      icon: <Discord className="h-5 w-5 shrink-0" />,
      previewComponent: (
        <DiscordMockup
          metatags={metatags}
          // Use twitter:card or image height and width to determine if square
          isSquare={
            metatags &&
            (metatags['twitter:card'] === 'summary' || !!isImageSquare)
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

  const isLoadingData =
    inputUrl &&
    (isLoading ||
      ((metatags['og:image'] || metatags['twitter:image']) &&
        isImageSquare === undefined))

  return (
    <div className="flex w-full max-w-7xl flex-col items-start justify-start gap-4 p-4 lg:p-12">
      <Link
        href="/validator"
        className="flex items-center justify-center text-muted-foreground"
      >
        <ChevronLeft className="ml-[-4px]" />
        <span className="self-center text-sm">Validator</span>
      </Link>
      <div className="mb-4 flex w-full items-center justify-between">
        <h1 className="line-clamp-4 break-all text-4xl font-extrabold tracking-tight">
          {titleUrl || 'Preview Validator'}
        </h1>
        {/* <ProgressCircle
          value={72}
          radius={28}
          strokeWidth={8}
          color="green"
          showAnimation
        /> */}
      </div>

      <div className="flex h-full w-full flex-col items-start justify-start gap-8">
        <Tabs defaultValue="previews" className="w-full">
          <div className="flex flex-col gap-2 lg:flex-row lg:justify-between">
            <div className="w-full lg:w-1/2 lg:pr-2 2xl:w-full 2xl:p-0">
              <ValidatorInput isLoading={!!isLoadingData} />
            </div>
            <div className="flex gap-2">
              <TabsList className="grid w-full grid-cols-2 border lg:w-60">
                <TabsTrigger value="previews" className="h-full py-[5px]">
                  Previews
                </TabsTrigger>
                <TabsTrigger value="metatags" className="h-full py-[5px]">
                  Metatags
                </TabsTrigger>
              </TabsList>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="aspect-square w-10 p-0 ">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48 p-2"
                  align="end"
                  sideOffset={8}
                >
                  <DropdownMenuGroup>
                    {/* <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <Plus className="mr-2 h-4 w-4" />
                        <span>Add to project</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent className="p-2">
                          TODO: Fetch projects and show them or show "no projects" text with button to create your first one
                          <DropdownMenuItem>
                            <span>Project 1</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <span>Project 2</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Plus className="mr-2 h-4 w-4" />
                            <span>New project</span>
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub> */}
                    <DropdownMenuItem>
                      <ShieldAlert className="mr-2 h-4 w-4" />
                      Report issue
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <AnimatePresence>
            {!isLoadingData && !error && (
              <motion.div
                key="previews"
                className="mt-4 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <TabsContent value="previews">
                  <div
                    className={`${
                      isImageSquare
                        ? 'lg:grid-cols-[repeat(auto-fill,minmax(420px,1fr))]'
                        : 'lg:grid-cols-[repeat(auto-fill,minmax(320px,1fr))]'
                    } grid w-full gap-4`}
                  >
                    {previewsData.map((item, index) => (
                      <Card
                        className={`${
                          item.title === 'Twitter/X' &&
                          !isImageSquare &&
                          metatags &&
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
                            metatags &&
                            (metatags['twitter:image'] ||
                              metatags['og:image']) &&
                            metatags['twitter:card'] &&
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
                  <Card>
                    <CardHeader>
                      <CardTitle>Metatags</CardTitle>
                      <CardDescription>5 errors, 2 warnings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        {/* <TableHeader>
                          <TableRow>
                            <TableHead>Status</TableHead>
                            <TableHead>Property</TableHead>
                            <TableHead>Value</TableHead>
                          </TableRow>
                        </TableHeader> */}
                        <TableBody>
                          {tableData.map((item) => (
                            <TableRow key={item.name}>
                              <TableCell>{item.status}</TableCell>
                              <TableCell>{item.name}</TableCell>
                              <TableCell className="break-all">
                                {item.name === 'og:image' ||
                                item.name === 'twitter:image' ||
                                item.name === 'og:url' ? (
                                  <Link
                                    href={item.value}
                                    className="hover:underline"
                                    target="_blank"
                                  >
                                    {item.value}
                                  </Link>
                                ) : (
                                  item.value
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  )
}
