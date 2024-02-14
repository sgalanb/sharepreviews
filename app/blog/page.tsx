import { Button } from '@/app/ui/components/Button'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog | sharepreviews',
}

export default function BlogPage() {
  return (
    <div className="flex w-full max-w-7xl flex-col items-start justify-start gap-4 p-4 lg:p-12">
      <span>BLOG</span>
      <Button variant="link" asChild>
        <Link href="/blog/everything-you-should-know-about-social-meta-tags">
          Everything You Should Know About Social Meta Tags
        </Link>
      </Button>
    </div>
  )
}
