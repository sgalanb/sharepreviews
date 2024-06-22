import { generate } from '@rocicorp/rails'
import { z } from 'zod'
import { getParse } from './zod'

export const templateSchema = z.object({
  id: z.string(),
  name: z.string(),
  width: z.number(),
  height: z.number(),
})

export type TemplateType = z.infer<typeof templateSchema>

export const {
  init: initTemplate,
  get: getTemplate,
  list: listTemplates,
  listIDs: listTemplatesIDs,
  set: setTemplate,
  delete: deleteTemplate,
} = generate('template', getParse(templateSchema))
