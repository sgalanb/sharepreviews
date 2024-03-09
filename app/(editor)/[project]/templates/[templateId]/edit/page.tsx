import VisualEditor from '@/app/(editor)/[project]/templates/[templateId]/edit/visual-editor'
import { getUserProjects } from '@/app/db/operations/projects'
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

export default async function EditTemplate() {
  const { user } = await getUser()
  const userProjects = await getUserProjects(user?.id!)

  return (
    <div className="h-full w-full">
      <VisualEditor userProjects={userProjects} userId={user?.id!} />
    </div>
  )
}
