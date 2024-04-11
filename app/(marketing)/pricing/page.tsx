import Footer from '@/app/(marketing)/footer'
import StartForFreeButton from '@/app/(marketing)/pricing/StartForFreeButton'
import StartWithProButton from '@/app/(marketing)/pricing/StartWithProButton'
import { getAuthorizationUrl, getUser } from '@/app/lib/workos'
import { Card } from '@/app/ui/components/Card'
import { Separator } from '@/app/ui/components/Separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/ui/components/Tooltip'
import { CircleCheck, CircleX, Info } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pricing | sharepreviews',
}

export default async function AboutPage() {
  const { isAuthenticated } = await getUser()
  const authorizationUrl = getAuthorizationUrl()
  return (
    <div className="flex h-full w-full max-w-7xl flex-col items-center justify-start gap-10 px-4 pt-20 lg:gap-20">
      <div className="flex w-full flex-col items-center justify-start gap-4">
        <h1 className="marketing-title">Straightforward pricing</h1>

        <p className="marketing-subtitle text-balance text-center text-muted-foreground lg:px-28">
          Pay for what you use. No hidden fees. Cancel anytime.
        </p>
      </div>
      <div className="flex w-full flex-col gap-4 lg:gap-8">
        <div className="flex w-full flex-col items-center justify-center gap-4 lg:flex-row">
          {/* Free */}
          <Card className="flex w-full max-w-64 flex-col items-start justify-start gap-6 p-4">
            <div className="flex flex-col gap-2">
              <span className="second-title leading-none">Free</span>
              <span className="text-left leading-none text-muted-foreground">
                No credit card required.
              </span>
            </div>

            <div className="flex items-end justify-start gap-1">
              <span className="title leading-none">$0</span>
              <span className="pb-[7.5px] leading-3 text-muted-foreground">
                / mo
              </span>
            </div>

            <StartForFreeButton authorizationUrl={authorizationUrl} />

            <Separator />

            <div className="flex w-full flex-col items-start justify-start gap-2">
              <TooltipProvider>
                <div className="flex items-center justify-start gap-1">
                  <CircleCheck className="h-5 w-5 fill-foreground stroke-background" />
                  <div className="flex items-center justify-start gap-1">
                    <span className="text-muted-foreground">
                      500 new images
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-start gap-1">
                  <CircleCheck className="h-5 w-5 fill-foreground stroke-background" />
                  <span className="text-muted-foreground">
                    Up to 5 templates
                  </span>
                </div>

                <div className="flex items-center justify-start gap-1">
                  <CircleX className="h-5 w-5 fill-foreground/25 stroke-background" />
                  <span className="text-muted-foreground">
                    Priority support
                  </span>
                </div>
              </TooltipProvider>
            </div>
          </Card>

          {/* Pro */}
          <Card className="flex w-full max-w-64 flex-col items-start justify-start gap-6 border-primary p-4">
            <div className="flex flex-col gap-2">
              <span className="second-title leading-none text-primary">
                Pro
              </span>
              <span className="text-left leading-none text-muted-foreground">
                Full platform and support access.
              </span>
            </div>
            <div className="flex items-end justify-start gap-1">
              <span className="title leading-none">$24</span>
              <span className="pb-[7.5px] leading-3 text-muted-foreground">
                / mo
              </span>
            </div>

            <StartWithProButton authorizationUrl={authorizationUrl} />

            <Separator />

            <div className="flex w-full flex-col items-start justify-start gap-2">
              <TooltipProvider>
                <div className="flex items-center justify-start gap-1">
                  <CircleCheck className="h-5 w-5 fill-primary stroke-background" />
                  <div className="flex items-center justify-start gap-1">
                    <span className="text-muted-foreground">
                      5,000 new images/mo
                    </span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 stroke-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="w-64 text-center">
                        Once this limit is reached, you will be charged $24 per
                        additional 5,000 images.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                <div className="flex items-center justify-start gap-1">
                  <CircleCheck className="h-5 w-5 fill-primary stroke-background" />
                  <span className="text-muted-foreground">
                    Unlimited templates
                  </span>
                </div>

                <div className="flex items-center justify-start gap-1">
                  <CircleCheck className="h-5 w-5 fill-primary stroke-background" />
                  <span className="text-muted-foreground">
                    Priority support
                  </span>
                </div>
              </TooltipProvider>
            </div>
          </Card>
        </div>

        <Link
          href="mailto:santiago@sharepreviews.com"
          target="_blank"
          className="w-full text-center text-muted-foreground underline-offset-2 hover:underline"
        >
          Need custom solutions? Contact us.
        </Link>
      </div>
      {/* Custom Separator */}
      {/* <div className="mt-4 h-4 w-full shrink-0 rounded-t-md border-t" />
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <h2 className="marketing-second-title text-balance">
          Frequently Asked Questions
        </h2>
      </div> */}
      <Footer isAuthenticated={isAuthenticated} />
    </div>
  )
}
