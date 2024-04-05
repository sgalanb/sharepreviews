import Footer from '@/app/(marketing)/footer'
import SelectedTemplates from '@/app/(marketing)/starter-templates/selected-templates'
import { getTemplateByArrayOfIds } from '@/app/db/operations/templates'
import { getUser } from '@/app/lib/workos'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/ui/components/Tabs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Starter Templates | sharepreviews',
}

const starterTemplatesIds = [
  {
    id: 'f59f8239-d5f7-459c-9b3a-1bb8b7591a5b',
    type: 'ecommerce',
  },
  {
    id: '7552d66d-f660-4ce6-ab05-1ef6f3a7abc7',
    type: 'blog',
  },
  {
    id: '1a6f0d56-3a8c-462d-bfdc-899972aef704',
    type: 'social',
  },
  {
    id: 'ab7b7eee-511c-4b30-bb18-f7eab564d7c7',
    type: 'events',
  },
  {
    id: 'd173754a-60f2-467d-9066-e9c3620300b1',
    type: 'other',
  },
]

export default async function StarterTemplatesPage() {
  const { isAuthenticated } = await getUser()

  const starterTemplates = await getTemplateByArrayOfIds(
    starterTemplatesIds.map((template) => template.id)
  )

  const starterTemplatesWithType = starterTemplates.map((template) => {
    const templateType = starterTemplatesIds.find(
      (starterTemplate) => starterTemplate.id === template.id
    )?.type

    return {
      ...template,
      type: templateType,
    }
  })

  return (
    <div className="flex h-full w-full max-w-7xl flex-col items-center justify-start gap-4 px-4 pt-20 lg:gap-20">
      <div className="flex w-full flex-col items-center justify-start gap-4">
        <h1 className="marketing-title">Starter Templates</h1>
        <p className="marketing-subtitle text-balance text-center text-muted-foreground lg:px-28">
          A curated collection of dynamic card images made with{' '}
          <span className="text-primary">sharepreviews</span>. You can use them
          as starter templates for your own projects.
        </p>
      </div>
      <Tabs
        defaultValue="all"
        className="mb-16 flex w-full flex-col items-center justify-center gap-10 lg:mb-0"
      >
        <TabsList className="flex w-full items-center justify-start overflow-x-auto border lg:w-fit">
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
            Social
          </TabsTrigger>
          <TabsTrigger value="events" className="h-full py-[5px]">
            Events
          </TabsTrigger>
          <TabsTrigger value="other" className="h-full py-[5px]">
            Other
          </TabsTrigger>
        </TabsList>

        <div className="w-full">
          <TabsContent value="all">
            <SelectedTemplates selectedTemplates={starterTemplatesWithType} />
          </TabsContent>
          <TabsContent value="blog">
            <SelectedTemplates
              selectedTemplates={starterTemplatesWithType.filter(
                (template) => template.type === 'blog'
              )}
            />
          </TabsContent>
          <TabsContent value="ecommerce">
            <SelectedTemplates
              selectedTemplates={starterTemplatesWithType.filter(
                (template) => template.type === 'ecommerce'
              )}
            />
          </TabsContent>
          <TabsContent value="social">
            <SelectedTemplates
              selectedTemplates={starterTemplatesWithType.filter(
                (template) => template.type === 'social'
              )}
            />
          </TabsContent>
          <TabsContent value="events">
            <SelectedTemplates
              selectedTemplates={starterTemplatesWithType.filter(
                (template) => template.type === 'events'
              )}
            />
          </TabsContent>
          <TabsContent value="other">
            <SelectedTemplates
              selectedTemplates={starterTemplatesWithType.filter(
                (template) => template.type === 'other'
              )}
            />
          </TabsContent>
        </div>
      </Tabs>
      <Footer isAuthenticated={isAuthenticated} />
    </div>
  )
}
