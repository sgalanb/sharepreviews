import { generate } from '@rocicorp/rails'
import { z } from 'zod'
import { getParse } from './zod'

const baseLayerSchema = z.object({
  id: z.string(), // unique
  name: z.string(), // unique
  positionX: z.number(),
  positionY: z.number(),
  positionZ: z.number(),
  width: z.number(),
  height: z.number(),
  rotation: z.number(),
  opacity: z.number(),
})

export const layerSchema = baseLayerSchema.and(
  z.discriminatedUnion('type', [
    z.object({
      type: z.literal('text'),
      textValue: z.string(), // can include variables like ${variableName}
      fontFamily: z.string(),
      fontWeight: z.number(),
      fontUrl: z.string(),
      size: z.number(),
      lineHeight: z.number(),
      alignHorizontal: z.enum(['left', 'center', 'right', 'justify']),
      alignVertical: z.enum(['top', 'middle', 'bottom']),
      color: z.string(),
      lineClamp: z.number(),
    }),
    z.object({
      type: z.literal('image'),
      cornerRadius: z.number(),
      objectFit: z.enum(['cover', 'contain', 'fill']),
      imageValue: z.discriminatedUnion('type', [
        z.object({
          type: z.literal('static'),
          value: z.string(), // URL
        }),
        z.object({
          type: z.literal('dynamic'),
        }),
      ]),
    }),
    z.object({
      type: z.literal('shape'),
      cornerRadius: z.number(),
      color: z.string(),
    }),
  ])
)

export type LayerType = z.infer<typeof layerSchema>

export type TextLayerType = Extract<LayerType, { type: 'text' }>
export type ImageLayerType = Extract<LayerType, { type: 'image' }>
export type ShapeLayerType = Extract<LayerType, { type: 'shape' }>

export const {
  get: getLayer,
  list: listLayers,
  listIDs: listLayersIDs,
  set: setLayer,
  delete: deleteLayer,
} = generate('layer', getParse(layerSchema))
