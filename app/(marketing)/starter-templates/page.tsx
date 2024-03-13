import { Tabs, TabsList, TabsTrigger } from '@/app/ui/components/Tabs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Starter Templates | sharepreviews',
}

export default function StarterTemplatesPage() {
  return (
    <div className="flex h-full w-full max-w-7xl flex-col items-center justify-start gap-4 lg:gap-8 lg:pt-8">
      <span className="marketing-title">Starter Templates</span>
      <p>
        A curated collection of dynamic card images templates. You can use them
        as starter templates for your own projects.
      </p>

      <Tabs defaultValue="all" className="">
        <TabsList className="border">
          <TabsTrigger value="all" className="h-full py-[5px]">
            All
          </TabsTrigger>
          <TabsTrigger value="blog" className="h-full py-[5px]">
            Blogs
          </TabsTrigger>
          <TabsTrigger value="ecommerce" className="h-full py-[5px]">
            eCommerce
          </TabsTrigger>
          <TabsTrigger value="social" className="h-full py-[5px]">
            Social Profiles
          </TabsTrigger>
          <TabsTrigger value="events" className="h-full py-[5px]">
            Events
          </TabsTrigger>
          <TabsTrigger value="other" className="h-full py-[5px]">
            Other
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
