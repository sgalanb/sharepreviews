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
    id: 'f20c60c8-0e4e-43cb-85d7-1ec2357530ae',
    type: 'ecommerce',
  },
  {
    id: '6446c4ba-ebbc-4688-be9d-9d0aa268627a',
    type: 'blog',
  },
  {
    id: '27c80424-6b31-455e-88e1-6b36f0e75cf9',
    type: 'social',
  },
  {
    id: '08f36805-dea2-4575-b047-a96c9466d1f4',
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
    <div className="flex h-full w-full flex-col items-center justify-start gap-8 pt-16">
      <div className="flex w-full flex-col items-center justify-start gap-4 px-4 lg:px-8">
        <h1 className="marketing-title text-center">Starter Templates</h1>
        <p className="marketing-subtitle text-balance text-center text-muted-foreground lg:px-28">
          A curated collection of dynamic card images made with{' '}
          <span className="text-primary">sharepreviews</span>. You can use them
          as starter templates for your own projects.
        </p>
      </div>
      <Tabs
        defaultValue="all"
        className="mb-16 flex w-full flex-col items-center justify-center gap-8 px-4 lg:mb-0 lg:px-8"
      >
        <TabsList className="flex w-fit items-center justify-start overflow-x-auto border">
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
          {/* <TabsTrigger value="events" className="h-full py-[5px]">
            Events
          </TabsTrigger> */}
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
