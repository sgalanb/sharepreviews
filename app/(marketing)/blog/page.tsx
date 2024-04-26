import Footer from '@/app/(marketing)/footer'
import { getUser } from '@/app/lib/workos'
import { Card } from '@/app/ui/components/Card'
import { QueryGenqlSelection, basehub } from 'basehub'
import { Pump } from 'basehub/react-pump'
import dayjs from 'dayjs'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

const postBySlugQuery = () => {
  return {
    blog: {
      meta: { title: true, description: true, ogImageUrl: true },
      posts: {
        __args: { first: 10, orderBy: 'publishDate__DESC' },
        items: {
          _id: true,
          _title: true,
          _slug: true,
          subtitle: true,
          publishDate: true,
        },
      },
    },
  } satisfies QueryGenqlSelection
}

export async function generateMetadata(): Promise<Metadata> {
  const { blog } = await basehub({
    next: { revalidate: 60 },
    draft: draftMode().isEnabled,
  }).query(postBySlugQuery())

  return {
    title: blog.meta.title,
    description: blog.meta.description,
    alternates: {
      canonical: 'https://sharepreviews.com/blog',
    },
    openGraph: {
      url: 'https://sharepreviews.com/blog',
      type: 'article',
      siteName: 'sharepreviews',
      images: [blog?.meta.ogImageUrl!],
    },
    twitter: {
      site: '@sgalanb',
      creator: '@sgalanb',
      card: 'summary_large_image',
      images: [blog?.meta.ogImageUrl!],
    },
  }
}

export default async function BlogPage() {
  const { isAuthenticated } = await getUser()

  return (
    <Pump queries={[postBySlugQuery()]} next={{ revalidate: 60 }}>
      {async ([{ blog }]) => {
        'use server'

        return (
          <div className="flex h-full w-full flex-col items-center justify-start gap-8 pt-16">
            <h1 className="marketing-title pt-4 lg:p-0">Blog</h1>
            <div className="mb-10 flex flex-col items-center justify-center gap-10 p-4 lg:mb-0 lg:flex-row lg:px-8">
              <ul>
                {blog.posts.items.map((post) => {
                  return (
                    <li key={post._id}>
                      <Card className="max-w-[30rem]">
                        <Link
                          href={`/blog/${post._slug}`}
                          className="flex flex-col gap-4 rounded-md p-4 hover:bg-accent lg:flex-row"
                        >
                          <div className="order-2 w-full lg:order-1">
                            <div className="flex h-full flex-col justify-between gap-8">
                              <div className="flex flex-col gap-4">
                                <h2 className="marketing-second-title lg:text-balance">
                                  {post._title}
                                </h2>
                                <p className="marketing-subtitle text-muted-foreground lg:text-balance">
                                  {post.subtitle}
                                </p>
                              </div>
                              <div className="flex items-center justify-start gap-2">
                                <Image
                                  src="/pfp.jpeg"
                                  alt="author profile picture"
                                  width={40}
                                  height={40}
                                  className="h-10 w-10 rounded-full object-cover"
                                />
                                <span className="text-balance font-medium leading-5">
                                  Santiago Galán
                                </span>
                                <span className="text-balance font-medium leading-5">
                                  ·
                                </span>
                                <span className="text-muted-foreground">
                                  {dayjs('02/15/2024').format('MMM D, YYYY')}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </Card>
                    </li>
                  )
                })}
              </ul>
            </div>

            <Footer isAuthenticated={isAuthenticated} />
          </div>
        )
      }}
    </Pump>
  )
}
