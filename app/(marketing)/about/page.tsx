import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | sharepreviews',
}

export default async function AboutPage() {
  return (
    <div className="flex h-full w-full max-w-7xl flex-col items-center justify-start gap-4 p-4 pt-8 lg:gap-8">
      <div className="flex w-full flex-col items-center justify-start gap-4">
        <h1 className="marketing-title">About</h1>
        <p className="marketing-subtitle text-balance text-center text-muted-foreground lg:px-28">
          A curated collection of dynamic card images made with{' '}
          <span className="text-primary">sharepreviews</span>. You can use them
          as starter templates for your own projects.
        </p>
      </div>
    </div>
  )
}
