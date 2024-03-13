import VisualEditor from '@/app/(editor)/[project]/templates/[templateId]/edit/visual-editor'
import { getProjectByPathname } from '@/app/db/operations/projects'
import { ProjectType } from '@/app/db/schema'
import { getUser } from '@/app/lib/workos'

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
  conditionalValueVariableName: string
}

interface TextLayerInterface extends LayerInterface {
  type: 'text'
  family: string
  size: number
  lineHeight: number
  alignHorizontal: 'flex-start' | 'center' | 'flex-end'
  alignVertical: 'flex-start' | 'center' | 'flex-end'
  //balance: boolean // text wrap balance, wait for satori to support
  color: string
  conditionalValue: boolean
  exampleValue?: string
  value?: string
}

interface ImageLayerInterface extends LayerInterface {
  type: 'image'
  cornerRadius: number
  objectFit: 'fill' | 'contain' | 'cover'
  conditionalValue: boolean
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
  const selectedProject = (await getProjectByPathname(
    params.project
  )) as ProjectType

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
