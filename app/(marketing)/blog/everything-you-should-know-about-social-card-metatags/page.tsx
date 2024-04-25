import Footer from '@/app/(marketing)/footer'
import { getUser } from '@/app/lib/workos'
import { Card, CardContent } from '@/app/ui/components/Card'
import CodeBlock from '@/app/ui/components/CodeBlock'
import { Separator } from '@/app/ui/components/Separator'
import dayjs from 'dayjs'
import { ChevronLeft } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title:
    'Everything You Should Know About Social Card Metatags | sharepreviews',
  description:
    'Learn how to use Open Graph and Twitter metatags to control how your website is displayed when shared on social media.',
  alternates: {
    canonical:
      'https://sharepreviews.com/blog/everything-you-should-know-about-social-card-metatags',
  },
  openGraph: {
    url: 'https://sharepreviews.com/blog/everything-you-should-know-about-social-card-metatags',
    type: 'article',
    siteName: 'sharepreviews',
    images: [
      'https://sharepreviews.com/og/6446c4ba-ebbc-4688-be9d-9d0aa268627a?title_value=Everything You Should Know About Social Card Metatags&description_value= &featured_image_src=https://utfs.io/f/cddf4821-1c11-4596-823e-d2e38bac2a38-yy0bye.jpeg',
    ],
  },
  twitter: {
    site: '@sgalanb',
    creator: '@sgalanb',
    card: 'summary_large_image',
    images: [
      'https://sharepreviews.com/og/6446c4ba-ebbc-4688-be9d-9d0aa268627a?title_value=Everything You Should Know About Social Card Metatags&description_value= &featured_image_src=https://utfs.io/f/cddf4821-1c11-4596-823e-d2e38bac2a38-yy0bye.jpeg',
    ],
  },
}

export default async function BlogPage() {
  const { isAuthenticated } = await getUser()

  return (
    <div className="flex w-full flex-col items-start justify-start gap-8 pb-4 pt-8">
      <Link
        href="/blog"
        className="flex items-center justify-center px-4 text-muted-foreground"
      >
        <ChevronLeft className="ml-[-4px]" />
        <span className="self-center text-sm">Blog</span>
      </Link>
      <div className="flex w-full max-w-[36rem] flex-col items-start justify-start gap-4 self-center lg:px-4">
        <span className="self-center text-muted-foreground">
          {dayjs('02/15/2024').format('MMM D, YYYY')}
        </span>
        <h1 className="marketing-title text-balance text-center">
          Everything you should know about social card metatags
        </h1>
        <p className="marketing-subtitle text-balance text-center text-muted-foreground">
          Learn how to use Open Graph and Twitter metatags to control how your
          website is displayed when shared on social media.
        </p>
        <div className="flex items-center justify-start gap-2 self-center">
          <Image
            src="/pfp.jpeg"
            alt="author profile picture"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="text-balance font-medium leading-5 text-muted-foreground">
            Santiago Galán
          </span>
        </div>
        {/* Content Table */}
        <Card className="my-4 w-full">
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col pt-6">
              <span className="marketing-second-title">F.A.Q.</span>
            </div>
            <ul className="flex list-inside list-disc flex-col justify-start gap-2">
              <li className="text-base underline-offset-2 hover:text-foreground hover:underline">
                <Link href="#faq1">What are social card metatags?</Link>
              </li>

              <li className="text-base underline-offset-2 hover:text-foreground hover:underline">
                <Link href="#faq2">Does social cards improve SEO?</Link>
              </li>
              <li className="text-base underline-offset-2 hover:text-foreground hover:underline">
                <Link href="#faq3">
                  What is the difference between og:X and twitter:X metatags?
                </Link>
              </li>
              <li className="text-base underline-offset-2 hover:text-foreground hover:underline">
                <Link href="#faq4">
                  Why some metatags are defined by property and others by name?
                </Link>
              </li>
            </ul>

            <div className="flex flex-col pt-6">
              <span className="marketing-second-title">Main Metatags</span>
            </div>
            <div className="lg:columns-2">
              <ul className="flex list-inside list-disc flex-col gap-2">
                <li className="text-base underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#title">title</Link>
                </li>
                <li className="text-base underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#description">description</Link>
                </li>
                <li className="text-base underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#og:title">og:title</Link>
                </li>
                <li className="text-base underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#og:description">og:description</Link>
                </li>
                <li className="text-base underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#og:image">og:image</Link>
                </li>
                <li className="text-base underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#og:image:dimensions">og:image:widht/height</Link>
                </li>
                <li className="text-base underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#og:image:type">og:image:type</Link>
                </li>
                <li className="text-base underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#og:url">og:url</Link>
                </li>
                <li className="text-base underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#og:site_name">og:site_name</Link>
                </li>
                <li className="text-base underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#og:type">og:type</Link>
                </li>
                <li className="text-base underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#twitter:title">twitter:title</Link>
                </li>
                <li className="text-base underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#twitter:description">twitter:description</Link>
                </li>
                <li className="text-base underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#twitter:card">twitter:card</Link>
                </li>
                <li className="text-base underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#twitter:image">twitter:image</Link>
                </li>
                <li className="text-base underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#twitter:image:dimensions">
                    twitter:image:width/height
                  </Link>
                </li>
                <li className="text-base underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#twitter:image:type">twitter:image:type</Link>
                </li>
                <li className="text-base underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#twitter:site">twitter:site</Link>
                </li>
                <li className="text-base underline-offset-2 hover:text-foreground hover:underline">
                  <Link href="#twitter:creator">twitter:creator</Link>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
        {/* Content */}
        <h2 className="marketing-third-title pt-14 lg:pt-8" id="faq1">
          What are social card metatags?
        </h2>
        <p className="text-base dark:text-muted-foreground">
          Social card metatags are <strong>snippets of code</strong> that
          control the content of a <strong>social card</strong>.
        </p>
        <p className="text-base dark:text-muted-foreground">
          For example when you share a link on Facebook, Twitter or LinkedIn,
          these platforms display a card with a title, description and image
          defined in metatags. If no metatags are defined, the platform will
          only show the URL.
        </p>
        <h2 className="marketing-third-title pt-14 lg:pt-8" id="faq2">
          Does social metatags improve SEO?
        </h2>
        <p className="text-base dark:text-muted-foreground">
          Social metatags don&apos;t directly influence search engine rankings,
          but they can indirectly enhance SEO by boosting{' '}
          <strong>click-through rates</strong> and social media{' '}
          <strong>engagement</strong>, as they grab more{' '}
          <strong>attention</strong> and take up more{' '}
          <strong>screen real estate</strong>.
        </p>
        <p className="text-base dark:text-muted-foreground">
          For example, here is a link shared on Twitter/X without metatags:
        </p>
        <Image
          src="/no-metatags-example.png"
          alt="Link shared on Twitter without metatags, only showing the URL"
          width={420}
          height={420}
          className="self-center rounded-md object-cover"
        />
        <p className="text-base dark:text-muted-foreground">
          And here is a link with all the metatags properly set:
        </p>
        <Image
          src="/metatags-example.png"
          alt="Link shared on Twitter with metatags, showing a title, description and image"
          width={420}
          height={420}
          className="self-center rounded-md object-cover"
        />
        <h2 className="marketing-third-title pt-14 lg:pt-8" id="faq3">
          What is the difference between og:X and twitter:X metatags?
        </h2>
        <p className="text-base dark:text-muted-foreground">
          <strong>Open Graph</strong> (og) tags are a set of standardized
          metatags created by <strong>Facebook</strong>.
        </p>
        <p className="text-base dark:text-muted-foreground">
          <strong>Twitter</strong> tags (also known as Twitter Cards) are pretty
          similar to Open Graph tags but they were created by{' '}
          <strong>Twitter/X</strong>.
        </p>
        <p className="text-base dark:text-muted-foreground">
          Most platforms support both Open Graph and Twitter Cards, but there
          are some exceptions, so it&apos;s a{' '}
          <strong>good idea to include both</strong> in your website.
        </p>
        <h2 className="marketing-third-title pt-14 lg:pt-8" id="faq4">
          Why some metatags are defined by property and others by name?
        </h2>
        <p className="text-base dark:text-muted-foreground">
          They serve the same purpose, but generally Open Graph metatags are
          defined by property and the rest by name.
        </p>
        <Separator className="mt-14 lg:mt-8" />
        <h2 className="marketing-third-title pt-14 lg:pt-8" id="title">
          title
        </h2>
        <p className="text-base dark:text-muted-foreground">
          The title tag is the headline of your web page in{' '}
          <strong>search engine results</strong> and{' '}
          <strong>browser tabs</strong>. It&apos; also used in social previews
          when no og:title is specified. Ensure it&apos;s{' '}
          <strong>unique</strong> and <strong>descriptive</strong> of your
          page&apos;s content, incorporating relevant keywords.
        </p>
        <CodeBlock>{`<title>Your title</title>`}</CodeBlock>
        <h2 className="marketing-third-title pt-14 lg:pt-8" id="description">
          description
        </h2>
        <p className="text-base dark:text-muted-foreground">
          This tag offers a <strong>brief summary</strong> of your page&apos;s
          content and can appear under the title in search results if the search
          engine finds it relevant. Though not a direct ranking factor, a
          well-crafted meta description (160 characters max) can improve
          click-through rates by providing a <strong>clear</strong>,{' '}
          <strong>actionable</strong> summary of the page.
        </p>
        <CodeBlock>
          {`<meta name="description" content="Your description" />`}
        </CodeBlock>
        <h2 className="marketing-third-title pt-14 lg:pt-8" id="og:title">
          og:title
        </h2>
        <p className="text-base dark:text-muted-foreground">
          The OG title tag dictates{' '}
          <strong>how titles appear on social media</strong>, encouraging
          engagement when content is shared. Can be the same as the title tag,
          or a different one tailored for social media. Write these titles to
          capture attention on social platforms, keeping them{' '}
          <strong>concise</strong> and <strong>relevant</strong>.
        </p>
        <CodeBlock>{`<meta property="og:title" content="Your title" />`}</CodeBlock>
        <h2 className="marketing-third-title pt-14 lg:pt-8" id="og:description">
          og:description
        </h2>
        <p className="text-base dark:text-muted-foreground">
          Similar to the <strong>description</strong> metatag but{' '}
          <strong>for social media</strong>. In fact, it can be the same text,
          or a different one tailored for social media.
        </p>
        <CodeBlock>
          {`<meta property="og:description" content="Your description" />`}
        </CodeBlock>
        <h2 className="marketing-third-title pt-14 lg:pt-8" id="og:image">
          og:image
        </h2>
        <p className="text-base dark:text-muted-foreground">
          This tag specifies the image used in social previews, crucial for
          capturing attention on social platforms. Choose an image that is
          visually <strong>appealing</strong> and{' '}
          <strong>representative</strong> of the content.
        </p>
        <p className="text-base dark:text-muted-foreground">
          Must be a <strong>URL to an image file</strong> that is less than 5 MB
          in size. JPG, PNG, WEBP and GIF formats are supported. SVG is not
          supported.
        </p>
        <CodeBlock>
          {`<meta property="og:image" content="Your image URL" />`}
        </CodeBlock>
        <h2
          className="marketing-third-title pt-14 lg:pt-8"
          id="og:image:dimensions"
        >
          og:image:width & og:image:height
        </h2>
        <p className="text-base dark:text-muted-foreground">
          The <strong>dimensions</strong> of your OG image. This tag ensures the
          images are rendered immediately without the platforms having to
          asynchronously download and process it. The{' '}
          <strong>recommended size</strong> is 1200x630 pixels, but most
          platforms also support square images.
        </p>
        <CodeBlock>
          {`<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />`}
        </CodeBlock>
        <h2 className="marketing-third-title pt-14 lg:pt-8" id="og:image:type">
          og:image:type
        </h2>
        <p className="text-base dark:text-muted-foreground">
          The MIME type of the <strong>og:image</strong>. Accepted values are{' '}
          <strong>&quot;image/jpeg&quot;</strong>,{' '}
          <strong>&quot;image/png&quot;</strong> and{' '}
          <strong>&quot;image/gif&quot;</strong>.
        </p>
        <CodeBlock>
          {`<meta property="og:image:type" content="Your image type" />`}
        </CodeBlock>
        <h2 className="marketing-third-title pt-14 lg:pt-8" id="og:url">
          og:url
        </h2>
        <p className="text-base dark:text-muted-foreground">
          This tag identifies the <strong>canonical URL</strong> of the content.
        </p>
        <CodeBlock>{`<meta property="og:url" content="Your URL" />`}</CodeBlock>
        <h2 className="marketing-third-title pt-14 lg:pt-8" id="og:site_name">
          og:site_name
        </h2>
        <p className="text-base dark:text-muted-foreground">
          This tag indicates the{' '}
          <strong>name of the website, app or organization</strong> that ows the
          content. Some platforms such as Slack, Discord or Telegram shows this
          tag in their previews.
        </p>
        <CodeBlock>
          {`<meta property="og:site_name" content="Your site name" />`}
        </CodeBlock>
        <h2 className="marketing-third-title pt-14 lg:pt-8" id="og:type">
          og:type
        </h2>
        <p className="text-base dark:text-muted-foreground">
          This tag indicates the type of content. Most common values are{' '}
          <strong>&quot;website&quot;</strong> and{' '}
          <strong>&quot;article&quot;</strong>, but there are other types for
          more specific use cases.{' '}
          <Link
            href="https://ogp.me/#types"
            target="_blank"
            className="underline underline-offset-2"
          >
            Learn more.
          </Link>
        </p>
        <CodeBlock>{`<meta property="og:type" content="Your content type" />`}</CodeBlock>
        <h2 className="marketing-third-title pt-14 lg:pt-8" id="twitter:title">
          twitter:title
        </h2>
        <p className="text-base dark:text-muted-foreground">
          The <strong>same as og:title</strong> but for Twitter/X.
        </p>
        <CodeBlock>{`<meta name="twitter:title" content="Your title" />`}</CodeBlock>
        <h2
          className="marketing-third-title pt-14 lg:pt-8"
          id="twitter:description"
        >
          twitter:description
        </h2>
        <p className="text-base dark:text-muted-foreground">
          The <strong>same as og:description</strong> but for Twitter/X.
        </p>
        <p className="italic dark:text-muted-foreground">
          Currently this tag is not shown on previews, but it it still
          recommended to include it since Twitter/X is testing different layouts
          of previews constantly.
        </p>
        <CodeBlock>
          {`<meta name="twitter:description" content="Your description" />`}
        </CodeBlock>
        <h2 className="marketing-third-title pt-14 lg:pt-8" id="twitter:card">
          twitter:card
        </h2>
        <p className="text-base dark:text-muted-foreground">
          The twitter card tag is <strong>required</strong> for Twitter/X to
          show any type of preview. Use <strong>&quot;summary&quot;</strong> if
          your image is square and{' '}
          <strong>&quot;summary_large_image&quot;</strong> if your image is
          landscape.
        </p>
        <CodeBlock>{`<meta name="twitter:card" content="Your card type" />`}</CodeBlock>
        <h2 className="marketing-third-title pt-14 lg:pt-8" id="twitter:image">
          twitter:image
        </h2>
        <p className="text-base dark:text-muted-foreground">
          This tag define the image displayed in tweets when a{' '}
          <strong>twitter:card</strong> metatag is also present.
        </p>
        <p className="text-base dark:text-muted-foreground">
          Must be a <strong>URL to an image file</strong> that is less than 5 MB
          in size. JPG,PNG, WEBP and GIF formats are supported. Only the first
          frame of an animated GIF will be used. SVG is not supported.
        </p>
        <CodeBlock>
          {`<meta name="twitter:image" content="Your image URL" />`}
        </CodeBlock>
        <h2
          className="marketing-third-title pt-14 lg:pt-8"
          id="twitter:image:dimensions"
        >
          twitter:image:width & twitter:image:height
        </h2>
        <p className="text-base dark:text-muted-foreground">
          The <strong>dimensions</strong> of your <strong>twitter:image</strong>
          . The recommended size is 1200x630 pixels, but Twitter/X also support
          square images. Keep in mind that if you want to use a square image,{' '}
          <strong>twitter:card</strong> must be set to &quot;summary&quot;
          instead of &quot;summary_large_image&quot;.
        </p>
        <CodeBlock>
          {`<meta name="twitter:image:width" content="Your image width" />
<meta name="twitter:image:height" content="Your image height" />`}
        </CodeBlock>
        <h2
          className="marketing-third-title pt-14 lg:pt-8"
          id="twitter:image:type"
        >
          twitter:image:type
        </h2>
        <p className="text-base dark:text-muted-foreground">
          The MIME type of the <strong>twitter:image</strong>. Accepted values
          are <strong>&quot;image/jpeg&quot;</strong>,{' '}
          <strong>&quot;image/png&quot;</strong> and{' '}
          <strong>&quot;image/gif&quot;</strong>.
        </p>
        <CodeBlock>
          {`<meta name="twitter:image:type" content="Your image type" />`}
        </CodeBlock>
        <h2 className="marketing-third-title pt-14 lg:pt-8" id="twitter:site">
          twitter:site
        </h2>
        <p className="text-base dark:text-muted-foreground">
          This tag defines the <strong>@username</strong> of the{' '}
          <strong>website</strong>, <strong>app</strong> or{' '}
          <strong>organization</strong>.
        </p>
        <CodeBlock>
          {`<meta name="twitter:site" content="Your Twitter handle" />`}
        </CodeBlock>
        <h2
          className="marketing-third-title pt-14 lg:pt-8"
          id="twitter:creator"
        >
          twitter:creator
        </h2>
        <p className="text-base dark:text-muted-foreground">
          This tag defines the <strong>@username</strong> of the{' '}
          <strong>individual creator</strong> of the content. Usually the same
          as twitter:site.
        </p>
        <CodeBlock>
          {`<meta name="twitter:creator" content="Your Twitter handle" />`}
        </CodeBlock>
      </div>
      <Link
        href="https://x.com/sgalanb"
        target="_blank"
        className="my-12 flex flex-col gap-4 self-center rounded-lg border bg-card p-4 text-muted-foreground shadow-sm hover:bg-foreground/5"
      >
        <span>Got questions or ideas? Feel free to DM me on X!</span>
        <div className="flex items-center justify-center gap-2 self-center">
          <Image
            src="/pfp.jpeg"
            alt="author profile picture"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="text-balance font-medium leading-5">
            Santiago Galán
          </span>
        </div>
      </Link>
      <Footer isAuthenticated={isAuthenticated} />
    </div>
  )
}
