import { getProjectsTemplates } from '@/app/db/operations/templates'
import { getTemplateUrlsRedis } from '@/app/lib/upstash'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const projectId = req.nextUrl.searchParams.get('projectId')

  if (!projectId) {
    return new Response('Missing projectId', { status: 400 })
  }

  try {
    const templatesWithoutURLs = await getProjectsTemplates(projectId)

    const templates = await Promise.all(
      templatesWithoutURLs.map(async (template) => {
        const urls = await getTemplateUrlsRedis(template.id)
        return {
          ...template,
          urls,
        }
      })
    )

    return new Response(JSON.stringify(templates), {
      status: 200,
    })
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 })
  }
}
