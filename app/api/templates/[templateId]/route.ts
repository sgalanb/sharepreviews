import { getTemplateById } from '@/app/db/operations/templates'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const templateId = req.nextUrl.pathname.split('/')[3]

  if (!templateId) {
    return new Response('Missing templateId', { status: 400 })
  }

  const templates = await getTemplateById(templateId)

  return new Response(JSON.stringify(templates), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
