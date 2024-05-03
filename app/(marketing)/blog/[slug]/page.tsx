import Footer from '@/app/(marketing)/footer'
import { getUser } from '@/app/lib/workos'
import { Badge } from '@/app/ui/components/Badge'
import CodeBlock from '@/app/ui/components/CodeBlock'
import { QueryGenqlSelection, basehub } from 'basehub'
import { Pump } from 'basehub/react-pump'
import { RichText } from 'basehub/react-rich-text'
import dayjs from 'dayjs'
import { ChevronLeft } from 'lucide-react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const postBySlugQuery = (slug: string) => {
  return {
    blog: {
      meta: { title: true, ogImageUrl: true, twitterImageUrl: true },
      posts: {
        __args: {
          first: 1,
          filter: { _sys_slug: { eq: slug } },
        },
        items: {
          _id: true,
          _title: true,
          publishDate: true,
          category: { _title: true },
          author: {
            name: true,
            avatar: {
              url: true,
            },
          },
          content: {
            json: { content: true },
          },
          meta: {
            title: true,
            description: true,
            ogImageUrl: true,
            twitterImageUrl: true,
          },
        },
      },
    },
  } satisfies QueryGenqlSelection
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { blog } = await basehub({
    next: { revalidate: 60 },
    draft: draftMode().isEnabled,
  }).query(postBySlugQuery(params.slug))
  const [post] = blog.posts.items
  if (!post) notFound()

  return {
    title: post.meta.title,
    description: post.meta.description,
    alternates: {
      canonical: `https://sharepreviews.com/blog/${params.slug}`,
    },
    openGraph: {
      url: `https://sharepreviews.com/blog/${params.slug}`,
      type: 'article',
      siteName: 'SharePreviews',
      images: [post?.meta?.ogImageUrl ?? blog?.meta?.ogImageUrl!],
    },
    twitter: {
      site: '@sgalanb',
      creator: '@sgalanb',
      card: 'summary_large_image',
      images: [post?.meta?.twitterImageUrl ?? blog?.meta?.twitterImageUrl!],
    },
  }
}

export default async function BlogIndividualPage({
  params,
}: {
  params: { slug: string }
}) {
  const { isAuthenticated } = await getUser()

  return (
    <>
      <Pump
        next={{ revalidate: 60 }}
        draft={draftMode().isEnabled}
        queries={[postBySlugQuery(params.slug)]}
      >
        {async ([{ blog }]) => {
          'use server'
          const [post] = blog.posts.items
          if (!post) notFound()

          return (
            <div className="mx-auto flex w-full flex-col items-center justify-start gap-8 pb-4 pt-8">
              <Link
                href="/blog"
                className="flex w-full max-w-[36rem] items-center justify-start px-4 text-muted-foreground"
              >
                <ChevronLeft className="ml-[-4px]" />
                <span className="self-center text-sm">Blog</span>
              </Link>
              <div className="flex w-full max-w-[36rem] flex-col items-start justify-start gap-4 self-center px-4">
                <Badge className="self-center">{post?.category?._title}</Badge>
                <h1 className="marketing-title text-balance text-center">
                  {post._title}
                </h1>
                <div className="flex items-center justify-start gap-2 self-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post?.author?.avatar?.url ?? '/pfp.jpeg'}
                    alt="author profile picture"
                    width={28}
                    height={28}
                    className="h-7 w-7 rounded-full object-cover"
                    loading="lazy"
                  />
                  <span className="text-balance leading-5 text-muted-foreground">
                    {post?.author?.name} -{' '}
                    {dayjs(post.publishDate).format('MMM D, YYYY')}
                  </span>
                </div>
                <div className="flex w-full flex-col">
                  <RichText
                    blocks={post?.content?.json.content}
                    components={{
                      p: (p) => (
                        <p className="pb-2 text-base text-muted-foreground">
                          {p.children}
                        </p>
                      ),
                      h2: (h2) => (
                        <h2 className="marketing-second-title pb-2 pt-4">
                          {h2.children}
                        </h2>
                      ),
                      a: (a) => (
                        <Link
                          href={a.href}
                          className="text-primary underline-offset-2 hover:underline"
                          target={a.target}
                          rel={a.rel}
                        >
                          {a.children}
                        </Link>
                      ),
                      pre: (pre) => (
                        <CodeBlock className="w-full">{pre.code}</CodeBlock>
                      ),
                      code: (code) => (
                        <code className="rounded-md bg-foreground/5 px-2 py-0.5 font-mono  text-sm">
                          {code.children}
                        </code>
                      ),
                      img: (props) => (
                        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
                        <img className="self-center" {...props} />
                      ),
                      video: (props) => (
                        <video
                          className="self-center pb-8 pt-4"
                          controls
                          muted
                          autoPlay
                          {...props}
                        ></video>
                      ),
                      table: (table) => (
                        <table className="mb-2 w-full">{table.children}</table>
                      ),
                      th: (th) => (
                        <th className="self-center border p-2 text-center align-middle">
                          {th.children}
                        </th>
                      ),
                      td: (td) => (
                        <td className="self-center border px-2 pt-2 text-center align-middle">
                          {td.children}
                        </td>
                      ),
                    }}
                  >
                    {post?.content?.json.content}
                  </RichText>
                </div>
              </div>
              <Link
                href="https://x.com/sgalanb"
                target="_blank"
                className="mb-8 mt-4 flex flex-col gap-4 self-center rounded-lg border bg-card p-4 text-muted-foreground shadow-sm hover:bg-foreground/5"
              >
                <span>Got questions or ideas? Feel free to DM me on X!</span>
              </Link>
              <Footer isAuthenticated={isAuthenticated} />
            </div>
          )
        }}
      </Pump>
    </>
  )
}
