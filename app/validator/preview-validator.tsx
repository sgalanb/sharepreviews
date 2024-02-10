'use client'

import { ValidatedMetatagsType } from '@/app/api/metatags/validate/utils'
import { Button } from '@/app/ui/components/Button'
import { Card, CardContent, CardHeader } from '@/app/ui/components/Card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/ui/components/DropdownMenu'

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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/ui/components/Tooltip'
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
import {
  AlertCircle,
  Check,
  ChevronLeft,
  MoreHorizontal,
  ShieldAlert,
  XCircle,
} from 'lucide-react'
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

  interface TableDataType {
    name: string
    value: string
    status: 'valid' | 'warning' | 'invalid'
    message?: string
    message_url?: string
  }

  const tableData: TableDataType[] = [
    {
      name: 'title',
      value: metatags?.title,
      status: !metatags?.title
        ? 'invalid'
        : metatags?.title.length > 100
          ? 'warning'
          : 'valid',
      message: 'Title is required.',
      message_url: 'https://ogp.me/#metadata',
    },
    {
      name: 'description',
      value: metatags?.description,
      status: 'invalid',
      message: 'No description.',
      message_url: 'https://ogp.me/#metadata',
    },
    {
      name: 'og:title',
      value: metatags?.['og:title'],
      status: 'warning',
      message: 'Title need to be between 50 and 100 characters.',
      message_url: 'https://ogp.me/#metadata',
    },
    {
      name: 'og:description',
      value: metatags?.['og:description'],
      status: 'invalid',
      message: 'Description needs to be between 50 and 300 characters.',
    },
    {
      name: 'og:image',
      value: metatags?.['og:image'],
      status: 'valid',
    },
    {
      name: 'og:image:width',
      value: metatags?.['og:image:width'],
      status: 'valid',
    },
    {
      name: 'og:image:height',
      value: metatags?.['og:image:height'],
      status: 'valid',
    },
    {
      name: 'og:image:type',
      value: metatags?.['og:image:type'],
      status: 'valid',
    },
    {
      name: 'og:url',
      value: metatags?.['og:url'],
      status: 'valid',
    },
    {
      name: 'og:site_name',
      value: metatags?.['og:site_name'],
      status: 'valid',
    },
    {
      name: 'og:type',
      value: metatags?.['og:type'],
      status: 'valid',
    },
    {
      name: 'twitter:title',
      value: metatags?.['twitter:title'],
      status: 'valid',
    },
    {
      name: 'twitter:description',
      value: metatags?.['twitter:description'],
      status: 'valid',
    },
    {
      name: 'twitter:card',
      value: metatags?.['twitter:card'],
      status: 'valid',
    },
    {
      name: 'twitter:image',
      value: metatags?.['twitter:image'],
      status: 'valid',
    },
    {
      name: 'twitter:image:width',
      value: metatags?.['twitter:image:width'],
      status: 'valid',
    },
    {
      name: 'twitter:image:height',
      value: metatags?.['twitter:image:height'],
      status: 'valid',
    },
    {
      name: 'twitter:image:type',
      value: metatags?.['twitter:image:type'],
      status: 'valid',
    },
    {
      name: 'twitter:site',
      value: metatags?.['twitter:site'],
      status: 'valid',
    },
    {
      name: 'twitter:creator',
      value: metatags?.['twitter:creator'],
      status: 'valid',
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
          {/* TODO: Make this div sticky */}
          <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:gap-2">
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
                className="mt-6 w-full"
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
                          {/* Uncomment code if Twitter app previews differ from web previews (again) */}
                          {item.title === 'Twitter/X' ? (
                            //&& twitterPreview === 'web'
                            <TwitterWebMockup
                              metatags={metatags}
                              normalizedUrl={normalizedUrl || ''}
                            />
                          ) : (
                            item.previewComponent
                          )}
                          {/* {item.title === 'Twitter/X' &&
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
                            )} */}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="metatags">
                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="px-2.5"></TableHead>
                            <TableHead className="min-w-52">Property</TableHead>
                            <TableHead>Value</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {tableData.map((item) => (
                            <>
                              <TableRow
                                key={item.name}
                                className={`${
                                  item.status !== 'valid' && item.message
                                    ? 'border-b-0'
                                    : ''
                                }`}
                              >
                                <TableCell className="p-0 py-4 pl-4">
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        {item.status === 'valid' ? (
                                          <Check className="h-5 w-5 stroke-green-500" />
                                        ) : item.status === 'warning' ? (
                                          <AlertCircle className="h-5 w-5 stroke-yellow-500" />
                                        ) : (
                                          <XCircle className="h-5 w-5 stroke-destructive" />
                                        )}
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <span>
                                          {item.status === 'valid'
                                            ? 'Valid'
                                            : item.status === 'warning'
                                              ? 'Warning'
                                              : 'Invalid'}
                                        </span>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </TableCell>
                                <TableCell className="font-medium">
                                  {item.name}
                                </TableCell>
                                <TableCell className="break-all">
                                  {item.name === 'og:image' ||
                                  item.name === 'twitter:image' ||
                                  item.name === 'og:url' ? (
                                    <Link
                                      href={item.value}
                                      className="text-blue-500 hover:underline"
                                      target="_blank"
                                    >
                                      {item.value}
                                    </Link>
                                  ) : (
                                    <span className="text-muted-foreground">
                                      {item.value}
                                    </span>
                                  )}
                                </TableCell>
                              </TableRow>
                              {item.status === 'warning' && item.message && (
                                <TableRow className="w-full border-0 border-b">
                                  <TableCell
                                    colSpan={3}
                                    className="p-0 px-4 pb-4"
                                  >
                                    <div className="flex justify-start gap-2 rounded-sm bg-yellow-500/30 p-4">
                                      {item.message}
                                      {item.message_url && (
                                        <Link
                                          href={item.message_url}
                                          target="_blank"
                                          className=""
                                        >
                                          <span className="underline underline-offset-2 hover:opacity-80">
                                            Learn more
                                          </span>
                                        </Link>
                                      )}
                                    </div>
                                  </TableCell>
                                </TableRow>
                              )}
                              {item.status === 'invalid' && item.message && (
                                <TableRow className="w-full border-0 border-b">
                                  <TableCell
                                    colSpan={3}
                                    className="p-0 px-4 pb-4"
                                  >
                                    <div className="flex justify-start gap-2 rounded-sm bg-destructive/30 p-4">
                                      {item.message}
                                      {item.message_url && (
                                        <Link
                                          href={item.message_url}
                                          target="_blank"
                                          className=""
                                        >
                                          <span className="underline underline-offset-2 hover:opacity-80">
                                            Learn more
                                          </span>
                                        </Link>
                                      )}
                                    </div>
                                  </TableCell>
                                </TableRow>
                              )}
                            </>
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
