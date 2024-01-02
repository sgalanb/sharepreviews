import { recordMetatags } from '@/app/lib/upstash'
import { getRelativeUrl } from '@/app/utils'
import he from 'he'
import { internal_runWithWaitUntil as waitUntil } from 'next/dist/server/web/internal-edge-wait-until'
import { parse } from 'node-html-parser'

export const getHtml = async (url: string) => {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // timeout if it takes longer than 5 seconds
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'sharepreviews-bot/1.0',
      },
    })
    clearTimeout(timeoutId)
    return await response.text()
  } catch (error: any) {
    if (error?.name === 'AbortError') {
      // Handle fetch request abort (e.g., due to timeout)
      console.error('Fetch request aborted due to timeout.')
    } else {
      // Handle other fetch errors
      console.error('Fetch request failed:', error)
    }
    return null
  }
}

export const getHeadChildNodes = (html: string) => {
  const ast = parse(html) // parse the html into AST format with node-html-parser
  const metaTags = ast.querySelectorAll('meta').map(({ attributes }) => {
    const property = attributes.property || attributes.name || attributes.href
    return {
      property,
      content: attributes.content,
    }
  })
  const title = ast.querySelector('title')?.innerText
  const linkTags = ast.querySelectorAll('link').map(({ attributes }) => {
    const { rel, href } = attributes
    return {
      rel,
      href,
    }
  })

  return { metaTags, title, linkTags }
}

export type ValidatedMetatagsType = {
  title: string
  description: string
  'og:title': string
  'og:description': string
  'og:image': string
  'og:image:width': string
  'og:image:height': string
  'og:image:type': string
  'og:url': string
  'og:site_name': string
  'og:type': string
  'twitter:title': string
  'twitter:description': string
  'twitter:card': string
  'twitter:image': string
  'twitter:image:width': string
  'twitter:image:height': string
  'twitter:image:type': string
  'twitter:site': string
  'twitter:creator': string
}

export const getMetaTags = async (url: string) => {
  const html = await getHtml(url)
  if (!html) {
    return {
      title: '',
      description: '',
      'og:title': '',
      'og:description': '',
      'og:image': '',
      'og:image:width': '',
      'og:image:height': '',
      'og:image:type': '',
      'og:url': '',
      'og:site_name': '',
      'og:type': '',
      'twitter:title': '',
      'twitter:description': '',
      'twitter:card': '',
      'twitter:image': '',
      'twitter:image:width': '',
      'twitter:image:height': '',
      'twitter:image:type': '',
      'twitter:site': '',
      'twitter:creator': '',
    }
  }

  const { metaTags, title: titleTag, linkTags } = getHeadChildNodes(html)

  let object: {
    [key: string]: string
  } = {}

  for (let k in metaTags) {
    let { property, content } = metaTags[k]

    property && (object[property] = content && he.decode(content))
  }

  for (let m in linkTags) {
    let { rel, href } = linkTags[m]

    rel && (object[rel] = href)
  }

  // Metatags to validate
  const validatedMetatags: ValidatedMetatagsType = {
    title: titleTag ?? '',
    description: object['description'] ?? '',
    'og:title': object['og:title'] ?? '',
    'og:description': object['og:description'] ?? '',
    'og:image': getRelativeUrl(url, object['og:image']) ?? '',
    'og:image:width': object['og:image:width'] ?? '',
    'og:image:height': object['og:image:height'] ?? '',
    'og:image:type': object['og:image:type'] ?? '',
    'og:url': object['og:url'] ?? '',
    'og:site_name': object['og:site_name'] ?? '',
    'og:type': object['og:type'] ?? '',
    'twitter:title': object['twitter:title'] ?? '',
    'twitter:description': object['twitter:description'] ?? '',
    'twitter:card': object['twitter:card'] ?? '',
    'twitter:image': getRelativeUrl(url, object['twitter:image']) ?? '',
    'twitter:image:width': object['twitter:image:width'] ?? '',
    'twitter:image:height': object['twitter:image:height'] ?? '',
    'twitter:image:type': object['twitter:image:type'] ?? '',
    'twitter:site': object['twitter:site'] ?? '',
    'twitter:creator': object['twitter:creator'] ?? '',
  }

  waitUntil(async () => {
    await recordMetatags(url, false)
  })

  return validatedMetatags as ValidatedMetatagsType
}
