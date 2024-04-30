import Footer from '@/app/(marketing)/footer'
import { getUser } from '@/app/lib/workos'
import CodeBlock from '@/app/ui/components/CodeBlock'
import { QueryGenqlSelection, basehub } from 'basehub'
import { Pump } from 'basehub/react-pump'
import { RichText } from 'basehub/react-rich-text'
import dayjs from 'dayjs'
import { ChevronLeft } from 'lucide-react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const postBySlugQuery = (slug: string) => {
  return {
    blog: {
      meta: { title: true, ogImageUrl: true },
      posts: {
        __args: {
          first: 1,
          filter: { _sys_slug: { eq: slug } },
        },
        items: {
          _id: true,
          _title: true,
          subtitle: true,
          publishDate: true,
          author: {
            name: true,
            avatar: {
              url: true,
            },
          },
          content: {
            json: { content: true },
          },
          meta: { title: true, description: true, ogImageUrl: true },
          coverImage: { url: true },
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
      siteName: 'sharepreviews',
      images: [post?.meta.ogImageUrl ?? blog?.meta?.ogImageUrl!],
    },
    twitter: {
      site: '@sgalanb',
      creator: '@sgalanb',
      card: 'summary_large_image',
      images: [post?.meta.ogImageUrl ?? blog?.meta?.ogImageUrl!],
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
                <span className="self-center text-muted-foreground">
                  {dayjs(post.publishDate).format('MMM D, YYYY')}
                </span>
                <h1 className="marketing-title text-balance text-center">
                  {post._title}
                </h1>
                <p className="marketing-subtitle text-balance text-center text-muted-foreground">
                  {post.subtitle}
                </p>
                <div className="flex items-center justify-start gap-2 self-center">
                  {post?.author[0]?.avatar?.url && (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post?.author[0]?.avatar?.url ?? '/pfp.jpeg'}
                        alt="author profile picture"
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full object-cover"
                        loading="lazy"
                      />
                    </>
                  )}
                  {post?.author[0]?.name && (
                    <span className="text-balance font-medium leading-5 text-muted-foreground">
                      {post?.author[0]?.name}
                    </span>
                  )}
                </div>
                <div className="flex w-full flex-col">
                  <RichText
                    blocks={post?.content?.json.content}
                    components={{
                      p: (p) => <p className="pb-4 text-base">{p.children}</p>,
                      h2: (h2) => (
                        <h2 className="marketing-third-title pb-2 pt-6">
                          {h2.children}
                        </h2>
                      ),
                      pre: (pre) => (
                        <CodeBlock className="w-full">{pre.code}</CodeBlock>
                      ),
                      img: (props) => (
                        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
                        <img className="self-center" {...props} />
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
        }}
      </Pump>
    </>
  )
}
