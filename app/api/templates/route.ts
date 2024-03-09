import { getProjectsTemplates } from '@/app/db/operations/templates'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const projectId = req.nextUrl.searchParams.get('projectId')

  if (!projectId) {
    return new Response('Missing projectId', { status: 400 })
  }

  const templates = await getProjectsTemplates(projectId)

  return new Response(JSON.stringify(templates), {
    status: 200,
  })
}
