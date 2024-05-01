import VisualEditor from '@/app/(editor)/[project]/templates/[templateId]/edit/visual-editor'
import { getProjectByPathname } from '@/app/db/operations/projects'
import { getTemplateById } from '@/app/db/operations/templates'
import { ProjectType } from '@/app/db/schema'
import { getUser } from '@/app/lib/workos'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const selectedProject = await getProjectByPathname(params.project)
  const selectedTemplate = await getTemplateById(params.templateId)

  return {
    title: `${selectedTemplate?.name} - ${selectedProject?.name} | SharePreviews`,
  }
}

interface LayerInterface {
  id: string
  name: string
  x: number
  y: number
  width: number
  height: number
  rotation: number
  opacity: number
  type: 'text' | 'image' | 'rectangle'
  conditionalVisibility: boolean
  conditionalVisibilityVariableName: string
}

interface TextLayerInterface extends LayerInterface {
  type: 'text'
  widthType: 'fixed' | 'fit'
  heightType: 'fixed' | 'fit'
  lineClamp: number
  fontName: string
  fontFamily: string
  fontWeight: number
  fontUrl: string
  size: number
  lineHeight: number
  alignHorizontal: 'flex-start' | 'center' | 'flex-end'
  alignVertical: 'flex-start' | 'center' | 'flex-end'
  //balance: boolean // text wrap balance, wait for satori to support
  // TODO?: wordBreak: 'normal' | 'break-all' | 'break-word'
  color: string
  background: boolean
  bgColor: string
  bgOpacity: number
  bgPaddingX: number
  bgPaddingY: number
  bgCornerRadius: number
  conditionalValue: boolean
  conditionalValueVariableName: string
  exampleValue?: string
  value?: string
}

interface ImageLayerInterface extends LayerInterface {
  type: 'image'
  cornerRadius: number
  objectFit: 'fill' | 'contain' | 'cover'
  conditionalValue: boolean
  conditionalValueVariableName: string
  exampleSrc?: string
  src?: string
}

interface RectangleLayerInterface extends LayerInterface {
  type: 'rectangle'
  cornerRadius: number
  color: string
}

export type LayerType =
  | TextLayerInterface
  | ImageLayerInterface
  | RectangleLayerInterface

type Props = {
  params: { project: string; templateId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function EditTemplate({ params, searchParams }: Props) {
  const { user } = await getUser()
  const selectedProject = (await getProjectByPathname(params.project)) as
    | ProjectType
    | undefined

  if (!selectedProject || selectedProject.userId !== user?.id) {
    redirect('/')
  }

  return (
    <div className="h-full w-full">
      <VisualEditor
        userId={user?.id!}
        project={selectedProject}
        templateId={params.templateId}
      />
    </div>
  )
}
