import { Card, CardContent } from '@/app/ui/components/Card'
import CodeBlock from '@/app/ui/components/CodeBlock'
import {
  TypographyH1,
  TypographyH2,
  TypographyP,
} from '@/app/ui/components/typography'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function BlogPage() {
  return (
    <div className="flex w-full max-w-7xl flex-col items-start justify-start gap-4 p-4 lg:p-12">
      <Link
        href="/blog"
        className="flex items-center justify-center text-muted-foreground lg:px-4"
      >
        <ChevronLeft className="ml-[-4px]" />
        <span className="self-center text-sm">Blog</span>
      </Link>
      <div className="flex w-full max-w-3xl flex-col items-start justify-start gap-4 self-center lg:px-4">
        <TypographyH1 className="text-balance text-center leading-[4rem]">
          Everything You Should Know About Social Metatags
        </TypographyH1>
        <TypographyP className="mt-4">
          Metatags are snippets of text that describe a page&apos;s content; the
          metatags don&apos;t appear on the page itself, but only in the
          page&apos;s code. Metatags are essentially little content descriptors
          that help tell search engines what a web page is about.
        </TypographyP>
        {/* Content Table */}
        <Card className="my-4 w-full">
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col pt-6">
              <span className="text-2xl font-semibold leading-none tracking-tight">
                F.A.Q.
              </span>
            </div>
            <div className="lg:columns-2">
              <ul className="flex list-inside list-disc flex-col gap-2">
                <li className="text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#">What are metatags?</Link>
                </li>
              </ul>
              <ul className="flex list-inside list-disc flex-col gap-2">
                <li className="text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#">
                    Why some tags are defined by property and others by name?
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col pt-6">
              <span className="text-2xl font-semibold leading-none tracking-tight">
                Main Metatags
              </span>
            </div>
            <div className="lg:columns-2">
              <ul className="flex list-inside list-disc flex-col gap-2">
                <li className="text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#title">title</Link>
                </li>
                <li className="text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#description">description</Link>
                </li>
                <li className="text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#og:title">og:title</Link>
                </li>
                <li className="text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#og:description">og:description</Link>
                </li>
                <li className="text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#og:image">og:image</Link>
                </li>
                <li className="text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#og:image:dimensions">og:image:widht/height</Link>
                </li>
                <li className="text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#og:image:type">og:image:type</Link>
                </li>
                <li className="text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#og:url">og:url</Link>
                </li>
                <li className="text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#og:site_name">og:site_name</Link>
                </li>
                <li className="text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#og:type">og:type</Link>
                </li>
                <li className="text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#twitter:title">twitter:title</Link>
                </li>
                <li className="text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#twitter:description">twitter:description</Link>
                </li>
                <li className="text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#twitter:card">twitter:card</Link>
                </li>
                <li className="text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#twitter:image">twitter:image</Link>
                </li>
                <li className="text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#twitter:image:dimensions">
                    twitter:image:width/height
                  </Link>
                </li>
                <li className="text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#twitter:image:type">twitter:image:type</Link>
                </li>
                <li className="text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#twitter:site">twitter:site</Link>
                </li>
                <li className="text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#twitter:creator">twitter:creator</Link>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
        {/* Content */}
        <TypographyH2 className="pt-14 lg:pt-8" id="title">
          title
        </TypographyH2>
        <TypographyP>
          The title tag is the headline of your web page in search engine
          results and browser tabs. It&apos; also used in social previews when
          no og:title is specified. It&apos;s crucial for SEO and user
          click-through rates. Keep it under 60 characters to avoid truncation
          and ensure it&apos;s unique and descriptive of your page&apos;s
          content, incorporating relevant keywords.
        </TypographyP>
        <CodeBlock>{`<title>Your title</title>`}</CodeBlock>
        <TypographyH2 className="pt-14 lg:pt-8" id="description">
          description
        </TypographyH2>
        <TypographyP>
          This tag offers a brief summary of your page&apos;s content, appearing
          under the title in search results. Though not a direct ranking factor,
          a well-crafted meta description (150-160 characters) can improve
          click-through rates by providing a clear, actionable summary of the
          page.
        </TypographyP>
        <CodeBlock>
          {`<meta name="description" content="Your description" />`}
        </CodeBlock>

        <TypographyH2 className="pt-14 lg:pt-8" id="og:title">
          og:title
        </TypographyH2>
        <TypographyP>
          The Open Graph title tag dictates how titles appear on social media,
          encouraging engagement when content is shared. Craft these titles to
          capture attention on social platforms, keeping them concise and
          relevant.
        </TypographyP>
        <CodeBlock>{`<meta property="og:title" content="Your title" />`}</CodeBlock>

        <TypographyH2 className="pt-14 lg:pt-8" id="og:description">
          og:description
        </TypographyH2>
        <TypographyP>
          Similar to the meta description but for social media, the OG
          description should entice users with a compelling summary of the
          content, tailored for social sharing.
        </TypographyP>
        <CodeBlock>
          {`<meta property="og:description" content="Your description" />`}
        </CodeBlock>

        <TypographyH2 className="pt-14 lg:pt-8" id="og:image">
          og:image
        </TypographyH2>
        <TypographyP>
          This tag specifies the image used in social shares, crucial for
          capturing attention on platforms like Facebook and LinkedIn. Choose an
          image that is visually appealing and representative of the content,
          adhering to recommended dimensions for optimal display.
        </TypographyP>
        <CodeBlock>
          {`<meta property="og:image" content="Your image URL" />`}
        </CodeBlock>

        <TypographyH2 className="pt-14 lg:pt-8" id="og:image:dimensions">
          og:image:width & og:image:height
        </TypographyH2>
        <TypographyP>
          Defining the dimensions of your OG image ensures it displays correctly
          across social platforms. The generally recommended size is 1200x630
          pixels to ensure your content looks its best when shared. Use
          og:image:width and og:image:height Open Graph tags to specify the
          image dimensions to the crawler so that it can render the image
          immediately without having to asynchronously download and process it.
        </TypographyP>
        <CodeBlock>
          {`<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />`}
        </CodeBlock>

        <TypographyH2 className="pt-14 lg:pt-8" id="og:image:type">
          og:image:type
        </TypographyH2>
        <TypographyP>
          The type of image (JPEG, PNG, GIF) used in OG tags affects how
          it&apos;s rendered on social media. Select the format that best
          maintains the quality and load speed of your image. MIME type of the
          image. One of image/jpeg, image/gif or image/png
        </TypographyP>
        <CodeBlock>
          {`<meta property="og:image:type" content="Your image type" />`}
        </CodeBlock>

        <TypographyH2 className="pt-14 lg:pt-8" id="og:url">
          og:url
        </TypographyH2>
        <TypographyP>
          This tag identifies the canonical URL of your content, helping to
          consolidate link equity and ensure consistency in how your content is
          shared and displayed.
        </TypographyP>
        <CodeBlock>{`<meta property="og:url" content="Your URL" />`}</CodeBlock>

        <TypographyH2 className="pt-14 lg:pt-8" id="og:site_name">
          og:site_name
        </TypographyH2>
        <TypographyP>
          Indicate the name of your website or app with the OG:Site_Name tag to
          provide context for your shared content on social media platforms.
          Some platforms such as Slack, Discord or Telegram use this tag in
          their previews.
        </TypographyP>
        <CodeBlock>
          {`<meta property="og:site_name" content="Your site name" />`}
        </CodeBlock>

        <TypographyH2 className="pt-14 lg:pt-8" id="og:type">
          og:type
        </TypographyH2>
        <TypographyP>
          Specifying the type of content (e.g., article, video) with the OG:Type
          tag helps social platforms understand and properly display your shared
          content.
        </TypographyP>
        <CodeBlock>{`<meta property="og:type" content="Your content type" />`}</CodeBlock>

        <TypographyH2 className="pt-14 lg:pt-8" id="twitter:title">
          twitter:title
        </TypographyH2>
        <TypographyP>
          This tag customizes how your content&apos;s title appears in tweets,
          allowing for a Twitter-specific title that can differ from the main
          title tag to better engage the Twitter audience.
        </TypographyP>
        <CodeBlock>{`<meta name="twitter:title" content="Your title" />`}</CodeBlock>

        <TypographyH2 className="pt-14 lg:pt-8" id="twitter:description">
          twitter:description
        </TypographyH2>
        <TypographyP>
          A brief description for Twitter shares, this tag should be concise and
          compelling, tailored to catch the attention of users scrolling through
          their Twitter feed.
        </TypographyP>
        <CodeBlock>
          {`<meta name="twitter:description" content="Your description" />`}
        </CodeBlock>

        <TypographyH2 className="pt-14 lg:pt-8" id="twitter:card">
          twitter:card
        </TypographyH2>
        <TypographyP>
          The Twitter:Card tag determines the layout of your content on Twitter,
          whether it&apos;s a summary, summary with a large image, app, or
          player card, influencing how engaging your tweet appears.
        </TypographyP>
        <CodeBlock>{`<meta name="twitter:card" content="Your card type" />`}</CodeBlock>

        <TypographyH2 className="pt-14 lg:pt-8" id="twitter:image">
          twitter:image
        </TypographyH2>
        <TypographyP>
          These tags define the image displayed in tweets. Ensure the image is
          engaging and sized appropriately for Twitter.
        </TypographyP>
        <CodeBlock>
          {`<meta name="twitter:image" content="Your image URL" />`}
        </CodeBlock>

        <TypographyH2 className="pt-14 lg:pt-8" id="twitter:image:dimensions">
          twitter:image:width & twitter:image:height
        </TypographyH2>
        <TypographyP>
          Specifying the width and height of your Twitter image ensures it
          appears as intended, without unexpected cropping or distortion.
        </TypographyP>
        <CodeBlock>
          {`<meta name="twitter:image:width" content="Your image width" />
<meta name="twitter:image:height" content="Your image height" />`}
        </CodeBlock>

        <TypographyH2 className="pt-14 lg:pt-8" id="twitter:image:type">
          twitter:image:type
        </TypographyH2>
        <TypographyP>
          The format of your Twitter image (JPEG, PNG, GIF) can impact its
          display and loading time on the platform. Choose the best format for
          clarity and speed.
        </TypographyP>
        <CodeBlock>
          {`<meta name="twitter:image:type" content="Your image type" />`}
        </CodeBlock>

        <TypographyH2 className="pt-14 lg:pt-8" id="twitter:site">
          twitter:site
        </TypographyH2>
        <TypographyP>
          Identify the Twitter handle of your website or publisher with this
          tag, helping to link the shared content back to its source and
          increase your brand&apos;s visibility on Twitter.
        </TypographyP>
        <CodeBlock>
          {`<meta name="twitter:site" content="Your Twitter handle" />`}
        </CodeBlock>

        <TypographyH2 className="pt-14 lg:pt-8" id="twitter:creator">
          twitter:creator{' '}
        </TypographyH2>
        <TypographyP>
          This tag credits the individual creator of the content, promoting
          their Twitter handle alongside the shared content and fostering a
          connection with the audience.
        </TypographyP>
        <CodeBlock>
          {`<meta name="twitter:creator" content="Your Twitter handle" />`}
        </CodeBlock>
      </div>
    </div>
  )
}
