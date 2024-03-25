import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing | sharepreviews',
}

export default async function AboutPage() {
  return (
    <div className="flex h-full w-full max-w-7xl flex-col items-center justify-start gap-4 p-4 pt-8 lg:gap-8">
      <div className="flex w-full flex-col items-center justify-start gap-4">
        <h1 className="marketing-title">Straightforward pricing</h1>
        <p className="marketing-subtitle text-balance text-center text-muted-foreground lg:px-28">
          Pay for what you use. Start for free, no credit card required.
        </p>
      </div>
      Cancel anytime without losing your links.
    </div>
  )
}
