'use client'

import {
  ValidatedMetatagType,
  ValidatedMetatagsType,
} from '@/app/api/metatags/validate/utils'
import { Card, CardContent, CardHeader } from '@/app/ui/components/Card'
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
import { AlertCircle, Check, XCircle } from 'lucide-react'
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
    mutate,
    isLoading,
    isValidating,
    error,
  }: {
    data: ValidatedMetatagsType
    mutate: () => void
    isLoading: boolean
    isValidating: boolean
    error: any
  } = useSWR<any>(
    normalizedUrl && `/api/metatags/validate?url=${normalizedUrl}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  const [isImageSquare, setIsImageSquare] = useState<boolean>(false)
  const [errorCount, setErrorCount] = useState<number>(0)

  useEffect(() => {
    if (
      metatags &&
      (metatags['og:image'].value || metatags['twitter:image'].value)
    ) {
      getImageSizeFromUrl(
        metatags['og:image'].value || metatags['twitter:image'].value
      ).then((size) => {
        if (size) {
          setIsImageSquare(size.width === size.height)
        }
      })
    }
  }, [metatags])

  useEffect(() => {
    if (metatags) {
      setErrorCount(
        Object.values(metatags).reduce(
          (acc, item) => acc + item.errors.length,
          0
        )
      )
    }
  }, [metatags])

  const previewsData = [
    {
      title: 'Twitter/X',
      icon: <X className="h-4 w-4 shrink-0 invert dark:invert-0" />,
    },
    {
      title: 'Facebook',
      icon: <Facebook className="h-5 w-5 shrink-0" />,
      previewComponent: (
        <FacebookMockup
          metatags={metatags}
          normalizedUrl={normalizedUrl || ''}
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
        />
      ),
    },
    {
      title: 'Slack',
      icon: <Slack className="h-5 w-5 shrink-0" />,
      previewComponent: (
        <SlackMockup metatags={metatags} normalizedUrl={normalizedUrl || ''} />
      ),
    },
    {
      title: 'Discord',
      icon: <Discord className="h-5 w-5 shrink-0" />,
      previewComponent: <DiscordMockup metatags={metatags} />,
    },
    {
      title: 'Telegram',
      icon: <Telegram className="h-5 w-5 shrink-0" />,
      previewComponent: (
        <TelegramMockup
          metatags={metatags}
          normalizedUrl={normalizedUrl || ''}
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
        />
      ),
    },
  ]

  // const [twitterPreview, setTwitterPreview] = useState<'app' | 'web'>('app')

  const isLoadingData = inputUrl && isLoading

  return (
    <AnimatePresence>
      <motion.div
        className="flex min-h-[calc(100dvh-72px)] w-full flex-col items-start justify-start gap-8 px-4 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex w-full flex-col items-center justify-start gap-4 pt-16">
          <h1 className="marketing-title text-balance text-center">
            Preview Card Validator
          </h1>
          <p className="marketing-subtitle text-balance text-center text-muted-foreground lg:px-28">
            Check how your links look when shared. Validate that you have the
            right metatags configured so your images are displayed correctly.
          </p>
        </div>
        <div className="flex w-full items-center justify-between">
          <h1 className="title line-clamp-4 break-all">
            {titleUrl || 'Preview Card Validator'}
          </h1>
        </div>

        <div className="flex h-full w-full flex-col items-start justify-start gap-8">
          <Tabs defaultValue="previews" className="w-full">
            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:gap-2">
              <div className="w-full lg:w-1/2 lg:pr-2 2xl:w-full 2xl:p-0">
                <ValidatorInput
                  isLoading={!!isLoadingData}
                  revalidateMetatags={mutate}
                  isValidating={isValidating}
                />
              </div>
              <div className="flex gap-2">
                <TabsList className="grid w-full grid-cols-2 border lg:w-60">
                  <TabsTrigger value="previews" className="h-full py-[5px]">
                    Previews
                  </TabsTrigger>
                  <TabsTrigger
                    value="metatags"
                    className="h-full gap-1 py-[5px]"
                  >
                    <span>Metatags</span>
                    {errorCount > 0 && (
                      <div className="flex h-5 w-fit items-center justify-center rounded-full bg-destructive px-1.5  text-destructive-foreground">
                        <span className="min-w-2 text-center text-sm font-light leading-3">
                          {errorCount}
                        </span>
                      </div>
                    )}
                  </TabsTrigger>
                </TabsList>
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
                          ? 'grid-cols-[repeat(auto-fill,minmax(420px,1fr))]'
                          : 'grid-cols-[repeat(auto-fill,minmax(320px,1fr))]'
                      } grid w-full gap-4`}
                    >
                      {previewsData.map((item, index) => (
                        <Card
                          className={`${
                            item.title === 'Twitter/X' &&
                            !isImageSquare &&
                            metatags &&
                            metatags['twitter:card'].value === 'summary'
                              ? 'col-span-2'
                              : ''
                          } flex flex-col rounded-md`}
                          key={index}
                        >
                          <CardHeader className="flex-row !items-center justify-between gap-4 !space-y-0 p-4 pb-0">
                            <span className="h-[1px] w-full bg-border" />
                            <div className="flex items-center justify-center gap-2">
                              {item.icon}
                              <p className="">{`${item.title}`}</p>
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
                              // twitterPreview === 'app'
                              // <TwitterAppMockup
                              //   metatags={metatags}
                              //   normalizedUrl={normalizedUrl || ''}
                              // />
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
                              <TableHead className="min-w-40 lg:min-w-64">
                                Property
                              </TableHead>
                              <TableHead className="w-full">Value</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {metatags &&
                              Object.entries(metatags).map(
                                ([key, item]: [
                                  string,
                                  ValidatedMetatagType,
                                ]) => (
                                  <>
                                    <TableRow
                                      key={key}
                                      className={`${
                                        item.errors.length > 0 ||
                                        item.warnings.length > 0
                                          ? 'border-b-0'
                                          : ''
                                      }`}
                                    >
                                      <TableCell className="p-0 py-4 pl-4">
                                        {item.errors.length === 0 &&
                                        item.warnings.length === 0 ? (
                                          <Check className="h-5 w-5 stroke-green-500" />
                                        ) : item.warnings.length === 0 ? (
                                          <XCircle className="h-5 w-5 stroke-destructive" />
                                        ) : (
                                          <AlertCircle className="h-5 w-5 stroke-yellow-500" />
                                        )}
                                      </TableCell>
                                      <TableCell className="font-medium">
                                        {key}
                                      </TableCell>
                                      <TableCell className="break-all">
                                        {key === 'og:image' ||
                                        key === 'twitter:image' ? (
                                          <TooltipProvider>
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <Link
                                                  href={item.value}
                                                  className="text-blue-500 hover:underline"
                                                  target="_blank"
                                                >
                                                  {item.value}
                                                </Link>
                                              </TooltipTrigger>
                                              <TooltipContent className="py-3">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                  src={item.value}
                                                  alt=""
                                                  className="w-64"
                                                  onError={(e) => {
                                                    e.currentTarget.src = ''
                                                    e.currentTarget.alt =
                                                      'Couldn’t load image'
                                                  }}
                                                />
                                              </TooltipContent>
                                            </Tooltip>
                                          </TooltipProvider>
                                        ) : key === 'og:url' ? (
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
                                    {item.errors.map((error: string, index) => (
                                      <TableRow
                                        className={`${
                                          item.warnings.length === 0 &&
                                          index === item.errors.length - 1
                                            ? 'border-0 border-b'
                                            : 'border-0'
                                        } w-full`}
                                        key={index}
                                      >
                                        <TableCell
                                          colSpan={3}
                                          className="p-0 px-4 pb-4"
                                        >
                                          <div className="flex flex-col justify-start gap-2 rounded-sm border-2 border-destructive bg-destructive/20 px-4 py-3 md:flex-row">
                                            {error}
                                            {item.info_url && (
                                              <Link
                                                href={item.info_url}
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
                                    ))}
                                    {item.warnings.map(
                                      (warning: string, index) => (
                                        <TableRow
                                          className={`${
                                            index === item.warnings.length - 1
                                              ? 'border-0 border-b'
                                              : 'border-0'
                                          } w-full`}
                                          key={index}
                                        >
                                          <TableCell
                                            colSpan={3}
                                            className="p-0 px-4 pb-4"
                                          >
                                            <div className="flex flex-col justify-start gap-2 rounded-sm border-2 border-yellow-500 bg-yellow-500/20 px-4 py-3 md:flex-row">
                                              {warning}
                                              {item.info_url && (
                                                <Link
                                                  href={item.info_url}
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
                                      )
                                    )}
                                  </>
                                )
                              )}
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
      </motion.div>
    </AnimatePresence>
  )
}
