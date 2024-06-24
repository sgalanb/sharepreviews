import Posts from '@/app/(marketing)/blog/Posts'
import Footer from '@/app/(marketing)/footer'
import { getUser } from '@/app/lib/workos'
import { QueryGenqlSelection, basehub } from 'basehub'
import { Pump } from 'basehub/react-pump'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'

const postBySlugQuery = () => {
  return {
    blog: {
      posts: {
        __args: { first: 10, orderBy: 'publishDate__DESC' },
        items: {
          _id: true,
          _title: true,
          _slug: true,
          publishDate: true,
          category: { _slug: true, _title: true },
          author: {
            name: true,
            avatar: {
              url: true,
            },
          },
          ogImage: {
            url: true,
          },
          title: true,
          description: true,
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
    title: 'Blog | sharepreviews',
    description:
      'Learn how to manage and generate Open Graph metatags with sharepreviews. Product updates, guides and technical articles.',
    alternates: {
      canonical: 'https://sharepreviews.com/blog',
    },
    openGraph: {
      url: 'https://sharepreviews.com/blog',
      type: 'article',
      siteName: 'SharePreviews',
    },
    twitter: {
      site: '@sgalanb',
      creator: '@sgalanb',
      card: 'summary_large_image',
    },
  }
}

export default async function BlogPage() {
  const { isAuthenticated } = await getUser()

  return (
    <Pump queries={[postBySlugQuery()]} next={{ revalidate: 60 }}>
      {async ([{ blog }]) => {
        'use server'
        const posts = blog.posts.items

        return (
          <div className="flex h-full w-full flex-col items-center justify-start gap-8 pt-16">
            <h1 className="marketing-title pt-4 lg:p-0">Blog</h1>

            <Posts posts={posts} />

            <Footer isAuthenticated={isAuthenticated} />
          </div>
        )
      }}
    </Pump>
  )
}
