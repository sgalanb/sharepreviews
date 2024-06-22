import { LayerType } from '@/app/(editor)/[project]/templates/[templateId]/edit/page'
import { getTemplateInfoRedis, getTemplateRedis } from '@/app/lib/upstash'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export type TemplateInfoType = {
  name: string
  createdAt: string
  updatedAt: string
  layersData: LayerType[]
}

export async function GET(req: NextRequest) {
  const templateId = req.nextUrl.pathname.split('/')[3]

  if (!templateId) {
    return new Response('Missing templateId', { status: 400 })
  }

  const template = await getTemplateRedis(templateId)
  const templateInfo = await getTemplateInfoRedis(templateId)

  if (!template || !templateInfo) {
    return new Response('Template not found', { status: 404 })
  }

  const templateWithInfo = {
    name: templateInfo.name,
    createdAt: templateInfo.createdAt,
    updatedAt: templateInfo.updatedAt,
    layersData: template,
  } as TemplateInfoType

  return new Response(JSON.stringify(templateWithInfo), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
