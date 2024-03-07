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
