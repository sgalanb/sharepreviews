'use client'

import { Card } from '@/app/ui/components/Card'
import { Tabs, TabsList, TabsTrigger } from '@/app/ui/components/Tabs'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Posts({ posts }: { posts: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState('all')

  return (
    <Tabs
      value={selectedCategory}
      onValueChange={(value) => setSelectedCategory(value)}
      className="mb-16 flex w-full flex-col items-center justify-center gap-8 px-4 lg:mb-0 lg:px-8"
    >
      <TabsList className="flex w-fit items-center justify-start overflow-x-auto border">
        <TabsTrigger value="all" className="h-full py-[5px]">
          All
        </TabsTrigger>
        <TabsTrigger value="changelog" className="h-full py-[5px]">
          Changelog
        </TabsTrigger>
        <TabsTrigger value="guides" className="h-full py-[5px]">
          Guides
        </TabsTrigger>
        <TabsTrigger value="technical-articles" className="h-full py-[5px]">
          Technical Articles
        </TabsTrigger>
      </TabsList>

      <div className="grid w-full grid-cols-1 place-items-center items-center justify-center gap-4 lg:grid-cols-3">
        {posts
          .filter(
            (post) =>
              post.category?._slug === selectedCategory ||
              selectedCategory === 'all'
          )
          .map((post) => {
            return (
              <Card key={post._id} className="h-full max-w-[30rem]">
                <Link
                  href={`/blog/${post?._slug}`}
                  className="flex h-full flex-col gap-4 rounded-md p-4 hover:bg-accent lg:flex-row"
                >
                  <div className="order-2 w-full lg:order-1">
                    <div className="flex h-full flex-col justify-between gap-4">
                      <div className="flex flex-col gap-4">
                        <h2 className="marketing-third-title line-clamp-3 text-balance">
                          {post._title}
                        </h2>
                      </div>
                      <div className="flex items-center justify-start gap-2">
                        <Image
                          src="/pfp.jpeg"
                          alt="author profile picture"
                          width={28}
                          height={28}
                          className="h-7 w-7 rounded-full object-cover"
                        />
                        <span className="font-medium leading-5">
                          {post?.author?.name}
                        </span>
                        <span className="font-medium leading-5">·</span>
                        <span className="text-muted-foreground">
                          {dayjs(post?.publishDate).format('MMM D, YYYY')}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Card>
            )
          })}
      </div>
    </Tabs>
  )
}
